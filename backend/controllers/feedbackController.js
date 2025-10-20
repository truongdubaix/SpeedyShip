import pool from "../config/db.js";

export const listFeedbacks = async (_req, res) => {
  const [rows] = await pool.query(
    `SELECT f.*, u.name AS user_name, s.tracking_code
     FROM feedbacks f
     LEFT JOIN users u ON u.id=f.user_id
     LEFT JOIN shipments s ON s.id=f.shipment_id
     ORDER BY f.id DESC`
  );
  res.json(rows);
};

export const createFeedback = async (req, res) => {
  const { shipment_id, rating, comment } = req.body;
  await pool.query(
    "INSERT INTO feedbacks(shipment_id,user_id,rating,comment) VALUES(?,?,?,?)",
    [shipment_id, req.user.id, rating, comment || null]
  );
  res.json({ message: "Feedback submitted" });
};
