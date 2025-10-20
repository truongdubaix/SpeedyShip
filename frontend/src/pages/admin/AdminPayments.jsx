import { useState } from "react";

export default function AdminPayments() {
  const [payments, setPayments] = useState([
    {
      id: 1,
      shipment: "SP1001",
      method: "MOMO",
      amount: 120000,
      status: "Đã thanh toán",
      date: "2025-10-19 09:30",
    },
    {
      id: 2,
      shipment: "SP1002",
      method: "COD",
      amount: 90000,
      status: "Chờ thanh toán",
      date: "2025-10-19 12:10",
    },
    {
      id: 3,
      shipment: "SP1003",
      method: "VNPAY",
      amount: 150000,
      status: "Hoàn tiền",
      date: "2025-10-19 14:00",
    },
  ]);

  const handleStatusChange = (id, newStatus) => {
    setPayments((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: newStatus } : p))
    );
  };

  const statusColors = {
    "Đã thanh toán": "bg-green-500",
    "Chờ thanh toán": "bg-yellow-500",
    "Hoàn tiền": "bg-red-500",
  };

  const statusOptions = ["Đã thanh toán", "Chờ thanh toán", "Hoàn tiền"];

  return (
    <div className="bg-white p-8 rounded-xl shadow">
      <h1 className="text-2xl font-bold text-gray-700 mb-6">
        💰 Quản lý thanh toán
      </h1>

      <table className="w-full text-sm text-left border-collapse">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="p-3 rounded-l-md">Mã đơn</th>
            <th className="p-3">Phương thức</th>
            <th className="p-3">Số tiền</th>
            <th className="p-3">Trạng thái</th>
            <th className="p-3 rounded-r-md">Ngày giao dịch</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((p) => (
            <tr
              key={p.id}
              className="border-b hover:bg-blue-50 transition text-gray-700"
            >
              <td className="p-3 font-semibold">{p.shipment}</td>
              <td className="p-3">{p.method}</td>
              <td className="p-3">₫{p.amount.toLocaleString()}</td>
              <td className="p-3">
                <select
                  value={p.status}
                  onChange={(e) => handleStatusChange(p.id, e.target.value)}
                  className={`px-3 py-1 text-xs rounded-full text-white ${
                    statusColors[p.status] || "bg-gray-500"
                  }`}
                >
                  {statusOptions.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </td>
              <td className="p-3 text-gray-500">{p.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
