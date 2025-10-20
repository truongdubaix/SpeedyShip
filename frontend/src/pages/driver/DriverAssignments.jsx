import { useState } from "react";

export default function DriverAssignments() {
  const [orders, setOrders] = useState([
    { id: "SP1001", address: "12 Nguyễn Trãi, Q1", status: "Chờ nhận" },
    { id: "SP1002", address: "45 Lý Thường Kiệt, Q3", status: "Đang giao" },
    { id: "SP1003", address: "88 Hoàng Sa, Q10", status: "Chờ nhận" },
  ]);

  const handleUpdate = (id, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o))
    );
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow">
      <h1 className="text-2xl font-bold text-gray-700 mb-6">
        📦 Đơn hàng được giao
      </h1>

      <table className="w-full text-sm text-left">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="p-3 rounded-l-md">Mã đơn</th>
            <th className="p-3">Địa chỉ giao</th>
            <th className="p-3">Trạng thái</th>
            <th className="p-3 rounded-r-md">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id} className="border-b hover:bg-blue-50">
              <td className="p-3 font-semibold text-gray-700">{o.id}</td>
              <td className="p-3">{o.address}</td>
              <td className="p-3">
                <span
                  className={`px-3 py-1 rounded-full text-white text-xs ${
                    o.status === "Đang giao"
                      ? "bg-blue-500"
                      : o.status === "Hoàn tất"
                      ? "bg-green-500"
                      : "bg-yellow-500"
                  }`}
                >
                  {o.status}
                </span>
              </td>
              <td className="p-3 space-x-2">
                {o.status === "Chờ nhận" && (
                  <button
                    onClick={() => handleUpdate(o.id, "Đang giao")}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                  >
                    Nhận đơn
                  </button>
                )}
                {o.status === "Đang giao" && (
                  <button
                    onClick={() => handleUpdate(o.id, "Hoàn tất")}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
                  >
                    Hoàn tất
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
