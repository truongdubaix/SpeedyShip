import db from "../config/db.js";

// 🚗 Lấy danh sách tất cả xe (cả đã gán và chưa gán)
export const getAllVehicles = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        v.id, 
        v.plate_no, 
        v.type, 
        v.capacity_kg, 
        v.status,
        d.name AS driver_name
      FROM vehicles v
      LEFT JOIN drivers d ON d.vehicle_id = v.id
      ORDER BY v.id DESC
    `);
    res.json(rows);
  } catch (error) {
    console.error("❌ Lỗi getAllVehicles:", error);
    res.status(500).json({ message: "Lỗi khi lấy danh sách xe" });
  }
};

// 🚙 Lấy xe chưa gán cho tài xế (available)
export const getAvailableVehicles = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        v.id, 
        v.plate_no, 
        v.type, 
        v.capacity_kg, 
        v.status
      FROM vehicles v
      LEFT JOIN drivers d ON d.vehicle_id = v.id
      WHERE d.vehicle_id IS NULL AND v.status = 'available'
      ORDER BY v.id DESC
    `);
    res.json(rows);
  } catch (error) {
    console.error("❌ Lỗi getAvailableVehicles:", error);
    res.status(500).json({ message: "Lỗi khi lấy danh sách xe trống" });
  }
};
