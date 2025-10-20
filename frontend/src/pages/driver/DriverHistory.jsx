import { useState } from "react";

export default function DriverHistory() {
  const [orders] = useState([
    { id: "SP0901", receiver: "Nguyễn Lan", date: "2025-10-10", cod: 120000 },
    { id: "SP0902", receiver: "Phạm Minh", date: "2025-10-12", cod: 95000 },
    { id: "SP0903", receiver: "Trần Huy", date: "2025-10-15", cod: 80000 },
  ]);

  return (
    <div className="bg-white p-8 rounded-xl shadow">
      <h1 className="text-2xl font-bold text-gray-700 mb-6">
        🕓 Lịch sử giao hàng
      </h1>

      <table className="w-full text-sm text-left">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="p-3 rounded-l-md">Mã đơn</th>
            <th className="p-3">Người nhận</th>
            <th className="p-3">Ngày giao</th>
            <th className="p-3 rounded-r-md">COD</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id} className="border-b hover:bg-blue-50">
              <td className="p-3 font-semibold text-gray-700">{o.id}</td>
              <td className="p-3">{o.receiver}</td>
              <td className="p-3">{o.date}</td>
              <td className="p-3 text-gray-700">₫{o.cod.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
