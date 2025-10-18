import { db } from "../config/db.js";

/**
 * Tạo đơn hàng mới (Customer)
 */
export const createShipment = async (req, res) => {
  try {
    const {
      sender_name,
      sender_address,
      receiver_name,
      receiver_address,
      weight,
      fee,
    } = req.body;
    const customer_id = req.user.id;

    if (!sender_name || !receiver_name)
      return res.status(400).json({ error: "Thiếu thông tin người gửi/nhận" });

    // Tạo mã tracking ngẫu nhiên
    const tracking_code =
      "SS" + Math.floor(100000000 + Math.random() * 900000000);

    const [result] = await db.query(
      `INSERT INTO shipments 
       (customer_id, tracking_code, sender_name, sender_address, receiver_name, receiver_address, weight, fee) 
       VALUES (?,?,?,?,?,?,?,?)`,
      [
        customer_id,
        tracking_code,
        sender_name,
        sender_address,
        receiver_name,
        receiver_address,
        weight,
        fee,
      ]
    );

    res.json({
      message: "✅ Đơn hàng đã được tạo",
      shipment_id: result.insertId,
      tracking_code,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Lấy danh sách đơn hàng
 */
export const getAllShipments = async (req, res) => {
  try {
    const role = req.user.role;
    let query = "SELECT * FROM shipments";

    if (role === "customer") {
      query += ` WHERE customer_id=${req.user.id}`;
    } else if (role === "driver") {
      query += ` WHERE driver_id=${req.user.id}`;
    }

    const [rows] = await db.query(query);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Cập nhật trạng thái đơn hàng (Dispatcher / Driver)
 */
export const updateStatus = async (req, res) => {
  try {
    const { shipment_id, status, note } = req.body;

    await db.query("UPDATE shipments SET status=? WHERE id=?", [
      status,
      shipment_id,
    ]);

    await db.query(
      "INSERT INTO shipment_status (shipment_id, status, note) VALUES (?,?,?)",
      [shipment_id, status, note]
    );

    res.json({ message: "✅ Cập nhật trạng thái thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Phân công tài xế (Dispatcher)
 */
export const assignDriver = async (req, res) => {
  try {
    const { shipment_id, driver_id } = req.body;

    await db.query(
      "UPDATE shipments SET driver_id=?, status='Đang giao' WHERE id=?",
      [driver_id, shipment_id]
    );

    res.json({ message: "✅ Đã gán tài xế cho đơn hàng" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Lấy chi tiết 1 đơn hàng
 */
export const getShipmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query("SELECT * FROM shipments WHERE id=?", [id]);
    if (!rows.length)
      return res.status(404).json({ error: "Không tìm thấy đơn hàng" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
