import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../services/api";

export default function DriverDashboard() {
  const { id } = useParams();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await API.get(`/drivers/dashboard/${id}`);
        setStats(res.data);
      } catch (err) {
        console.error("❌ Lỗi khi tải dashboard:", err);
      }
    };
    fetchStats();
  }, [id]);

  if (!stats) return <p>Đang tải dữ liệu...</p>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-blue-700">
        🚛 Dashboard Tài xế #{id}
      </h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-green-600 text-white p-4 rounded-lg shadow">
          <h2>Đơn hoàn tất</h2>
          <p className="text-2xl font-bold">{stats.completed}</p>
        </div>
        <div className="bg-blue-600 text-white p-4 rounded-lg shadow">
          <h2>Đang giao</h2>
          <p className="text-2xl font-bold">{stats.delivering}</p>
        </div>
        <div className="bg-orange-500 text-white p-4 rounded-lg shadow">
          <h2>Đang lấy hàng</h2>
          <p className="text-2xl font-bold">{stats.picking}</p>
        </div>
        <div className="bg-gray-600 text-white p-4 rounded-lg shadow">
          <h2>Được phân công</h2>
          <p className="text-2xl font-bold">{stats.assigned}</p>
        </div>
      </div>
    </div>
  );
}
