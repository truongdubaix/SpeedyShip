import { useEffect, useState } from "react";
import API from "../../services/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function DispatcherDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await API.get("/dispatcher/dashboard");
        setStats(res.data);
      } catch (err) {
        console.error("❌ Lỗi tải dữ liệu:", err);
      }
    };
    fetchStats();
  }, []);

  if (!stats) return <p className="p-6 text-gray-500">Đang tải dữ liệu...</p>;

  const totalShipments = stats.shipments.reduce((a, b) => a + b.count, 0);
  const activeDrivers =
    stats.drivers.find((d) => d.status === "available")?.count || 0;
  const delivering =
    stats.shipments.find((s) => s.status === "delivering")?.count || 0;
  const completed =
    stats.shipments.find((s) => s.status === "completed")?.count || 0;

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold text-blue-700 mb-2">
        🚛 Bảng điều khiển Điều Phối Viên
      </h1>

      {/* Cards tổng quan */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card title="Đơn hàng" value={totalShipments} color="bg-blue-600" />
        <Card
          title="Tài xế hoạt động"
          value={activeDrivers}
          color="bg-green-600"
        />
        <Card title="Đang giao hàng" value={delivering} color="bg-orange-500" />
        <Card title="Đã hoàn tất" value={completed} color="bg-purple-600" />
      </div>

      {/* Vùng 2 cột: Biểu đồ + Top tài xế */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Biểu đồ doanh thu */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            💰 Doanh thu theo tháng
          </h2>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={stats.revenue}
                margin={{ top: 10, right: 20, left: 0, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12, fill: "#4B5563" }}
                  axisLine={false}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "#4B5563" }}
                  axisLine={false}
                  tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1E3A8A",
                    color: "white",
                    borderRadius: 6,
                  }}
                  cursor={{ fill: "rgba(59,130,246,0.1)" }}
                />
                <Legend
                  wrapperStyle={{
                    fontSize: 13,
                    color: "#555",
                    marginTop: 10,
                  }}
                />
                <Bar
                  dataKey="total"
                  fill="#3B82F6"
                  radius={[8, 8, 0, 0]}
                  barSize={35}
                  name="Doanh thu (VND)"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top tài xế */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            🏆 Top 5 tài xế giao nhiều đơn
          </h2>
          <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-3 text-left">Tên tài xế</th>
                <th className="p-3 text-center">Số đơn giao</th>
              </tr>
            </thead>
            <tbody>
              {stats.topDrivers.length > 0 ? (
                stats.topDrivers.map((d, i) => (
                  <tr
                    key={i}
                    className="border-b hover:bg-blue-50 transition-colors"
                  >
                    <td className="p-3">{d.name}</td>
                    <td className="p-3 text-center font-semibold text-blue-700">
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
                    Không có dữ liệu.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Card({ title, value, color }) {
  return (
    <div className={`${color} text-white p-4 rounded-lg shadow`}>
      <h2 className="text-sm font-medium">{title}</h2>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  );
}
