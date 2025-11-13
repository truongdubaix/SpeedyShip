import jwt from "jsonwebtoken";

// Middleware xác thực JWT
export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: "Không có token, từ chối truy cập!" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(403).json({ message: "Token không hợp lệ!" });
  }
};

//  Middleware kiểm tra quyền truy cập theo vai trò
export const roleMiddleware = (roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return res.status(403).json({ message: "Bạn không có quyền truy cập!" });
  }
  next();
};
