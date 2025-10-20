export const hasRole =
  (...allowed) =>
  (req, res, next) => {
    try {
      const roles = req.user?.roles || [];
      const ok = roles.some((r) => allowed.includes(r));
      if (!ok) return res.status(403).json({ message: "Forbidden" });
      next();
    } catch {
      return res.status(403).json({ message: "Forbidden" });
    }
  };
