import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token)
    return res
      .status(401)
      .json({ error: "Không có token, vui lòng đăng nhập" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // lưu thông tin user vào request
    next();
  } catch (err) {
    return res
      .status(403)
      .json({ error: "Token không hợp lệ hoặc đã hết hạn" });
  }
};
