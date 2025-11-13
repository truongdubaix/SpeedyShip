import db from "../config/db.js";

//  Lấy tất cả tài xế
export const getAllDrivers = async (req, res) => {
  try {
    const [rows] = await db.query(`
  SELECT 
    d.id,
    d.name,
    d.email,
    d.phone,
    d.status,
    v.plate_no,
    v.type AS vehicle_type,
    v.status AS vehicle_status
  FROM drivers d
  LEFT JOIN vehicles v ON d.vehicle_id = v.id
  ORDER BY d.id DESC
`);
    res.json(rows);
  } catch (err) {
    console.error("❌ Lỗi getAllDrivers:", err);
    res.status(500).json({ message: "Lỗi khi lấy danh sách tài xế" });
  }
};

//  Lấy chi tiết tài xế theo id
export const getDriverById = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM drivers WHERE id=?", [
      req.params.id,
    ]);
    if (rows.length === 0)
      return res.status(404).json({ message: "Không tìm thấy tài xế" });
    res.json(rows[0]);
  } catch (err) {
    console.error("❌ Lỗi getDriverById:", err);
    res.status(500).json({ message: "Lỗi khi lấy tài xế" });
  }
};

//  Thêm tài xế mới
export const createDriver = async (req, res) => {
  try {
    const { name, email, phone, vehicle_type, status } = req.body;
    await db.query(
      "INSERT INTO drivers (name, email, phone, vehicle_type, status, created_at) VALUES (?, ?, ?, ?, ?, NOW())",
      [name, email, phone, vehicle_type, status || "available"]
    );
    res.json({ message: "✅ Đã thêm tài xế mới" });
  } catch (err) {
    console.error("❌ Lỗi createDriver:", err);
    res.status(500).json({ message: "Lỗi khi thêm tài xế" });
  }
};

//  Cập nhật thông tin tài xế
export const updateDriver = async (req, res) => {
  try {
    const { name, email, phone, vehicle_type, status } = req.body;
    await db.query(
      "UPDATE drivers SET name=?, email=?, phone=?, vehicle_type=?, status=?, updated_at=NOW() WHERE id=?",
      [name, email, phone, vehicle_type, status, req.params.id]
    );
    res.json({ message: "✅ Cập nhật tài xế thành công" });
  } catch (err) {
    console.error("❌ Lỗi updateDriver:", err);
    res.status(500).json({ message: "Lỗi khi cập nhật tài xế" });
  }
};

//  Xóa tài xế
export const deleteDriver = async (req, res) => {
  try {
    await db.query("DELETE FROM drivers WHERE id=?", [req.params.id]);
    res.json({ message: "🗑️ Đã xóa tài xế" });
  } catch (err) {
    console.error("❌ Lỗi deleteDriver:", err);
    res.status(500).json({ message: "Lỗi khi xóa tài xế" });
  }
};

//  Cập nhật trạng thái tài xế
export const updateDriverStatus = async (req, res) => {
  try {
    const { status } = req.body;
    await db.query("UPDATE drivers SET status=? WHERE id=?", [
      status,
      req.params.id,
    ]);
    res.json({ message: "✅ Cập nhật trạng thái thành công" });
  } catch (err) {
    console.error("❌ Lỗi updateDriverStatus:", err);
    res.status(500).json({ message: "Lỗi khi cập nhật trạng thái" });
  }
};
