import db from "../config/db.js";
import { sendNotificationToDriver } from "../server.js";

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
      tracking_code,
      customer_id,
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

    // 📍 Mô phỏng vị trí ngẫu nhiên quanh Đà Nẵng
    const baseLat = 16.054407; // trung tâm Đà Nẵng
    const baseLng = 108.202167; // trung tâm Đà Nẵng
    const randomOffset = () => (Math.random() - 0.5) / 100; // lệch trong bán kính ~1km
    const latitude = baseLat + randomOffset();
    const longitude = baseLng + randomOffset();

    // 🔹 Thêm đơn hàng vào CSDL (có cả toạ độ)
    await db.query(
      `INSERT INTO shipments 
      (tracking_code, customer_id, sender_name, sender_phone, receiver_name, receiver_phone, pickup_address, delivery_address, weight_kg, cod_amount, status, current_location, latitude, longitude)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        tracking_code,
        customer_id,
        sender_name,
        sender_phone,
        receiver_name,
        receiver_phone,
        pickup_address,
        delivery_address,
        weight_kg,
        cod_amount,
        status || "pending",
        current_location || "",
        latitude,
        longitude,
      ]
    );

    res.json({
      message: "✅ Tạo đơn hàng thành công (vị trí mô phỏng quanh Đà Nẵng)",
      location: { latitude, longitude },
    });
  } catch (err) {
    console.error("❌ Lỗi khi tạo đơn hàng:", err);
    res.status(500).json({ error: "Không thể tạo đơn hàng mới" });
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
