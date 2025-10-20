import { useEffect, useState } from "react";

export default function CustomerDashboard() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // mock data
    setOrders([
      { id: "SP123", receiver: "Nguyễn Lan", status: "Đang giao", cod: 120000 },
      { id: "SP124", receiver: "Phạm Minh", status: "Đã giao", cod: 95000 },
      { id: "SP125", receiver: "Trần Huy", status: "Đang xử lý", cod: 80000 },
    ]);
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-700">
        📦 Bảng điều khiển khách hàng
      </h1>

      {/* Thống kê */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-blue-600 text-white p-6 rounded-lg shadow">
          <h2 className="text-sm uppercase opacity-80">Tổng đơn hàng</h2>
          <p className="text-3xl font-bold mt-1">38</p>
        </div>
        <div className="bg-blue-500 text-white p-6 rounded-lg shadow">
          <h2 className="text-sm uppercase opacity-80">Đang giao</h2>
          <p className="text-3xl font-bold mt-1">5</p>
        </div>
        <div className="bg-blue-400 text-white p-6 rounded-lg shadow">
          <h2 className="text-sm uppercase opacity-80">Đã giao</h2>
          <p className="text-3xl font-bold mt-1">33</p>
        </div>
      </div>

      {/* Đơn hàng gần đây */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Đơn hàng gần đây
        </h2>
        <table className="w-full text-sm text-left">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3 rounded-l-md">Mã đơn</th>
              <th className="p-3">Người nhận</th>
              <th className="p-3">Trạng thái</th>
              <th className="p-3 rounded-r-md">COD</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="border-b hover:bg-blue-50">
                <td className="p-3 font-semibold text-gray-700">{o.id}</td>
                <td className="p-3">{o.receiver}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-white text-xs ${
                      o.status === "Đã giao"
                        ? "bg-green-500"
                        : o.status === "Đang giao"
                        ? "bg-blue-500"
                        : "bg-yellow-500"
                    }`}
                  >
                    {o.status}
                  </span>
                </td>
                <td className="p-3 text-gray-700">₫{o.cod.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
