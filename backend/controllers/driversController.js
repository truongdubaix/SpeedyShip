import { db } from "../config/db.js";

/**
 * Lấy id role driver
 */
const getDriverRoleId = async () => {
  const [r] = await db.query(
    "SELECT id FROM roles WHERE code='driver' LIMIT 1"
  );
  return r.length ? r[0].id : null;
};

/**
 * GET /api/drivers
 * Danh sách tài xế (Admin/Dispatcher)
 */
export const listDrivers = async (req, res) => {
  try {
    const roleId = await getDriverRoleId();
    if (!roleId)
      return res.status(500).json({ error: "Chưa có role 'driver' trong DB" });

    const [rows] = await db.query(
      "SELECT id, name, email, phone, address, created_at FROM users WHERE role_id=? ORDER BY id DESC",
      [roleId]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * GET /api/drivers/:id
 * Chi tiết 1 tài xế
 */
export const getDriver = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT id, name, email, phone, address, created_at FROM users WHERE id=?",
      [req.params.id]
    );
    if (!rows.length)
      return res.status(404).json({ error: "Không tìm thấy tài xế" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * POST /api/drivers
 * Thêm tài xế mới (Admin)
 * Body: { name, email, password, phone?, address? }
 */
import bcrypt from "bcryptjs";
export const createDriver = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ error: "Thiếu thông tin cần thiết" });

    // email unique?
    const [exist] = await db.query("SELECT id FROM users WHERE email=?", [
      email,
    ]);
    if (exist.length)
      return res.status(400).json({ error: "Email đã tồn tại" });

    const hash = await bcrypt.hash(password, 10);
    const [r] = await db.query(
      "SELECT id FROM roles WHERE code='driver' LIMIT 1"
    );
    const role_id = r.length ? r[0].id : null;
    if (!role_id)
      return res.status(500).json({ error: "Chưa có role 'driver' trong DB" });

    const [result] = await db.query(
      "INSERT INTO users (name,email,password,role_id,phone,address) VALUES (?,?,?,?,?,?)",
      [name, email, hash, role_id, phone || null, address || null]
    );

    res.json({ message: "✅ Đã tạo tài xế", driver_id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * PUT /api/drivers/:id
 * Cập nhật tài xế (Admin/Dispatcher – thường Admin)
 */
export const updateDriver = async (req, res) => {
  try {
    const { name, phone, address } = req.body;
    const [result] = await db.query(
      "UPDATE users SET name=COALESCE(?, name), phone=COALESCE(?, phone), address=COALESCE(?, address) WHERE id=?",
      [name || null, phone || null, address || null, req.params.id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ error: "Không tìm thấy tài xế" });

    res.json({ message: "✅ Cập nhật tài xế thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * DELETE /api/drivers/:id
 * Xóa tài xế (Admin)
 */
export const deleteDriver = async (req, res) => {
  try {
    const [result] = await db.query("DELETE FROM users WHERE id=?", [
      req.params.id,
    ]);
    if (result.affectedRows === 0)
      return res.status(404).json({ error: "Không tìm thấy tài xế" });

    res.json({ message: "🗑️ Đã xóa tài xế" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * GET /api/drivers/:id/shipments
 * Danh sách đơn hàng của tài xế (Admin/Dispatcher)
 */
export const listDriverShipments = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM shipments WHERE driver_id=? ORDER BY created_at DESC",
      [req.params.id]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
