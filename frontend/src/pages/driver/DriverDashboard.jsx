import { useEffect, useState } from "react";

export default function DriverDashboard() {
  const [stats, setStats] = useState({
    total: 48,
    completed: 42,
    ongoing: 5,
    canceled: 1,
  });

  useEffect(() => {
    // mock API
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-700">
        🚚 Bảng điều khiển tài xế
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        <div className="bg-blue-600 text-white p-6 rounded-lg shadow">
          <h2 className="text-sm uppercase opacity-80">Tổng đơn</h2>
          <p className="text-3xl font-bold mt-1">{stats.total}</p>
        </div>
        <div className="bg-green-500 text-white p-6 rounded-lg shadow">
          <h2 className="text-sm uppercase opacity-80">Hoàn thành</h2>
          <p className="text-3xl font-bold mt-1">{stats.completed}</p>
        </div>
        <div className="bg-blue-400 text-white p-6 rounded-lg shadow">
          <h2 className="text-sm uppercase opacity-80">Đang giao</h2>
          <p className="text-3xl font-bold mt-1">{stats.ongoing}</p>
        </div>
        <div className="bg-red-500 text-white p-6 rounded-lg shadow">
          <h2 className="text-sm uppercase opacity-80">Hủy</h2>
          <p className="text-3xl font-bold mt-1">{stats.canceled}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          📈 Hiệu suất tháng này
        </h2>
        <p className="text-gray-600">
          Bạn đã hoàn thành <b>42/48</b> đơn hàng. Hiệu suất đạt{" "}
          <b className="text-blue-600">87.5%</b>.
        </p>
        <div className="mt-4 h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="bg-blue-600 h-3 rounded-full"
            style={{ width: `${(stats.completed / stats.total) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
