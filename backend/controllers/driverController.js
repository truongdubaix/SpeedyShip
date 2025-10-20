import db from "../config/db.js";

// 📦 Lấy toàn bộ danh sách tài xế
export const getAllDrivers = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM drivers ORDER BY id DESC");
    res.json(rows);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Lỗi khi lấy danh sách tài xế", error: err });
  }
};

// ➕ Thêm tài xế mới
export const createDriver = async (req, res) => {
  const { name, email, phone, license_no, vehicle_type, status } = req.body;
  try {
    await db.query(
      "INSERT INTO drivers (name, email, phone, license_no, vehicle_type, status) VALUES (?, ?, ?, ?, ?, ?)",
      [name, email, phone, license_no, vehicle_type, status]
    );
    res.json({ message: "Thêm tài xế thành công" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi thêm tài xế", error: err });
  }
};

// ✏️ Cập nhật thông tin tài xế
export const updateDriver = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, license_no, vehicle_type, status } = req.body;
  try {
    await db.query(
      "UPDATE drivers SET name=?, email=?, phone=?, license_no=?, vehicle_type=?, status=? WHERE id=?",
      [name, email, phone, license_no, vehicle_type, status, id]
    );
    res.json({ message: "Cập nhật thành công" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi cập nhật tài xế", error: err });
  }
};

// ❌ Xóa tài xế
export const deleteDriver = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM drivers WHERE id = ?", [id]);
    res.json({ message: "Đã xóa tài xế" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi xóa tài xế", error: err });
  }
};

// 🔄 Cập nhật trạng thái
export const updateDriverStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    await db.query("UPDATE drivers SET status=? WHERE id=?", [status, id]);
    res.json({ message: "Đã cập nhật trạng thái" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Lỗi khi cập nhật trạng thái", error: err });
  }
};
