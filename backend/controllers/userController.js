import pool from "../config/db.js";

/**
 * 🧾 Lấy danh sách người dùng (JOIN user_roles + roles)
 */
export const getAllUsers = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        u.id,
        u.name,
        u.email,
        u.status,
        u.created_at,
        ur.role_id,
        r.name AS role_name
      FROM users u
      LEFT JOIN user_roles ur ON u.id = ur.user_id
      LEFT JOIN roles r ON ur.role_id = r.id
      ORDER BY u.id DESC
    `);
    res.json(rows);
  } catch (error) {
    console.error("❌ Lỗi lấy danh sách người dùng:", error);
    res.status(500).json({
      message: "Lỗi server khi lấy danh sách người dùng",
      error,
    });
  }
};

/**
 * 🔄 Cập nhật vai trò hoặc trạng thái người dùng
 */
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, status, role_id } = req.body;

    console.log("🟡 updateUser body:", req.body);

    // 🔍 Kiểm tra user tồn tại
    const [[user]] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
    if (!user) return res.status(404).json({ message: "Không tìm thấy user" });

    // 🧩 Cập nhật user
    await pool.query(
      "UPDATE users SET name = ?, email = ?, status = ? WHERE id = ?",
      [name || user.name, email || user.email, status || user.status, id]
    );

    // 🧩 Nếu có role_id thì cập nhật vào bảng user_roles
    if (role_id) {
      const [[exist]] = await pool.query(
        "SELECT * FROM user_roles WHERE user_id = ?",
        [id]
      );

      if (exist) {
        await pool.query(
          "UPDATE user_roles SET role_id = ? WHERE user_id = ?",
          [role_id, id]
        );
      } else {
        await pool.query(
          "INSERT INTO user_roles (user_id, role_id) VALUES (?, ?)",
          [id, role_id]
        );
      }
    }

    res.json({ message: "✅ Cập nhật người dùng thành công" });
  } catch (err) {
    console.error("❌ Lỗi updateUser chi tiết:", err);
    res
      .status(500)
      .json({ message: "Lỗi khi cập nhật người dùng", error: err.message });
  }
};

/**
 * 🗑️ Xóa người dùng
 */
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM user_roles WHERE user_id = ?", [id]);
    await pool.query("DELETE FROM users WHERE id = ?", [id]);
    res.json({ message: "🗑️ Đã xóa người dùng" });
  } catch (error) {
    console.error("❌ Lỗi xóa người dùng:", error);
    res.status(500).json({ message: "Lỗi server khi xóa người dùng" });
  }
};
