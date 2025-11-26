import db from "../config/db.js";

// Lấy thông báo cho DRIVER
export const getDriverNotifications = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query(
      "SELECT * FROM notifications WHERE receiver_id=? AND target_role='driver' ORDER BY created_at DESC",
      [id]
    );
    res.json(rows);
  } catch (err) {
    console.error("❌ Lỗi lấy thông báo driver:", err);
    res.status(500).json({ error: "Không thể lấy danh sách thông báo" });
  }
};

// Lấy thông báo cho DISPATCHER
export const getDispatcherNotifications = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query(
      "SELECT * FROM notifications WHERE receiver_id=? AND target_role='dispatcher' ORDER BY created_at DESC",
      [id]
    );
    res.json(rows);
  } catch (err) {
    console.error("❌ Lỗi lấy thông báo dispatcher:", err);
    res.status(500).json({ error: "Không thể lấy danh sách thông báo" });
  }
};

// Đánh dấu đã đọc
export const markNotificationRead = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query("UPDATE notifications SET is_read=1 WHERE id=?", [id]);
    res.json({ message: "✅ Đã đánh dấu đã đọc" });
  } catch (err) {
    console.error("❌ Lỗi cập nhật:", err);
    res.status(500).json({ error: "Không thể cập nhật thông báo" });
  }
};
