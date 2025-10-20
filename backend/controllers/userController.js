import pool from "../config/db.js";

/**
 * 🧾 Lấy danh sách tất cả người dùng
 */
export const getAllUsers = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT id, name, email, role, status, created_at FROM users ORDER BY id DESC"
    );
    res.json(rows);
  } catch (error) {
    console.error("❌ Lỗi lấy danh sách người dùng:", error);
    res
      .status(500)
      .json({ message: "Lỗi server khi lấy danh sách người dùng" });
  }
};

/**
 * ✏️ Cập nhật vai trò hoặc trạng thái người dùng
 */
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { role, status } = req.body;

    await pool.query("UPDATE users SET role = ?, status = ? WHERE id = ?", [
      role,
      status,
      id,
    ]);

    res.json({ message: "✅ Cập nhật người dùng thành công" });
  } catch (error) {
    console.error("❌ Lỗi cập nhật người dùng:", error);
    res.status(500).json({ message: "Lỗi server khi cập nhật người dùng" });
  }
};

/**
 * 🗑️ Xóa người dùng
 */
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM users WHERE id = ?", [id]);
    res.json({ message: "🗑️ Đã xóa người dùng" });
  } catch (error) {
    console.error("❌ Lỗi xóa người dùng:", error);
    res.status(500).json({ message: "Lỗi server khi xóa người dùng" });
  }
};
