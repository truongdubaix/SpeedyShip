import db from "../config/db.js";

//  Tổng quan hệ thống
export const getAdminStats = async (req, res) => {
  try {
    // Tổng số liệu
    const [[shipments]] = await db.query(
      "SELECT COUNT(*) AS total FROM shipments"
    );
    const [[drivers]] = await db.query("SELECT COUNT(*) AS total FROM drivers");
    const [[customers]] = await db.query(
      "SELECT COUNT(*) AS total FROM users WHERE role = 'customer'"
    );
    const [[revenue]] = await db.query(
      "SELECT SUM(amount) AS total FROM payments WHERE status = 'completed'"
    );

    // Thống kê đơn hàng theo trạng thái
    const [statusStats] = await db.query(`
      SELECT status, COUNT(*) AS count
      FROM shipments
      GROUP BY status
    `);

    // Biểu đồ doanh thu theo tháng (12 tháng gần nhất)
    const [monthlyRevenue] = await db.query(`
  SELECT 
    DATE_FORMAT(MIN(created_at), '%b') AS month, 
    SUM(amount) AS total
  FROM payments
  WHERE status = 'completed'
  GROUP BY YEAR(created_at), MONTH(created_at)
  ORDER BY YEAR(created_at), MONTH(created_at)
`);

    // Top 5 tài xế hoạt động nhiều nhất
    const [topDrivers] = await db.query(`
      SELECT name, COUNT(a.id) AS deliveries
      FROM drivers d
      JOIN assignments a ON d.id = a.driver_id
      GROUP BY d.id
      ORDER BY deliveries DESC
      LIMIT 5
    `);

    res.json({
      totalShipments: shipments.total,
      totalDrivers: drivers.total,
      totalCustomers: customers.total,
      totalRevenue: revenue.total || 0,
      shipmentStats: statusStats,
      monthlyRevenue,
      topDrivers,
    });
  } catch (err) {
    console.error("❌ Lỗi truy vấn admin dashboard:", err);
    res.status(500).json({ error: "Lỗi server khi lấy thống kê" });
  }
};
