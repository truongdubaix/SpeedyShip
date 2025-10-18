import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "../config/db.js";
import dotenv from "dotenv";
dotenv.config();

/**
 * 🧾 Đăng ký tài khoản
 */
export const register = async (req, res) => {
  try {
    const { name, email, password, role = "customer" } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ error: "Thiếu thông tin cần thiết" });

    // Kiểm tra email đã tồn tại chưa
    const [check] = await db.query("SELECT * FROM users WHERE email=?", [
      email,
    ]);
    if (check.length > 0)
      return res.status(400).json({ error: "Email đã tồn tại" });

    const hash = await bcrypt.hash(password, 10);

    // Lấy id role từ bảng roles
    const [r] = await db.query("SELECT id FROM roles WHERE code=?", [role]);
    const role_id = r.length ? r[0].id : 4; // mặc định là customer

    const [result] = await db.query(
      "INSERT INTO users (name, email, password, role_id) VALUES (?,?,?,?)",
      [name, email, hash, role_id]
    );

    res.json({ message: "✅ Đăng ký thành công", userId: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * 🔐 Đăng nhập
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: "Thiếu email hoặc mật khẩu" });

    const [rows] = await db.query("SELECT * FROM users WHERE email=?", [email]);
    if (!rows.length) return res.status(400).json({ error: "Sai email" });

    const user = rows[0];
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ error: "Sai mật khẩu" });

    // Lấy vai trò
    const [r] = await db.query("SELECT code FROM roles WHERE id=?", [
      user.role_id,
    ]);
    const role = r.length ? r[0].code : "customer";

    // Tạo token
    const token = jwt.sign(
      { id: user.id, email: user.email, role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "✅ Đăng nhập thành công",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
