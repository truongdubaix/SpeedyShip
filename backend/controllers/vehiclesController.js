import { db } from "../config/db.js";

/**
 * GET /api/vehicles
 * Danh sách phương tiện (Admin/Dispatcher)
 * Hỗ trợ filter: ?status=Hoạt động&vehicle_type=Xe máy
 */
export const listVehicles = async (req, res) => {
  try {
    const { status, vehicle_type } = req.query;
    const where = [];
    const params = [];

    if (status) {
      where.push("status = ?");
      params.push(status);
    }
    if (vehicle_type) {
      where.push("vehicle_type = ?");
      params.push(vehicle_type);
    }

    const sql =
      "SELECT v.*, u.name AS driver_name, u.email AS driver_email " +
      "FROM vehicles v LEFT JOIN users u ON v.driver_id = u.id " +
      (where.length ? "WHERE " + where.join(" AND ") : "") +
      " ORDER BY v.id DESC";

    const [rows] = await db.query(sql, params);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * GET /api/vehicles/:id
 */
export const getVehicle = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT v.*, u.name AS driver_name, u.email AS driver_email " +
        "FROM vehicles v LEFT JOIN users u ON v.driver_id = u.id WHERE v.id=?",
      [req.params.id]
    );
    if (!rows.length)
      return res.status(404).json({ error: "Không tìm thấy phương tiện" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * POST /api/vehicles
 * Body: { license_plate, vehicle_type?, capacity?, status? }
 * Admin
 */
export const createVehicle = async (req, res) => {
  try {
    const { license_plate, vehicle_type, capacity, status } = req.body;
    if (!license_plate)
      return res.status(400).json({ error: "Thiếu biển số xe" });

    const [exist] = await db.query(
      "SELECT id FROM vehicles WHERE license_plate=?",
      [license_plate]
    );
    if (exist.length)
      return res.status(400).json({ error: "Biển số đã tồn tại" });

    const [result] = await db.query(
      "INSERT INTO vehicles (license_plate, vehicle_type, capacity, status) VALUES (?,?,?,?)",
      [
        license_plate,
        vehicle_type || "Xe máy",
        capacity || 0,
        status || "Hoạt động",
      ]
    );
    res.json({ message: "✅ Đã tạo phương tiện", vehicle_id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * PUT /api/vehicles/:id
 * Admin
 */
export const updateVehicle = async (req, res) => {
  try {
    const { license_plate, vehicle_type, capacity, status } = req.body;

    const [result] = await db.query(
      "UPDATE vehicles SET " +
        "license_plate = COALESCE(?, license_plate), " +
        "vehicle_type = COALESCE(?, vehicle_type), " +
        "capacity = COALESCE(?, capacity), " +
        "status = COALESCE(?, status) " +
        "WHERE id=?",
      [
        license_plate || null,
        vehicle_type || null,
        capacity ?? null,
        status || null,
        req.params.id,
      ]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ error: "Không tìm thấy phương tiện" });

    res.json({ message: "✅ Cập nhật phương tiện thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * DELETE /api/vehicles/:id
 * Admin
 */
export const deleteVehicle = async (req, res) => {
  try {
    const [result] = await db.query("DELETE FROM vehicles WHERE id=?", [
      req.params.id,
    ]);
    if (result.affectedRows === 0)
      return res.status(404).json({ error: "Không tìm thấy phương tiện" });

    res.json({ message: "🗑️ Đã xóa phương tiện" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * PUT /api/vehicles/:id/assign-driver
 * Admin/Dispatcher
 * Body: { driver_id }  (null để bỏ gán)
 */
export const assignDriverToVehicle = async (req, res) => {
  try {
    const { driver_id } = req.body; // có thể null
    const [result] = await db.query(
      "UPDATE vehicles SET driver_id = ? WHERE id = ?",
      [driver_id ?? null, req.params.id]
    );
    if (result.affectedRows === 0)
      return res.status(404).json({ error: "Không tìm thấy phương tiện" });

    res.json({
      message: driver_id ? "✅ Đã gán tài xế cho xe" : "✅ Đã bỏ gán tài xế",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * GET /api/vehicles/available
 * Danh sách xe đang 'Hoạt động' và chưa gán tài xế (để điều phối)
 */
export const listAvailableVehicles = async (_req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM vehicles WHERE status='Hoạt động' AND (driver_id IS NULL)"
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
