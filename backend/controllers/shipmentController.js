import db from "../config/db.js";
import {
  sendNotificationToDriver,
  sendNotificationToDispatcher,
} from "../server.js";

/**
 * 🧾 Lấy danh sách tất cả đơn hàng
 */
export const getAllShipments = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM shipments ORDER BY created_at DESC"
    );
    res.json(rows);
  } catch (err) {
    console.error("❌ Lỗi khi lấy danh sách đơn hàng:", err);
    res.status(500).json({ error: "Không thể lấy danh sách đơn hàng" });
  }
};

/**
 * 🧭 Lấy chi tiết 1 đơn hàng (kèm tọa độ)
 */
export const getShipmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query("SELECT * FROM shipments WHERE id = ?", [id]);
    if (!rows.length)
      return res.status(404).json({ error: "Không tìm thấy đơn hàng" });
    res.json(rows[0]);
  } catch (err) {
    console.error("❌ Lỗi khi lấy chi tiết đơn hàng:", err);
    res.status(500).json({ error: "Không thể lấy chi tiết đơn hàng" });
  }
};

/**
 * ➕ Tạo đơn hàng mới (mô phỏng vị trí quanh Đà Nẵng)
 */

export const createShipment = async (req, res) => {
  try {
    const {
      sender_name,
      sender_phone,
      receiver_name,
      receiver_phone,
      pickup_address,
      delivery_address,
      weight_kg,
      cod_amount,
      customer_id,
    } = req.body;

    // 🔹 Tạo tracking code ngẫu nhiên
    const tracking_code = "SP" + Date.now().toString().slice(-6);

    const [result] = await db.query(
      `INSERT INTO shipments 
       (tracking_code, sender_name, sender_phone, receiver_name, receiver_phone, 
        pickup_address, delivery_address, weight_kg, cod_amount, 
        customer_id, status, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', NOW())`,
      [
        tracking_code,
        sender_name,
        sender_phone,
        receiver_name,
        receiver_phone,
        pickup_address,
        delivery_address,
        weight_kg,
        cod_amount,
        customer_id,
      ]
    );

    const newShipmentId = result.insertId;

    await sendNotificationToDispatcher(
      1,
      newShipmentId,
      `🆕 Đơn hàng #${newShipmentId} vừa được khách hàng tạo mới.`
    );

    res.status(201).json({
      message: "Tạo đơn hàng thành công!",
      shipmentId: newShipmentId,
      tracking_code,
    });
  } catch (err) {
    console.error("❌ Lỗi tạo đơn hàng:", err);
    res.status(500).json({ error: "Không thể tạo đơn hàng" });
  }
};

/**
 * ✏️ Cập nhật thông tin đơn hàng
 */
export const updateShipment = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      sender_name,
      sender_phone,
      receiver_name,
      receiver_phone,
      pickup_address,
      delivery_address,
      weight_kg,
      cod_amount,
      status,
      current_location,
    } = req.body;

    await db.query(
      `UPDATE shipments 
       SET sender_name=?, sender_phone=?, receiver_name=?, receiver_phone=?, 
           pickup_address=?, delivery_address=?, weight_kg=?, cod_amount=?, 
           status=?, current_location=?, updated_at=NOW()
       WHERE id=?`,
      [
        sender_name,
        sender_phone,
        receiver_name,
        receiver_phone,
        pickup_address,
        delivery_address,
        weight_kg,
        cod_amount,
        status,
        current_location,
        id,
      ]
    );

    res.json({ message: "✅ Cập nhật đơn hàng thành công" });
  } catch (err) {
    console.error("❌ Lỗi khi cập nhật đơn hàng:", err);
    res.status(500).json({ error: "Không thể cập nhật đơn hàng" });
  }
};

/**
 * 🔁 Cập nhật trạng thái đơn hàng riêng
 */
export const updateShipmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    await db.query(
      "UPDATE shipments SET status=?, updated_at=NOW() WHERE id=?",
      [status, id]
    );
    res.json({ message: "🔄 Cập nhật trạng thái thành công" });
  } catch (err) {
    console.error("❌ Lỗi khi cập nhật trạng thái:", err);
    res.status(500).json({ error: "Không thể cập nhật trạng thái đơn hàng" });
  }
};

/**
 * 🗑️ Xóa đơn hàng
 */
export const deleteShipment = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query("DELETE FROM shipments WHERE id=?", [id]);
    res.json({ message: "🗑️ Đã xóa đơn hàng thành công" });
  } catch (err) {
    console.error("❌ Lỗi khi xóa đơn hàng:", err);
    res.status(500).json({ error: "Không thể xóa đơn hàng" });
  }
};

/**
 * 🚚 Phân công tài xế (Dispatcher)
 */
export const assignShipment = async (req, res) => {
  try {
    const { driver_id, shipment_id } = req.body;

    if (!driver_id || !shipment_id) {
      return res
        .status(400)
        .json({ error: "Thiếu driver_id hoặc shipment_id" });
    }

    // 1️⃣ Cập nhật shipment sang trạng thái 'assigned'
    await db.query(
      "UPDATE shipments SET status = 'assigned', updated_at = NOW() WHERE id = ?",
      [shipment_id]
    );

    // 2️⃣ Ghi lịch sử phân công
    await db.query(
      "INSERT INTO assignments (shipment_id, driver_id, status) VALUES (?, ?, 'assigned')",
      [shipment_id, driver_id]
    );

    // 3️⃣ Gửi thông báo realtime
    const message = `Bạn vừa được phân công đơn hàng #${shipment_id}`;
    await sendNotificationToDriver(driver_id, shipment_id, message);

    // 4️⃣ Cập nhật trạng thái tài xế
    await db.query("UPDATE drivers SET status='delivering' WHERE id = ?", [
      driver_id,
    ]);

    res.json({
      message: "✅ Đã phân công đơn hàng và gửi thông báo tới tài xế",
    });
  } catch (err) {
    console.error("❌ Lỗi khi phân công tài xế:", err);
    res.status(500).json({ error: "Không thể phân công tài xế" });
  }
};
export const getShipmentByCode = async (req, res) => {
  try {
    const { code } = req.params;

    const [[shipment]] = await db.query(
      "SELECT * FROM shipments WHERE tracking_code = ?",
      [code]
    );

    if (!shipment)
      return res.status(404).json({ message: "Không tìm thấy đơn hàng" });

    res.json(shipment);
  } catch (err) {
    console.error("❌ Lỗi lấy đơn theo mã:", err);
    res.status(500).json({ message: "Không thể lấy đơn hàng" });
  }
};
