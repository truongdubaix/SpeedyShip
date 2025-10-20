import pool from "../config/db.js";

export const listDrivers = async (_req, res) => {
  const [rows] = await pool.query(
    `SELECT d.id,d.user_id,u.name,u.email,u.phone,d.license_no,d.vehicle_type,d.active
     FROM drivers d JOIN users u ON u.id=d.user_id
     ORDER BY d.id DESC`
  );
  res.json(rows);
};

export const createDriver = async (req, res) => {
  const { user_id, license_no, vehicle_type } = req.body;
  await pool.query(
    "INSERT INTO drivers(user_id,license_no,vehicle_type,active) VALUES(?,?,?,1)",
    [user_id, license_no || null, vehicle_type || null]
  );
  res.json({ message: "Driver created" });
};

export const updateDriver = async (req, res) => {
  const { license_no, vehicle_type, active } = req.body;
  await pool.query(
    "UPDATE drivers SET license_no=?, vehicle_type=?, active=? WHERE id=?",
    [license_no || null, vehicle_type || null, active ? 1 : 0, req.params.id]
  );
  res.json({ message: "Driver updated" });
};

export const removeDriver = async (req, res) => {
  await pool.query("DELETE FROM drivers WHERE id=?", [req.params.id]);
  res.json({ message: "Driver removed" });
};
