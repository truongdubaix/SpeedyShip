import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../config/db.js";

// 🔹 Đăng ký
export const register = async (req, res) => {
  const { name, email, password, phone } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ message: "Thiếu thông tin" });

  try {
    const [exist] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (exist.length)
      return res.status(400).json({ message: "Email đã tồn tại" });

    const hash = await bcrypt.hash(password, 10);
    const [result] = await pool.query(
      "INSERT INTO users (name,email,password,phone) VALUES (?,?,?,?)",
      [name, email, hash, phone]
    );

    // mặc định role customer
    const [role] = await pool.query(
      "SELECT id FROM roles WHERE code='customer'"
    );
    if (role.length)
      await pool.query("INSERT INTO user_roles(user_id,role_id) VALUES(?,?)", [
        result.insertId,
        role[0].id,
      ]);

    res.json({ message: "Đăng ký thành công" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🔹 Đăng nhập
export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Thiếu thông tin" });

  try {
    const [users] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (!users.length)
      return res.status(401).json({ message: "Sai tài khoản hoặc mật khẩu" });

    const user = users[0];
    console.log("🟡 Trạng thái user:", user.status);

    // ⚠️ Kiểm tra trạng thái
    if (user.status && user.status.toLowerCase() === "inactive") {
      console.log("🚫 User bị vô hiệu hóa:", user.email);
      return res.status(403).json({
        message:
          "Tài khoản của bạn đã bị vô hiệu hóa, vui lòng liên hệ quản trị viên.",
      });
    }

    // ✅ Kiểm tra mật khẩu
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      console.log("❌ Sai mật khẩu:", user.email);
      return res.status(401).json({ message: "Sai tài khoản hoặc mật khẩu" });
    }

    // 🔹 Lấy role
    const [roles] = await pool.query(
      `SELECT r.code FROM roles r JOIN user_roles ur ON ur.role_id = r.id WHERE ur.user_id = ?`,
      [user.id]
    );

    const role = roles[0]?.code || "customer";

    const token = jwt.sign({ id: user.id, role }, "secret-key", {
      expiresIn: "2h",
    });

    res.json({
      message: "Đăng nhập thành công",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role,
      },
    });
  } catch (err) {
    console.error("❌ Lỗi đăng nhập:", err);
    res.status(500).json({ message: err.message });
  }
};
