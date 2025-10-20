import pool from "../config/db.js";

export const listShipments = async (_req, res) => {
  const [rows] = await pool.query(
    `SELECT s.*, u.name AS customer_name
     FROM shipments s LEFT JOIN users u ON u.id=s.customer_id
     ORDER BY s.created_at DESC`
  );
  res.json(rows);
};

export const createShipment = async (req, res) => {
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
  } = req.body;

  await pool.query(
    `INSERT INTO shipments
     (tracking_code, customer_id, sender_name, sender_phone, receiver_name, receiver_phone,
      pickup_address, delivery_address, weight_kg, cod_amount)
     VALUES (?,?,?,?,?,?,?,?,?,?)`,
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
      cod_amount || 0,
    ]
  );
  res.json({ message: "Shipment created" });
};

export const updateShipmentStatus = async (req, res) => {
  const { status, current_location } = req.body;
  await pool.query(
    "UPDATE shipments SET status=?, current_location=? WHERE id=?",
    [status, current_location || null, req.params.id]
  );
  res.json({ message: "Status updated" });
};

export const timeline = async (req, res) => {
  const [rows] = await pool.query(
    "SELECT id,status,location,note,created_at FROM shipment_status_logs WHERE shipment_id=? ORDER BY created_at DESC",
    [req.params.id]
  );
  res.json(rows);
};

export const createStatusLog = async (req, res) => {
  const { status, location, note } = req.body;
  await pool.query(
    "INSERT INTO shipment_status_logs(shipment_id,status,location,note) VALUES(?,?,?,?)",
    [req.params.id, status, location || null, note || null]
  );
  res.json({ message: "Log added" });
};
