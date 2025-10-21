import db from "../config/db.js";

/** ------------------------------
 *  LẤY ĐƠN CHƯA PHÂN CÔNG
 * ------------------------------ */
export const getUnassignedShipments = async (_req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT s.*
      FROM shipments s
      LEFT JOIN assignments a 
        ON a.shipment_id = s.id 
       AND a.status IN ('assigned','picking','delivering')
      WHERE a.id IS NULL 
        AND s.status IN ('pending','assigned','picking','delivering')
      ORDER BY s.created_at DESC
    `);
    res.json(rows);
  } catch (err) {
    console.error("❌ getUnassignedShipments error:", err);
    res.status(500).json({ message: "Lỗi server khi lấy đơn chưa phân công" });
  }
};

/** ------------------------------
 *  LẤY DANH SÁCH TÀI XẾ KHẢ DỤNG
 * ------------------------------ */
export const getAvailableDrivers = async (_req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT id, name, email, phone, status, vehicle_type
      FROM drivers
      WHERE status <> 'inactive'
      ORDER BY name ASC
    `);
    res.json(rows);
  } catch (err) {
    console.error("❌ getAvailableDrivers error:", err);
    res.status(500).json({ message: "Lỗi server khi lấy tài xế" });
  }
};

/** ------------------------------
 *  PHÂN CÔNG TÀI XẾ CHO ĐƠN HÀNG
 * ------------------------------ */
export const assignShipment = async (req, res) => {
  try {
    const { shipment_id, driver_id } = req.body;
    if (!shipment_id || !driver_id)
      return res
        .status(400)
        .json({ message: "Thiếu shipment_id hoặc driver_id" });

    await db.query(
      `INSERT INTO assignments (driver_id, shipment_id, status, assigned_at)
       VALUES (?, ?, 'assigned', NOW())`,
      [driver_id, shipment_id]
    );

    await db.query(
      `UPDATE shipments SET status='assigned', updated_at=NOW() WHERE id=?`,
      [shipment_id]
    );

    // 🚀 Khi phân công, tài xế chuyển sang bận
    await db.query(`UPDATE drivers SET status='delivering' WHERE id=?`, [
      driver_id,
    ]);

    res.json({ message: "✅ Đã phân công tài xế cho đơn hàng" });
  } catch (err) {
    console.error("❌ assignShipment error:", err);
    res.status(500).json({ message: "Lỗi server khi phân công đơn" });
  }
};

/** ------------------------------
 *  LẤY DANH SÁCH PHÂN CÔNG
 * ------------------------------ */
export const getAssignments = async (req, res) => {
  try {
    const activeOnly = String(req.query.activeOnly || "false") === "true";
    const where = activeOnly
      ? `WHERE a.status IN ('assigned','picking','delivering')`
      : ``;

    const [rows] = await db.query(`
      SELECT 
        a.id,
        a.shipment_id,
        a.driver_id,
        a.status AS assignment_status,
        a.assigned_at,
        s.tracking_code,
        s.status AS shipment_status,
        s.current_location,
        s.pickup_address,
        s.delivery_address,
        d.name AS driver_name,
        d.phone AS driver_phone,
        d.vehicle_type
      FROM assignments a
      JOIN shipments s ON s.id = a.shipment_id
      JOIN drivers d ON d.id = a.driver_id
      ${where}
      ORDER BY a.assigned_at DESC
    `);

    res.json(rows);
  } catch (err) {
    console.error("❌ getAssignments error:", err);
    res.status(500).json({ message: "Lỗi server khi lấy danh sách phân công" });
  }
};

/** ------------------------------
 *  CẬP NHẬT TRẠNG THÁI PHÂN CÔNG
 * ------------------------------ */
export const updateAssignmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, current_location } = req.body;

    if (!status) return res.status(400).json({ message: "Thiếu status" });

    await db.query(`UPDATE assignments SET status=? WHERE id=?`, [status, id]);

    const [[row]] = await db.query(
      `SELECT shipment_id, driver_id FROM assignments WHERE id=?`,
      [id]
    );
    if (!row)
      return res.status(404).json({ message: "Không tìm thấy assignment" });

    let shipmentStatus;
    switch (status) {
      case "assigned":
        shipmentStatus = "assigned";
        break;
      case "picking":
        shipmentStatus = "picking";
        break;
      case "delivering":
        shipmentStatus = "delivering";
        break;
      case "completed":
        shipmentStatus = "delivered";
        break;
      case "failed":
        shipmentStatus = "failed";
        break;
    }

    // cập nhật shipment
    const shipmentQuery = current_location
      ? `UPDATE shipments SET status=?, current_location=?, updated_at=NOW() WHERE id=?`
      : `UPDATE shipments SET status=?, updated_at=NOW() WHERE id=?`;

    await db.query(
      shipmentQuery,
      current_location
        ? [shipmentStatus, current_location, row.shipment_id]
        : [shipmentStatus, row.shipment_id]
    );

    // 🚀 Nếu hoàn tất hoặc thất bại → tài xế available lại
    if (status === "completed" || status === "failed") {
      await db.query(`UPDATE drivers SET status='available' WHERE id=?`, [
        row.driver_id,
      ]);
    }

    res.json({ message: "✅ Đã cập nhật trạng thái và đồng bộ tài xế" });
  } catch (err) {
    console.error("❌ updateAssignmentStatus error:", err);
    res.status(500).json({ message: "Lỗi server khi cập nhật trạng thái" });
  }
};

/** ------------------------------
 *  ĐỔI TÀI XẾ (RE-ASSIGN)
 * ------------------------------ */
export const reassignDriver = async (req, res) => {
  try {
    const { id } = req.params;
    const { driver_id } = req.body;
    if (!driver_id) return res.status(400).json({ message: "Thiếu driver_id" });

    await db.query(`UPDATE assignments SET driver_id=? WHERE id=?`, [
      driver_id,
      id,
    ]);

    res.json({ message: "✅ Đã đổi tài xế cho assignment" });
  } catch (err) {
    console.error("❌ reassignDriver error:", err);
    res.status(500).json({ message: "Lỗi server khi đổi tài xế" });
  }
};
