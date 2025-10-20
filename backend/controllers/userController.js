import pool from "../config/db.js";

export const listUsers = async (req, res) => {
  const [rows] = await pool.query(
    `SELECT u.id,u.name,u.email,u.phone,u.status,u.created_at,
            GROUP_CONCAT(r.code) roles
     FROM users u
     LEFT JOIN user_roles ur ON ur.user_id=u.id
     LEFT JOIN roles r ON r.id=ur.role_id
     GROUP BY u.id
     ORDER BY u.created_at DESC`
  );
  res.json(rows);
};

export const getUser = async (req, res) => {
  const [rows] = await pool.query(
    "SELECT id,name,email,phone,status,created_at FROM users WHERE id=?",
    [req.params.id]
  );
  if (!rows.length) return res.status(404).json({ message: "User not found" });
  const [roles] = await pool.query(
    `SELECT r.code FROM roles r JOIN user_roles ur ON ur.role_id=r.id WHERE ur.user_id=?`,
    [req.params.id]
  );
  res.json({ ...rows[0], roles: roles.map((r) => r.code) });
};

export const updateUserStatus = async (req, res) => {
  const { status } = req.body; // 1 active, 0 banned
  await pool.query("UPDATE users SET status=? WHERE id=?", [
    status ? 1 : 0,
    req.params.id,
  ]);
  res.json({ message: "Status updated" });
};

export const assignRole = async (req, res) => {
  const { roleCode } = req.body; // 'admin'|'dispatcher'|'driver'|'customer'
  const [roleRow] = await pool.query("SELECT id FROM roles WHERE code=?", [
    roleCode,
  ]);
  if (!roleRow.length) return res.status(400).json({ message: "Invalid role" });
  await pool.query(
    "INSERT IGNORE INTO user_roles(user_id,role_id) VALUES(?,?)",
    [req.params.id, roleRow[0].id]
  );
  res.json({ message: "Role assigned" });
};
