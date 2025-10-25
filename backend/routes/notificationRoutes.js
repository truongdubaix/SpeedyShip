import express from "express";
import db from "../config/db.js";

const router = express.Router();

// 🔹 Lấy thông báo theo driver
router.get("/:driver_id", async (req, res) => {
  try {
    const { driver_id } = req.params;
    const [rows] = await db.query(
      "SELECT * FROM notifications WHERE driver_id=? ORDER BY created_at DESC",
      [driver_id]
    );
    res.json(rows);
  } catch (err) {
    console.error("❌ Lỗi khi lấy thông báo:", err);
    res.status(500).json({ error: "Không thể lấy danh sách thông báo" });
  }
});

// 🔸 Đánh dấu đã đọc
router.put("/:id/read", async (req, res) => {
  try {
    const { id } = req.params;
    await db.query("UPDATE notifications SET is_read=1 WHERE id=?", [id]);
    res.json({ message: "✅ Đã đánh dấu đã đọc" });
  } catch (err) {
    console.error("❌ Lỗi khi cập nhật:", err);
    res.status(500).json({ error: "Không thể cập nhật thông báo" });
  }
});

export default router;
