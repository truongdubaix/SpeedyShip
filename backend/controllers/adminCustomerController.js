import db from "../config/db.js";

// Lấy danh sách khách hàng
export const getAllCustomers = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT u.id, u.name, u.email, u.phone, u.status,
             (SELECT COUNT(*) FROM shipments s WHERE s.customer_id = u.id) AS total_orders
      FROM users u
      WHERE u.role = 'customer'
      ORDER BY u.created_at DESC
    `);
    res.json(rows);
  } catch (err) {
    console.error("❌ Lỗi khi lấy danh sách khách hàng:", err);
    res
      .status(500)
      .json({ message: "Lỗi server khi tải danh sách khách hàng" });
  }
};

//  Cập nhật trạng thái (Khóa / Hoạt động)
export const updateCustomerStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    await db.query("UPDATE users SET status = ? WHERE id = ?", [status, id]);
    res.json({ message: "✅ Cập nhật trạng thái thành công" });
  } catch (err) {
    console.error("❌ Lỗi cập nhật trạng thái:", err);
    res.status(500).json({ message: "Lỗi server khi cập nhật trạng thái" });
  }
};

// Xóa khách hàng
export const deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query("DELETE FROM users WHERE id = ?", [id]);
    res.json({ message: "🗑️ Đã xóa khách hàng" });
  } catch (err) {
    console.error("❌ Lỗi xóa khách hàng:", err);
    res.status(500).json({ message: "Lỗi server khi xóa khách hàng" });
  }
};
