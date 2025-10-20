import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function DispatcherDashboard() {
  const [stats, setStats] = useState({
    pending: 8,
    assigned: 12,
    delivering: 6,
    completed: 35,
  });

  const data = {
    labels: ["Chờ xử lý", "Đã phân công", "Đang giao", "Hoàn tất"],
    datasets: [
      {
        label: "Số lượng đơn hàng",
        data: [
          stats.pending,
          stats.assigned,
          stats.delivering,
          stats.completed,
        ],
        backgroundColor: ["#3B82F6", "#2563EB", "#1D4ED8", "#93C5FD"],
      },
    ],
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-700">
        🧭 Bảng điều khiển điều phối viên
      </h1>

      {/* Thống kê */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        <div className="bg-blue-600 text-white p-6 rounded-lg shadow">
          <h2 className="text-sm uppercase opacity-80">Chờ xử lý</h2>
          <p className="text-3xl font-bold mt-1">{stats.pending}</p>
        </div>
        <div className="bg-blue-500 text-white p-6 rounded-lg shadow">
          <h2 className="text-sm uppercase opacity-80">Đã phân công</h2>
          <p className="text-3xl font-bold mt-1">{stats.assigned}</p>
        </div>
        <div className="bg-blue-400 text-white p-6 rounded-lg shadow">
          <h2 className="text-sm uppercase opacity-80">Đang giao</h2>
          <p className="text-3xl font-bold mt-1">{stats.delivering}</p>
        </div>
        <div className="bg-green-500 text-white p-6 rounded-lg shadow">
          <h2 className="text-sm uppercase opacity-80">Hoàn tất</h2>
          <p className="text-3xl font-bold mt-1">{stats.completed}</p>
        </div>
      </div>

      {/* Biểu đồ */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          📊 Biểu đồ trạng thái đơn hàng
        </h2>
        <Bar data={data} />
      </div>
    </div>
  );
}
