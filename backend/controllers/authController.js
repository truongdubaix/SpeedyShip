import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "../config/db.js";
import dotenv from "dotenv";
dotenv.config();

export const register = async (req, res) => {
  try {
    const { name, email, password, role = "customer" } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ error: "Thiếu thông tin đăng ký" });

    const hash = await bcrypt.hash(password, 10);

    const [exist] = await db.query("SELECT * FROM users WHERE email=?", [
      email,
    ]);
    if (exist.length)
      return res.status(400).json({ error: "Email đã tồn tại" });

    const [user] = await db.query(
      "INSERT INTO users (name,email,password,role) VALUES (?,?,?,?)",
      [name, email, hash, role]
    );

    res.json({ message: "✅ Đăng ký thành công", userId: user.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const [rows] = await db.query("SELECT * FROM users WHERE email=?", [email]);
    if (!rows.length) return res.status(400).json({ error: "Sai email" });

    const user = rows[0];
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ error: "Sai mật khẩu" });

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    res.json({
      message: "✅ Đăng nhập thành công",
      token,
      user: { id: user.id, name: user.name, role: user.role },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
