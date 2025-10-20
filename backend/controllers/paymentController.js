import pool from "../config/db.js";

// 📄 Lấy danh sách thanh toán
export const listPayments = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT p.id, s.tracking_code, u.name AS customer_name,
             p.method, p.amount, p.status, p.paid_at
      FROM payments p
      JOIN shipments s ON p.shipment_id = s.id
      LEFT JOIN users u ON s.customer_id = u.id
      ORDER BY p.paid_at DESC
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: "Database error", error: err.message });
  }
};

// 📄 Lấy chi tiết 1 thanh toán
export const getPaymentById = async (req, res) => {
  try {
    const [rows] = await pool.query(`SELECT * FROM payments WHERE id = ?`, [
      req.params.id,
    ]);
    if (!rows.length)
      return res.status(404).json({ message: "Payment not found" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: "Database error", error: err.message });
  }
};

// ➕ Tạo thanh toán mới
export const createPayment = async (req, res) => {
  try {
    const { shipment_id, method, amount } = req.body;
    if (!shipment_id || !method || !amount)
      return res.status(400).json({ message: "Missing fields" });

    await pool.query(
      `INSERT INTO payments (shipment_id, method, amount, status)
       VALUES (?, ?, ?, 'pending')`,
      [shipment_id, method, amount]
    );
    res.json({ message: "Payment created" });
  } catch (err) {
    res.status(500).json({ message: "Database error", error: err.message });
  }
};

// ✏️ Cập nhật trạng thái thanh toán
export const updatePaymentStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!["pending", "paid", "failed", "refunded"].includes(status))
      return res.status(400).json({ message: "Invalid status" });

    await pool.query(
      `UPDATE payments SET status = ?, paid_at = IF(?='paid', NOW(), paid_at)
       WHERE id = ?`,
      [status, status, req.params.id]
    );
    res.json({ message: "Payment status updated" });
  } catch (err) {
    res.status(500).json({ message: "Database error", error: err.message });
  }
};
