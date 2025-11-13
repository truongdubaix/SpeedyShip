import express from "express";
import pool from "../config/db.js";

const router = express.Router();

//  Lấy tất cả vai trò
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT id, name FROM roles ORDER BY id ASC"
    );
    res.json(rows);
  } catch (err) {
    console.error("❌ Lỗi lấy roles:", err);
    res.status(500).json({ message: "Lỗi khi lấy danh sách roles" });
  }
});

export default router;
