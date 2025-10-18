import { db } from "../config/db.js";

/**
 * POST /api/notifications
 * Gửi thông báo đến user (Admin/Dispatcher)
 */
export const sendNotification = async (req, res) => {
  try {
    const { user_id, title, message, type = "system" } = req.body;
    if (!user_id || !title)
      return res.status(400).json({ error: "Thiếu user_id hoặc tiêu đề" });

    const [result] = await db.query(
      "INSERT INTO notifications (user_id, type, title, message) VALUES (?,?,?,?)",
      [user_id, type, title, message]
    );

    res.json({ message: "📨 Gửi thông báo thành công", id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * GET /api/notifications
 * Lấy danh sách thông báo của user (Customer/Driver)
 */
export const getNotifications = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM notifications WHERE user_id=? ORDER BY created_at DESC",
      [req.user.id]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * PUT /api/notifications/read/:id
 * Đánh dấu đã đọc
 */
export const markAsRead = async (req, res) => {
  try {
    const [r] = await db.query(
      "UPDATE notifications SET is_read=1 WHERE id=? AND user_id=?",
      [req.params.id, req.user.id]
    );
    if (r.affectedRows === 0)
      return res.status(404).json({ error: "Không tìm thấy thông báo" });
    res.json({ message: "✅ Đã đánh dấu đã đọc" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * POST /api/tracking/update
 * Cập nhật vị trí tài xế (Driver)
 */
export const updateDriverLocation = async (req, res) => {
  try {
    const { lat, lng } = req.body;
    const driver_id = req.user.id;

    if (!lat || !lng)
      return res.status(400).json({ error: "Thiếu lat hoặc lng" });

    await db.query(
      `INSERT INTO driver_locations (driver_id, lat, lng)
       VALUES (?, ?, ?)
       ON DUPLICATE KEY UPDATE lat=VALUES(lat), lng=VALUES(lng), updated_at=CURRENT_TIMESTAMP`,
      [driver_id, lat, lng]
    );

    res.json({ message: "📍 Đã cập nhật vị trí tài xế" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * GET /api/tracking/drivers
 * Dispatcher xem tất cả vị trí tài xế
 */
export const getAllDriverLocations = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT d.driver_id, u.name, d.lat, d.lng, d.updated_at
      FROM driver_locations d
      JOIN users u ON u.id = d.driver_id
      ORDER BY d.updated_at DESC
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
