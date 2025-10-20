import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;
    if (!token) return res.status(401).json({ message: "Missing token" });
    const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    req.user = payload; // { id, email, roles }
    next();
  } catch (e) {
    return res.status(401).json({ message: "Invalid/expired token" });
  }
};
