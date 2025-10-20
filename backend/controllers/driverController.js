import db from "../config/db.js";

// 🔹 Lấy toàn bộ tài xế
export const getAllDrivers = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM drivers ORDER BY id DESC");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Lỗi khi lấy danh sách tài xế" });
  }
};

// 🔹 Thêm tài xế mới
export const createDriver = async (req, res) => {
  const { name, email, phone, status } = req.body;
  try {
    await db.query(
      "INSERT INTO drivers (name, email, phone, status) VALUES (?, ?, ?, ?)",
      [name, email, phone, status || "available"]
    );
    res.json({ message: "Thêm tài xế thành công" });
  } catch (err) {
    res.status(500).json({ error: "Lỗi khi thêm tài xế" });
  }
};

// 🔹 Cập nhật thông tin tài xế
export const updateDriver = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, status } = req.body;
  try {
    await db.query(
      "UPDATE drivers SET name=?, email=?, phone=?, status=? WHERE id=?",
      [name, email, phone, status, id]
    );
    res.json({ message: "Cập nhật tài xế thành công" });
  } catch (err) {
    res.status(500).json({ error: "Lỗi khi cập nhật tài xế" });
  }
};

// 🔹 Xóa tài xế
export const deleteDriver = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM drivers WHERE id = ?", [id]);
    res.json({ message: "Đã xóa tài xế" });
  } catch (err) {
    res.status(500).json({ error: "Lỗi khi xóa tài xế" });
  }
};

// 🔹 Cập nhật trạng thái nhanh
export const updateDriverStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    await db.query("UPDATE drivers SET status = ? WHERE id = ?", [status, id]);
    res.json({ message: "Cập nhật trạng thái thành công" });
  } catch (err) {
    res.status(500).json({ error: "Lỗi khi cập nhật trạng thái" });
  }
};
