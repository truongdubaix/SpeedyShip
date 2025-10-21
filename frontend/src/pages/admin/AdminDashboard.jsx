import { useEffect, useState } from "react";
import API from "../../services/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);

  const fetchStats = async () => {
    const res = await API.get("/admin/stats");
    setStats(res.data);
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (!stats) return <p className="p-6">Đang tải dữ liệu...</p>;

  const shipmentData = stats.shipmentStats.map((s) => ({
    name:
      s.status === "pending"
        ? "Chờ xử lý"
        : s.status === "delivering"
        ? "Đang giao"
        : s.status === "delivered"
        ? "Đã giao"
        : s.status === "failed"
        ? "Thất bại"
        : "Khác",
    value: s.count,
  }));

  return (
    <div className="p-6 space-y-10">
      <h1 className="text-3xl font-bold text-gray-700 mb-4">
        📊 Tổng quan hệ thống
      </h1>

      {/* Thống kê nhanh */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-blue-600 text-white p-6 rounded-xl shadow">
          <h2 className="text-sm opacity-75">Tổng đơn hàng</h2>
          <p className="text-3xl font-bold">{stats.totalShipments}</p>
        </div>
        <div className="bg-green-600 text-white p-6 rounded-xl shadow">
          <h2 className="text-sm opacity-75">Tổng tài xế</h2>
          <p className="text-3xl font-bold">{stats.totalDrivers}</p>
        </div>
        <div className="bg-purple-600 text-white p-6 rounded-xl shadow">
          <h2 className="text-sm opacity-75">Khách hàng</h2>
          <p className="text-3xl font-bold">{stats.totalCustomers}</p>
        </div>
        <div className="bg-yellow-500 text-white p-6 rounded-xl shadow">
          <h2 className="text-sm opacity-75">Doanh thu (₫)</h2>
          <p className="text-3xl font-bold">
            {stats.totalRevenue.toLocaleString("vi-VN")}
          </p>
        </div>
      </div>

      {/* Biểu đồ trạng thái đơn hàng */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-3 text-gray-700">
          Biểu đồ đơn hàng theo trạng thái
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={shipmentData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#2563EB" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Biểu đồ doanh thu theo tháng */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-3 text-gray-700">
          Biểu đồ doanh thu theo tháng
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={stats.monthlyRevenue}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="total"
              stroke="#10B981"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Top tài xế */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">
          🏅 Top 5 tài xế hoạt động
        </h2>
        <table className="w-full text-sm text-left border-collapse">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="p-3">Tên tài xế</th>
              <th className="p-3 text-center">Số chuyến giao</th>
            </tr>
          </thead>
          <tbody>
            {stats.topDrivers?.length > 0 ? (
              stats.topDrivers.map((d, i) => (
                <tr
                  key={i}
                  className={`border-b ${
                    i % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-blue-50`}
                >
                  <td className="p-3 font-semibold">{d.name}</td>
                  <td className="p-3 text-center text-blue-600 font-bold">
                    {d.deliveries}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="2"
                  className="p-3 text-center text-gray-500 italic"
                >
                  Không có dữ liệu tài xế
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
