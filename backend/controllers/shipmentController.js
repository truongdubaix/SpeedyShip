import db from "../config/db.js";

/**
 * 🧾 Lấy danh sách tất cả đơn hàng
 */
export const getAllShipments = async (req, res) => {
  try {
    // Lấy toàn bộ đơn hàng, sắp xếp theo ngày tạo mới nhất
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
 * ➕ Tạo đơn hàng mới
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

    // Truy vấn thêm vào CSDL
    await db.query(
      `INSERT INTO shipments 
      (tracking_code, customer_id, sender_name, sender_phone, receiver_name, receiver_phone, pickup_address, delivery_address, weight_kg, cod_amount, status, current_location)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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
      ]
    );

    res.json({ message: "✅ Tạo đơn hàng thành công" });
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

    // Cập nhật đơn hàng
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
 * 🔁 Cập nhật trạng thái đơn hàng riêng (chỉ thay đổi field status)
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
