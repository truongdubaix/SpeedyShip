import { useState, useEffect } from "react";
import API from "../../services/api";

export default function DriverDashboard() {
  const [stats, setStats] = useState(null);
  const driverId = 1; // tạm thời test với tài xế ID = 1

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await API.get(`/drivers/dashboard/${driverId}`);
        setStats(res.data);
      } catch (err) {
        console.error("❌ Lỗi khi tải thông tin dashboard:", err);
      }
    };
    fetchStats();
  }, []);

  if (!stats) return <p className="p-6 text-gray-500">Đang tải dữ liệu...</p>;

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold text-blue-700">
        🚛 Bảng điều khiển Tài Xế
      </h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-blue-600 text-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Đơn hoàn tất</h2>
          <p className="text-2xl font-bold">{stats.completed}</p>
        </div>
        <div className="bg-green-600 text-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Đang giao</h2>
          <p className="text-2xl font-bold">{stats.delivering}</p>
        </div>
        <div className="bg-orange-500 text-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Đang lấy hàng</h2>
          <p className="text-2xl font-bold">{stats.picking}</p>
        </div>
        <div className="bg-purple-600 text-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Được phân công</h2>
          <p className="text-2xl font-bold">{stats.assigned}</p>
        </div>
      </div>
    </div>
  );
}
