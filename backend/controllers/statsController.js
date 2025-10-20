import { db } from "../config/db.js";

// =====================
// 🧮 Lấy thống kê tổng thể Dashboard
// =====================
export const getShipmentStats = async (req, res) => {
  try {
    // 1️⃣ Tổng số đơn, số đơn đã giao, doanh thu
    const [summary] = await db.execute(`
      SELECT 
        COUNT(*) AS total_orders,
        SUM(CASE WHEN status = 'Đã giao' THEN 1 ELSE 0 END) AS completed_orders,
        IFNULL(SUM(fee), 0) AS revenue
      FROM shipments
    `);

    // 2️⃣ Người dùng hoạt động (đếm user có đơn hàng)
    const [activeUsers] = await db.execute(`
      SELECT COUNT(DISTINCT user_id) AS active_users
      FROM shipments
      WHERE user_id IS NOT NULL
    `);

    // 3️⃣ Dữ liệu biểu đồ: số đơn theo tháng
    const [chart] = await db.execute(`
      SELECT 
        DATE_FORMAT(created_at, '%m') AS month,
        COUNT(*) AS orders
      FROM shipments
      GROUP BY month
      ORDER BY month
    `);

    res.json({
      total_orders: summary[0].total_orders || 0,
      completed_orders: summary[0].completed_orders || 0,
      revenue: summary[0].revenue || 0,
      active_users: activeUsers[0].active_users || 0,
      chartData: chart || [],
    });
  } catch (err) {
    console.error("❌ Lỗi khi lấy thống kê:", err);
    res.status(500).json({ error: "Lỗi máy chủ khi lấy dữ liệu thống kê" });
  }
};
