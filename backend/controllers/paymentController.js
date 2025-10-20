import db from "../config/db.js";

// 🧾 Lấy tất cả thanh toán
export const getAllPayments = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT p.*, s.tracking_code, u.name AS customer_name
      FROM payments p
      JOIN shipments s ON p.shipment_id = s.id
      JOIN users u ON p.customer_id = u.id
      ORDER BY p.created_at DESC
    `);
    res.json(rows);
  } catch (err) {
    console.error("❌ Lỗi lấy danh sách thanh toán:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
};

// ➕ Tạo mới thanh toán
export const createPayment = async (req, res) => {
  try {
    const { shipment_id, customer_id, amount, method } = req.body;
    await db.query(
      "INSERT INTO payments (shipment_id, customer_id, amount, method) VALUES (?, ?, ?, ?)",
      [shipment_id, customer_id, amount, method]
    );
    res.json({ message: "✅ Tạo thanh toán thành công" });
  } catch (err) {
    console.error("❌ Lỗi tạo thanh toán:", err);
    res.status(500).json({ message: "Lỗi server khi tạo thanh toán" });
  }
};

// ✏️ Cập nhật trạng thái
export const updatePaymentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    await db.query("UPDATE payments SET status = ? WHERE id = ?", [status, id]);
    res.json({ message: "✅ Cập nhật trạng thái thành công" });
  } catch (err) {
    console.error("❌ Lỗi cập nhật thanh toán:", err);
    res.status(500).json({ message: "Lỗi server khi cập nhật" });
  }
};

// 🗑️ Xóa thanh toán
export const deletePayment = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query("DELETE FROM payments WHERE id = ?", [id]);
    res.json({ message: "🗑️ Đã xóa thanh toán" });
  } catch (err) {
    console.error("❌ Lỗi xóa thanh toán:", err);
    res.status(500).json({ message: "Lỗi server khi xóa thanh toán" });
  }
};
