import { useState } from "react";

export default function AdminShipments() {
  const [shipments, setShipments] = useState([
    {
      id: "SP1001",
      customer: "Nguyễn Văn A",
      driver: "Phạm Tài",
      status: "Đang giao",
      cod: 120000,
      createdAt: "2025-10-18",
    },
    {
      id: "SP1002",
      customer: "Trần Thị B",
      driver: "Lê Minh",
      status: "Chờ lấy hàng",
      cod: 90000,
      createdAt: "2025-10-19",
    },
    {
      id: "SP1003",
      customer: "Phạm Văn C",
      driver: "Nguyễn Huy",
      status: "Hoàn tất",
      cod: 150000,
      createdAt: "2025-10-19",
    },
  ]);

  const statuses = ["Chờ lấy hàng", "Đang giao", "Hoàn tất", "Thất bại", "Hủy"];

  const handleChangeStatus = (id, newStatus) => {
    setShipments((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: newStatus } : s))
    );
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow">
      <h1 className="text-2xl font-bold text-gray-700 mb-6">
        📦 Quản lý đơn hàng
      </h1>

      <table className="w-full text-sm text-left border-collapse">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="p-3 rounded-l-md">Mã đơn</th>
            <th className="p-3">Khách hàng</th>
            <th className="p-3">Tài xế</th>
            <th className="p-3">Trạng thái</th>
            <th className="p-3">Tiền thu hộ (COD)</th>
            <th className="p-3 rounded-r-md">Ngày tạo</th>
          </tr>
        </thead>
        <tbody>
          {shipments.map((s) => (
            <tr
              key={s.id}
              className="border-b hover:bg-blue-50 transition text-gray-700"
            >
              <td className="p-3 font-semibold">{s.id}</td>
              <td className="p-3">{s.customer}</td>
              <td className="p-3">{s.driver}</td>
              <td className="p-3">
                <select
                  value={s.status}
                  onChange={(e) => handleChangeStatus(s.id, e.target.value)}
                  className={`border rounded px-2 py-1 text-xs focus:ring-2 focus:ring-blue-500 ${
                    s.status === "Hoàn tất"
                      ? "bg-green-100 text-green-700"
                      : s.status === "Đang giao"
                      ? "bg-blue-100 text-blue-700"
                      : s.status === "Chờ lấy hàng"
                      ? "bg-yellow-100 text-yellow-700"
                      : s.status === "Thất bại"
                      ? "bg-red-100 text-red-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {statuses.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </td>
              <td className="p-3">₫{s.cod.toLocaleString()}</td>
              <td className="p-3 text-gray-500">{s.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
