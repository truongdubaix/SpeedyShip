import pool from "../config/db.js";

// 📄 Lấy thông tin hồ sơ khách hàng
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

// ✏️ Cập nhật hồ sơ khách hàng
export const updateCustomerProfile = async (req, res) => {
  const { name, email, phone } = req.body;
  try {
    await pool.query(
      "UPDATE users SET name = ?, email = ?, phone = ? WHERE id = ? AND role = 'customer'",
      [name, email, phone, req.params.id]
    );
    res.json({ message: "Cập nhật hồ sơ thành công!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🧾 3️⃣ Tạo đơn hàng mới (và tự động tạo thanh toán)
export const createShipment = async (req, res) => {
  const {
    customer_id,
    sender_name,
    sender_phone,
    receiver_name,
    receiver_phone,
    pickup_address,
    delivery_address,
    weight_kg,
    cod_amount,
    method = "COD", // thêm lựa chọn thanh toán
  } = req.body;

  try {
    const tracking = `SP${Date.now().toString().slice(-6)}`;
    const [result] = await pool.query(
      `INSERT INTO shipments(
        tracking_code, customer_id, sender_name, sender_phone,
        receiver_name, receiver_phone, pickup_address, delivery_address,
        weight_kg, cod_amount, status
      ) VALUES (?,?,?,?,?,?,?,?,?,?, 'pending')`,
      [
        tracking,
        customer_id,
        sender_name,
        sender_phone,
        receiver_name,
        receiver_phone,
        pickup_address,
        delivery_address,
        weight_kg,
        cod_amount,
      ]
    );

    const shipment_id = result.insertId;

    // ✅ Sau khi tạo shipment => tạo luôn payment
    await pool.query(
      `INSERT INTO payments (shipment_id, customer_id, amount, method, status)
       VALUES (?, ?, ?, ?, 'pending')`,
      [shipment_id, customer_id, cod_amount, method]
    );

    res.json({
      message: "✅ Tạo đơn hàng và thanh toán thành công",
      shipment_id,
      tracking_code: tracking,
    });
  } catch (err) {
    console.error("❌ Lỗi tạo đơn hàng:", err);
    res.status(500).json({ message: err.message });
  }
};

// 4️⃣ Lấy danh sách đơn hàng theo khách hàng
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

// 5️⃣ Gửi feedback
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

// 6️⃣ Theo dõi đơn hàng theo mã (tracking_code)
export const trackShipment = async (req, res) => {
  try {
    const { code } = req.params;
    const [rows] = await pool.query(
      "SELECT * FROM shipments WHERE tracking_code = ?",
      [code]
    );
    if (rows.length === 0)
      return res.status(404).json({ message: "Không tìm thấy đơn hàng" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 7️⃣ Xem chi tiết đơn hàng (hiển thị vị trí tài xế)
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
