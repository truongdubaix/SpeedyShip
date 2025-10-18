import { db } from "../config/db.js";

/**
 * POST /api/payments/cod
 * Thanh toán COD – tạo record đơn giản
 */
export const payCOD = async (req, res) => {
  try {
    const { shipment_id, amount } = req.body;
    const user_id = req.user.id;
    if (!shipment_id || !amount)
      return res
        .status(400)
        .json({ error: "Thiếu thông tin đơn hàng hoặc số tiền" });

    const [result] = await db.query(
      "INSERT INTO payments (shipment_id, user_id, amount, method, status) VALUES (?,?,?,?,?)",
      [shipment_id, user_id, amount, "COD", "Thành công"]
    );

    res.json({
      message: "✅ Thanh toán COD thành công",
      payment_id: result.insertId,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * POST /api/payments/vnpay
 * Giả lập thanh toán VNPay (mock)
 */
export const payVNPay = async (req, res) => {
  try {
    const { shipment_id, amount } = req.body;
    const user_id = req.user.id;

    const transCode = "VNP" + Date.now();

    const [result] = await db.query(
      "INSERT INTO payments (shipment_id, user_id, amount, method, status, transaction_code) VALUES (?,?,?,?,?,?)",
      [shipment_id, user_id, amount, "VNPay", "Thành công", transCode]
    );

    res.json({
      message: "✅ Thanh toán VNPay thành công (mock)",
      transaction_code: transCode,
      payment_id: result.insertId,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * POST /api/payments/momo
 * Giả lập thanh toán Momo
 */
export const payMomo = async (req, res) => {
  try {
    const { shipment_id, amount } = req.body;
    const user_id = req.user.id;
    const transCode = "MOMO" + Date.now();

    const [result] = await db.query(
      "INSERT INTO payments (shipment_id, user_id, amount, method, status, transaction_code) VALUES (?,?,?,?,?,?)",
      [shipment_id, user_id, amount, "Momo", "Thành công", transCode]
    );

    res.json({
      message: "✅ Thanh toán Momo thành công (mock)",
      transaction_code: transCode,
      payment_id: result.insertId,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * GET /api/payments/history
 * Xem lịch sử thanh toán (customer/admin)
 */
export const getPaymentHistory = async (req, res) => {
  try {
    const role = req.user.role;
    let sql = "SELECT * FROM payments";
    let params = [];

    if (role === "customer") {
      sql += " WHERE user_id=?";
      params = [req.user.id];
    }

    const [rows] = await db.query(sql + " ORDER BY created_at DESC", params);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * GET /api/payments/:shipment_id
 * Xem chi tiết thanh toán cho 1 đơn hàng
 */
export const getPaymentByShipment = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM payments WHERE shipment_id=? LIMIT 1",
      [req.params.shipment_id]
    );
    if (!rows.length)
      return res.status(404).json({ error: "Chưa có thanh toán cho đơn này" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
