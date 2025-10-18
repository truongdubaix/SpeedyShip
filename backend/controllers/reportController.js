import { db } from "../config/db.js";

/**
 * GET /api/reports/summary
 * Tổng quan số liệu: đơn, doanh thu, tỷ lệ thành công
 */
export const getSummaryReport = async (req, res) => {
  try {
    const [shipments] = await db.query(
      "SELECT COUNT(*) AS total FROM shipments"
    );
    const [delivered] = await db.query(
      "SELECT COUNT(*) AS delivered FROM shipments WHERE status='Đã giao'"
    );
    const [cancelled] = await db.query(
      "SELECT COUNT(*) AS cancelled FROM shipments WHERE status='Hủy'"
    );
    const [payments] = await db.query(
      "SELECT SUM(amount) AS total_revenue FROM payments WHERE status='Thành công'"
    );
    const [rating] = await db.query(
      "SELECT AVG(rating) AS avg_rating FROM feedback"
    );

    const total = shipments[0].total || 0;
    const deliveredCount = delivered[0].delivered || 0;
    const cancelledCount = cancelled[0].cancelled || 0;
    const successRate =
      total > 0 ? ((deliveredCount / total) * 100).toFixed(1) : 0;

    res.json({
      total_shipments: total,
      delivered: deliveredCount,
      cancelled: cancelledCount,
      success_rate: `${successRate}%`,
      total_revenue: payments[0].total_revenue || 0,
      avg_rating: rating[0].avg_rating
        ? Number(rating[0].avg_rating).toFixed(1)
        : null,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * GET /api/reports/monthly
 * Thống kê đơn hàng & doanh thu theo tháng
 */
export const getMonthlyReport = async (req, res) => {
  try {
    const [data] = await db.query(`
      SELECT 
        DATE_FORMAT(created_at, '%Y-%m') AS month,
        COUNT(*) AS total_orders,
        SUM(CASE WHEN status='Đã giao' THEN 1 ELSE 0 END) AS delivered_orders
      FROM shipments
      GROUP BY month
      ORDER BY month ASC
    `);

    const [revenue] = await db.query(`
      SELECT 
        DATE_FORMAT(created_at, '%Y-%m') AS month,
        SUM(amount) AS total_revenue
      FROM payments
      WHERE status='Thành công'
      GROUP BY month
      ORDER BY month ASC
    `);

    res.json({
      shipments_by_month: data,
      revenue_by_month: revenue,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * GET /api/reports/top-drivers
 * Thống kê top tài xế có nhiều đơn giao thành công nhất
 */
export const getTopDrivers = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        u.id, u.name, COUNT(s.id) AS total_delivered
      FROM shipments s
      JOIN users u ON s.driver_id = u.id
      WHERE s.status = 'Đã giao'
      GROUP BY u.id
      ORDER BY total_delivered DESC
      LIMIT 5
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
