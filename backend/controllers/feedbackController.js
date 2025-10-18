import { db } from "../config/db.js";

/**
 * POST /api/feedback
 * Gửi đánh giá (Customer)
 */
export const createFeedback = async (req, res) => {
  try {
    const { shipment_id, rating, comment } = req.body;
    const user_id = req.user.id;

    if (!rating || rating < 1 || rating > 5)
      return res.status(400).json({ error: "Điểm đánh giá phải từ 1 đến 5" });

    const [result] = await db.query(
      "INSERT INTO feedback (user_id, shipment_id, rating, comment) VALUES (?,?,?,?)",
      [user_id, shipment_id || null, rating, comment || null]
    );

    res.json({
      message: "✅ Cảm ơn bạn đã gửi phản hồi",
      feedback_id: result.insertId,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * GET /api/feedback
 * Danh sách phản hồi (Admin)
 */
export const listFeedback = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT f.*, u.name AS user_name, s.tracking_code
       FROM feedback f
       LEFT JOIN users u ON f.user_id = u.id
       LEFT JOIN shipments s ON f.shipment_id = s.id
       ORDER BY f.created_at DESC`
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * GET /api/feedback/my
 * Xem phản hồi của chính người dùng (Customer)
 */
export const myFeedback = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT f.*, s.tracking_code
       FROM feedback f LEFT JOIN shipments s ON f.shipment_id = s.id
       WHERE f.user_id=? ORDER BY f.created_at DESC`,
      [req.user.id]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * DELETE /api/feedback/:id
 * Xóa phản hồi (Admin)
 */
export const deleteFeedback = async (req, res) => {
  try {
    const [result] = await db.query("DELETE FROM feedback WHERE id=?", [
      req.params.id,
    ]);
    if (result.affectedRows === 0)
      return res.status(404).json({ error: "Không tìm thấy phản hồi" });

    res.json({ message: "🗑️ Đã xóa phản hồi" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
