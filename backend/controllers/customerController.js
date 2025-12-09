import pool from "../config/db.js";
import bcrypt from "bcrypt";

// Lấy thông tin hồ sơ khách hàng
export const getCustomerProfile = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT id, name, email, phone, status FROM users WHERE id = ? AND role = 'customer'",
      [req.params.id]
    );
    if (rows.length === 0)
      return res.status(404).json({ message: "Customer not found" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Cập nhật hồ sơ khách hàng
export const updateCustomerProfile = async (req, res) => {
  const { name, email, phone, password } = req.body;

  try {
    // Nếu có password mới -> hash
    if (password && password.trim() !== "") {
      const hashed = await bcrypt.hash(password, 10);

      await pool.query(
        "UPDATE users SET name = ?, email = ?, phone = ?, password = ? WHERE id = ? AND role = 'customer'",
        [name, email, phone, hashed, req.params.id]
      );
    } else {
      // Không đổi mật khẩu
      await pool.query(
        "UPDATE users SET name = ?, email = ?, phone = ? WHERE id = ? AND role = 'customer'",
        [name, email, phone, req.params.id]
      );
    }

    res.json({ message: "Cập nhật hồ sơ thành công!" });
  } catch (err) {
    console.error("❌ Lỗi updateCustomerProfile:", err);
    res.status(500).json({ message: err.message });
  }
};

//Tạo đơn hàng mới (và tự động tạo thanh toán)
export const createShipment = async (req, res) => {
  const {
    customer_id,
    sender_name,
    sender_phone,
    receiver_name,
    receiver_phone,
    item_name,
    pickup_address,
    delivery_address,
    weight_kg,
    cod_amount,
    shipping_fee, // FE gửi
    service_type, // standard / express / fast
    payment_method = "COD",
  } = req.body;

  try {
    // Tạo mã vận đơn
    const tracking = `SP${Date.now().toString().slice(-6)}`;

    const [result] = await pool.query(
      `INSERT INTO shipments(
    tracking_code,
    customer_id,
    sender_name, sender_phone,
    receiver_name, receiver_phone,
    item_name,
    pickup_address, pickup_lat, pickup_lng,
    delivery_address, delivery_lat, delivery_lng,
    weight_kg,
    cod_amount,
    shipping_fee,
    service_type,
    payment_method,
    status
  )
  VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?, 'pending')`,
      [
        tracking,
        customer_id,
        sender_name,
        sender_phone,
        receiver_name,
        receiver_phone,
        item_name,
        pickup_address,
        pickup_lat,
        pickup_lng,
        delivery_address,
        delivery_lat,
        delivery_lng,
        weight_kg,
        cod_amount,
        shipping_fee,
        service_type,
        payment_method,
      ]
    );

    const shipment_id = result.insertId;

    // Nếu thanh toán Momo -> tạo payment chờ xử lý
    if (payment_method === "MOMO") {
      await pool.query(
        `INSERT INTO payments (shipment_id, customer_id, amount, method, status)
         VALUES (?, ?, ?, ?, 'pending')`,
        [shipment_id, customer_id, cod_amount + shipping_fee, payment_method]
      );
    }

    res.json({
      message: "Tạo đơn hàng thành công",
      shipment_id,
      tracking_code: tracking,
    });
  } catch (err) {
    console.error("❌ Lỗi tạo đơn hàng:", err);
    res.status(500).json({ message: err.message });
  }
};

// Lấy danh sách đơn hàng theo khách hàng
export const getShipmentsByCustomer = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM shipments WHERE customer_id = ? ORDER BY created_at DESC",
      [req.params.customer_id]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//Gửi feedback
export const createFeedback = async (req, res) => {
  const { customer_id, shipment_id, content, rating } = req.body;
  try {
    await pool.query(
      "INSERT INTO feedbacks (customer_id, shipment_id, content, rating, created_at) VALUES (?,?,?,?,NOW())",
      [customer_id, shipment_id, content, rating]
    );
    res.json({ message: "Feedback submitted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Theo dõi đơn hàng theo mã (tracking_code) — chỉ cho khách hàng của chính mình
export const trackShipment = async (req, res) => {
  try {
    const { code } = req.params;
    const customerId = req.query.customer_id || null;
    const last4 = req.query.last4 || null; // 4 số cuối SĐT

    if (!code) {
      return res.status(400).json({ message: "Thiếu mã vận đơn!" });
    }

    let query = `
      SELECT 
        s.*, 
        d.name AS driver_name, d.phone AS driver_phone,
        d.latitude AS driver_lat, d.longitude AS driver_lng
      FROM shipments s
      LEFT JOIN assignments a ON a.shipment_id = s.id
      LEFT JOIN drivers d ON a.driver_id = d.id
      WHERE s.tracking_code = ?
    `;
    const params = [code];

    //  Nếu là khách hàng đã đăng nhập → chỉ xem đơn của mình
    if (customerId) {
      query += " AND s.customer_id = ?";
      params.push(customerId);
    }
    //  Nếu là khách vãng lai → yêu cầu nhập 4 số cuối SĐT
    else if (last4) {
      query +=
        " AND RIGHT(REGEXP_REPLACE(s.receiver_phone, '[^0-9]', ''), 4) = ?";
      params.push(last4);
    } else {
      return res.status(400).json({
        message: "Khách vãng lai phải nhập 4 số cuối SĐT người nhận!",
      });
    }

    const [rows] = await pool.query(query, params);

    if (!rows.length) {
      return res.status(404).json({
        message: "Không tìm thấy đơn hàng hoặc thông tin xác thực không đúng!",
      });
    }

    const shipment = rows[0];

    res.json(shipment);
  } catch (err) {
    console.error("❌ Lỗi tra cứu đơn:", err);
    res.status(500).json({ message: "Lỗi máy chủ!" });
  }
};

//  Xem chi tiết đơn hàng (hiển thị vị trí tài xế)
export const getShipmentDetail = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT 
          s.*, 
          d.name AS driver_name,
          d.latitude AS driver_lat,
          d.longitude AS driver_lng
       FROM shipments s
       LEFT JOIN assignments a ON a.shipment_id = s.id
       LEFT JOIN drivers d ON a.driver_id = d.id
       WHERE s.id = ?`,
      [req.params.id]
    );

    if (!rows.length)
      return res.status(404).json({ message: "Không tìm thấy đơn hàng" });

    res.json(rows[0]);
  } catch (err) {
    console.error("❌ Lỗi SQL:", err);
    res.status(500).json({ message: err.message });
  }
};
