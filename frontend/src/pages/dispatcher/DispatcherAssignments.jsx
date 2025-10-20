import { useState } from "react";

export default function DispatcherAssignments() {
  const [assignments, setAssignments] = useState([
    {
      id: "SP2001",
      address: "12 Nguyễn Trãi, Q1",
      driver: "",
      status: "Chưa phân công",
    },
    {
      id: "SP2002",
      address: "45 Lý Thường Kiệt, Q3",
      driver: "Nguyễn Tài",
      status: "Đã phân công",
    },
  ]);

  const drivers = ["Nguyễn Tài", "Phạm Long", "Trần Huy", "Võ Khang"];

  const handleAssign = (id, driverName) => {
    setAssignments((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, driver: driverName, status: "Đã phân công" } : a
      )
    );
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow">
      <h1 className="text-2xl font-bold text-gray-700 mb-6">
        📋 Phân công tài xế
      </h1>

      <table className="w-full text-sm text-left">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="p-3 rounded-l-md">Mã đơn</th>
            <th className="p-3">Địa chỉ giao</th>
            <th className="p-3">Tài xế</th>
            <th className="p-3 rounded-r-md">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((a) => (
            <tr key={a.id} className="border-b hover:bg-blue-50">
              <td className="p-3 font-semibold text-gray-700">{a.id}</td>
              <td className="p-3">{a.address}</td>
              <td className="p-3">
                {a.driver || <span className="text-gray-400">Chưa chọn</span>}
              </td>
              <td className="p-3">
                <select
                  defaultValue=""
                  onChange={(e) => handleAssign(a.id, e.target.value)}
                  className="border rounded px-3 py-1 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">-- Chọn tài xế --</option>
                  {drivers.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
