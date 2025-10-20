import { useState } from "react";

export default function CustomerHistory() {
  const [status, setStatus] = useState("Tất cả");

  const orders = [
    { id: "SP1201", receiver: "Nguyễn Lan", status: "Đang giao", cod: 120000 },
    { id: "SP1202", receiver: "Phạm Minh", status: "Đã giao", cod: 95000 },
    { id: "SP1203", receiver: "Trần Huy", status: "Đang xử lý", cod: 80000 },
  ];

  const filtered =
    status === "Tất cả" ? orders : orders.filter((o) => o.status === status);

  return (
    <div className="bg-white p-8 rounded-xl shadow">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-700">
          🕓 Lịch sử đơn hàng
        </h1>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option>Tất cả</option>
          <option>Đã giao</option>
          <option>Đang giao</option>
          <option>Đang xử lý</option>
        </select>
      </div>

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
          {filtered.map((o) => (
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
  );
}
