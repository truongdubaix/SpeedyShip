import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../config/db.js";
import { sendMail } from "../utils/sendMail.js";

// Đăng ký
export const register = async (req, res) => {
  const { name, email, password, phone } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin!" });

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

// Đăng nhập
export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin!" });

  try {
    const [users] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (!users.length)
      return res.status(401).json({ message: "Sai tài khoản hoặc mật khẩu" });

    const user = users[0];
    console.log("🟡 Trạng thái user:", user.status);

    // Kiểm tra trạng thái
    if (user.status && user.status.toLowerCase() === "inactive") {
      console.log("🚫 User bị vô hiệu hóa:", user.email);
      return res.status(403).json({
        message:
          "Tài khoản của bạn đã bị vô hiệu hóa, vui lòng liên hệ quản trị viên.",
      });
    }

    // Kiểm tra mật khẩu
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

// Gửi OTP
export const sendOtp = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Thiếu email" });

  try {
    // Kiểm tra email đã tồn tại chưa
    const [exist] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (exist.length) {
      return res.status(400).json({ message: "Email này đã được sử dụng!" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    const expiresAt = Date.now() + 3 * 60 * 1000; // 3 phút

    await pool.query(
      "INSERT INTO otp_codes (email, code, expires_at) VALUES (?, ?, ?)",
      [email, otp, expiresAt]
    );

    await sendMail(
      email,
      "SpeedyShip - Mã OTP xác thực",
      `Mã OTP của bạn là ${otp}. Mã này sẽ hết hạn sau 3 phút.`
    );

    res.json({ message: "Đã gửi mã OTP đến email của bạn." });
  } catch (err) {
    console.error("❌ Lỗi gửi OTP:", err);
    res.status(500).json({ message: "Gửi OTP thất bại." });
  }
};

// Xác thực OTP
export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const [rows] = await pool.query(
      "SELECT * FROM otp_codes WHERE email=? ORDER BY id DESC LIMIT 1",
      [email]
    );

    if (!rows.length)
      return res.status(400).json({ message: "Không tìm thấy mã OTP!" });

    const record = rows[0];
    if (Date.now() > record.expires_at)
      return res.status(400).json({ message: "Mã OTP đã hết hạn!" });

    if (record.code !== otp)
      return res.status(400).json({ message: "Mã OTP không đúng!" });

    res.json({ message: "Xác thực OTP thành công!" });
  } catch (err) {
    console.error("❌ Lỗi verify OTP:", err);
    res.status(500).json({ message: "Lỗi xác thực OTP." });
  }
};
