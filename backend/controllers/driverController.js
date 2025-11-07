import db from "../config/db.js";
import bcrypt from "bcryptjs";

// =================== 📊 Dashboard ===================
// =================== 📊 Dashboard ===================
export const getDriverDashboard = async (req, res) => {
  try {
    const { id } = req.params;

    // Thống kê số lượng đơn theo trạng thái
    const [rows] = await db.query(
      `
      SELECT 
        COUNT(CASE WHEN s.status = 'completed' THEN 1 END) AS completed,
        COUNT(CASE WHEN s.status = 'delivering' THEN 1 END) AS delivering,
        COUNT(CASE WHEN s.status = 'picking' THEN 1 END) AS picking,
        COUNT(CASE WHEN s.status = 'assigned' THEN 1 END) AS assigned
      FROM shipments s
      JOIN assignments a ON s.id = a.shipment_id
      WHERE a.driver_id = ?
      `,
      [id]
    );

    const stats = rows[0] || {
      completed: 0,
      delivering: 0,
      picking: 0,
      assigned: 0,
    };

    // 🔹 Lấy 5 đơn hàng gần đây của tài xế
    const [recent] = await db.query(
      `
      SELECT 
        s.id, 
        s.tracking_code, 
        s.receiver_name, 
        s.status, 
        s.updated_at 
      FROM shipments s
      JOIN assignments a ON s.id = a.shipment_id
      WHERE a.driver_id = ?
      ORDER BY s.updated_at DESC
      LIMIT 5
      `,
      [id]
    );

    // ✅ Trả về dữ liệu tổng hợp
    res.json({
      completed: stats.completed,
      delivering: stats.delivering,
      picking: stats.picking,
      assigned: stats.assigned,
      recentShipments: recent,
    });
  } catch (err) {
    console.error("❌ Lỗi getDriverDashboard:", err);
    res.status(500).json({ message: err.message || "Lỗi khi lấy dashboard" });
  }
};

// =================== 🚚 Danh sách đơn hàng đang giao ===================
export const getDriverAssignments = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query(
      `
      SELECT 
        s.id AS shipment_id,
        s.tracking_code,
        s.delivery_address,
        s.status,
        a.status AS assignment_status
      FROM assignments a
      JOIN shipments s ON s.id = a.shipment_id
      WHERE a.driver_id = ? 
        AND a.status IN ('assigned', 'picking', 'delivering')
      ORDER BY a.assigned_at DESC
      `,
      [id]
    );
    res.json(rows);
  } catch (err) {
    console.error("❌ Lỗi getDriverAssignments:", err);
    res.status(500).json({ message: "Lỗi khi lấy danh sách đơn tài xế" });
  }
};

// =================== 🧾 Lịch sử giao hàng ===================
export const getDriverHistory = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query(
      `
      SELECT 
        s.tracking_code,
        s.delivery_address,
        s.status,
        a.assigned_at AS completed_at
      FROM assignments a
      JOIN shipments s ON s.id = a.shipment_id
      WHERE a.driver_id = ? AND a.status = 'completed'
      ORDER BY a.assigned_at DESC
      `,
      [id]
    );
    res.json(rows);
  } catch (err) {
    console.error("❌ Lỗi getDriverHistory:", err);
    res.status(500).json({ message: "Lỗi khi lấy lịch sử giao hàng" });
  }
};

// =================== 🔄 Cập nhật trạng thái đơn ===================
export const updateDriverShipmentStatus = async (req, res) => {
  try {
    const { shipment_id } = req.params;
    const { status } = req.body;

    await db.query("UPDATE shipments SET status = ? WHERE id = ?", [
      status,
      shipment_id,
    ]);
    await db.query("UPDATE assignments SET status = ? WHERE shipment_id = ?", [
      status,
      shipment_id,
    ]);

    res.json({ message: "✅ Cập nhật trạng thái thành công" });
  } catch (err) {
    console.error("❌ Lỗi updateDriverShipmentStatus:", err);
    res.status(500).json({ message: "Lỗi khi cập nhật trạng thái" });
  }
};

// =================== 👤 Hồ sơ tài xế ===================
export const getDriverProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query(
      `
      SELECT 
        d.id, 
        d.name, 
        d.email, 
        d.phone, 
        d.status,
        v.plate_no,
        v.type,
        v.capacity_kg,
        v.status AS vehicle_status
      FROM drivers d
      LEFT JOIN vehicles v ON d.vehicle_id = v.id
      WHERE d.id = ?
      `,
      [id]
    );

    if (rows.length === 0)
      return res.status(404).json({ message: "Không tìm thấy tài xế" });

    res.json(rows[0]);
  } catch (err) {
    console.error("❌ Lỗi getDriverProfile:", err);
    res.status(500).json({ message: "Lỗi khi lấy thông tin tài xế" });
  }
};

// =================== 🔐 Đổi mật khẩu ===================
export const changeDriverPassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { oldPassword, newPassword } = req.body;

    const [[driver]] = await db.query(
      "SELECT password FROM drivers WHERE id = ?",
      [id]
    );
    if (!driver)
      return res.status(404).json({ message: "Không tìm thấy tài xế" });

    const isMatch = await bcrypt.compare(oldPassword, driver.password);
    if (!isMatch)
      return res.status(400).json({ message: "Mật khẩu cũ không đúng" });

    const hash = await bcrypt.hash(newPassword, 10);
    await db.query("UPDATE drivers SET password = ? WHERE id = ?", [hash, id]);

    res.json({ message: "✅ Đổi mật khẩu thành công" });
  } catch (err) {
    console.error("❌ Lỗi changeDriverPassword:", err);
    res.status(500).json({ message: "Lỗi khi đổi mật khẩu" });
  }
};

// =================== 🚚 Cập nhật xe cho tài xế ===================
export const updateDriverVehicle = async (req, res) => {
  try {
    const { id } = req.params; // id tài xế
    const { vehicle_id } = req.body;

    // Kiểm tra xe có tồn tại không
    const [[vehicle]] = await db.query("SELECT * FROM vehicles WHERE id = ?", [
      vehicle_id,
    ]);
    if (!vehicle) return res.status(404).json({ message: "Xe không tồn tại" });

    // Gán xe cho tài xế
    await db.query("UPDATE drivers SET vehicle_id = ? WHERE id = ?", [
      vehicle_id,
      id,
    ]);

    res.json({ message: "✅ Cập nhật xe cho tài xế thành công" });
  } catch (error) {
    console.error("❌ Lỗi cập nhật xe cho tài xế:", error);
    res.status(500).json({ message: "Lỗi server khi cập nhật xe cho tài xế" });
  }
};
// ✅ Hồ sơ tài xế bằng userId
export const getDriverProfileByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const [rows] = await db.query(
      `
      SELECT 
        d.id,
        d.user_id,
        d.name,
        d.email,
        d.phone,
        d.status,
        v.plate_no,
        v.type,
        v.capacity_kg,
        v.status AS vehicle_status
      FROM drivers d
      LEFT JOIN vehicles v ON d.vehicle_id = v.id
      WHERE d.user_id = ?
      `,
      [userId]
    );

    if (!rows.length)
      return res.status(404).json({ message: "Không tìm thấy tài xế" });

    res.json(rows[0]);
  } catch (err) {
    console.error("❌ Lỗi getDriverProfileByUser:", err);
    res.status(500).json({ message: "Lỗi khi lấy thông tin tài xế" });
  }
};
