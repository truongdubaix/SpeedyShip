import pool from "../config/db.js";

export const getConfigs = async (_req, res) => {
  const [rows] = await pool.query(
    "SELECT k,v,updated_at FROM system_configs ORDER BY id DESC"
  );
  res.json(rows);
};

export const setConfig = async (req, res) => {
  const { k, v } = req.body;
  await pool.query(
    "INSERT INTO system_configs(k,v) VALUES(?,?) ON DUPLICATE KEY UPDATE v=VALUES(v), updated_at=CURRENT_TIMESTAMP",
    [k, v]
  );
  res.json({ message: "Config saved" });
};
