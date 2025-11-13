import db from "../config/db.js";
import crypto from "crypto";
import axios from "axios";

//  Lấy tất cả thanh toán
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

// Tạo mới thanh toán (thường)
export const createPayment = async (req, res) => {
  try {
    const { shipment_id, customer_id, amount, method } = req.body;
    await db.query(
      "INSERT INTO payments (shipment_id, customer_id, amount, method, status) VALUES (?, ?, ?, ?, 'pending')",
      [shipment_id, customer_id, amount, method]
    );
    res.json({ message: "✅ Tạo thanh toán thành công" });
  } catch (err) {
    console.error("❌ Lỗi tạo thanh toán:", err);
    res.status(500).json({ message: "Lỗi server khi tạo thanh toán" });
  }
};

// Cập nhật trạng thái thanh toán
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

// Thanh toán bằng MoMo (sandbox)
export const createMomoPayment = async (req, res) => {
  try {
    const { shipment_id, customer_id, amount } = req.body;
    // console.log("📦 Nhận dữ liệu MoMo:", { shipment_id, customer_id, amount });
    if (!shipment_id || !customer_id || !amount)
      return res.status(400).json({ error: "Thiếu dữ liệu thanh toán" });

    const partnerCode = "MOMO";
    const accessKey = "F8BBA842ECF85";
    const secretKey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
    const orderId = `MM${Date.now()}`;
    const requestId = orderId;
    const orderInfo = "Thanh toán đơn hàng SpeedyShip (test)";
    const redirectUrl = `http://localhost:5173/customer/payment-success?orderId=${orderId}&resultCode=0`;
    const ipnUrl = "http://localhost:5000/api/payments/momo/callback";
    const requestType = "captureWallet";

    const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;

    const signature = crypto
      .createHmac("sha256", secretKey)
      .update(rawSignature)
      .digest("hex");

    const body = {
      partnerCode,
      accessKey,
      requestId,
      amount,
      orderId,
      orderInfo,
      redirectUrl,
      ipnUrl,
      requestType,
      signature,
      extraData: "",
    };

    // Gọi tới MoMo sandbox
    const momoRes = await axios.post(
      "https://test-payment.momo.vn/v2/gateway/api/create",
      body
    );

    // // 🧾 Ghi vào bảng payments (trạng thái pending)
    // console.log("🟢 Chuẩn bị ghi vào payments:", {
    //   orderId,
    //   shipment_id,
    //   customer_id,
    //   amount,
    // });

    await db.query(
      `INSERT INTO payments (order_id, shipment_id, customer_id, amount, method, status)
       VALUES (?, ?, ?, ?, ?, 'pending')`,
      [orderId, shipment_id, customer_id, amount, "Momo"]
    );

    // Trả link về frontend
    res.json({
      ...momoRes.data,
      payUrl: momoRes.data.payUrl,
    });
  } catch (err) {
    console.error("❌ MoMo payment error:", err.response?.data || err.message);
    res.status(500).json({ error: "Lỗi tạo thanh toán MoMo sandbox" });
  }
};

// IPN callback từ MoMo
export const momoIPN = async (req, res) => {
  try {
    const { orderId, resultCode } = req.body;
    // console.log("📥 Payload IPN MoMo:", req.body);

    if (!orderId) return res.status(400).json({ message: "Thiếu orderId" });

    const status = resultCode === 0 ? "completed" : "failed";
    await db.query("UPDATE payments SET status=? WHERE order_id=?", [
      status,
      orderId,
    ]);

    // console.log("💰 Cập nhật thanh toán:", orderId, status);

    // Nếu là môi trường test, tự động redirect về frontend
    if (process.env.NODE_ENV !== "production") {
      const redirectUrl = `http://localhost:5173/customer/payment-success?orderId=${orderId}&resultCode=${resultCode}`;
      // console.log("🧭 Auto redirect test:", redirectUrl);
      // ⏳ Delay 2s để nhìn thấy console log trước khi chuyển
      setTimeout(() => {
        res.redirect(redirectUrl);
      }, 5000);
      return;
    }

    //  Nếu là production → chỉ trả JSON để MoMo nhận
    res.json({ message: "IPN received", orderId, status });
  } catch (err) {
    console.error("❌ Lỗi IPN:", err);
    res.status(500).json({ message: "Lỗi xử lý IPN" });
  }
};

//  Xóa thanh toán
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
