import { useState } from "react";

export default function AdminDriver() {
  const [drivers, setDrivers] = useState([
    {
      id: 1,
      name: "Nguyễn Tài",
      license: "79A-123.45",
      vehicle: "Xe tải 1.5T",
      status: "Hoạt động",
    },
    {
      id: 2,
      name: "Phạm Long",
      license: "51B-789.99",
      vehicle: "Xe bán tải",
      status: "Nghỉ phép",
    },
  ]);

  const handleStatus = (id) =>
    setDrivers((prev) =>
      prev.map((d) =>
        d.id === id
          ? {
              ...d,
              status: d.status === "Hoạt động" ? "Nghỉ phép" : "Hoạt động",
            }
          : d
      )
    );

  return (
    <div className="bg-white p-8 rounded-xl shadow">
      <h1 className="text-2xl font-bold text-gray-700 mb-6">
        🚚 Quản lý tài xế
      </h1>

      <table className="w-full text-sm text-left">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="p-3 rounded-l-md">Tên tài xế</th>
            <th className="p-3">Biển số</th>
            <th className="p-3">Phương tiện</th>
            <th className="p-3">Trạng thái</th>
            <th className="p-3 rounded-r-md">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {drivers.map((d) => (
            <tr key={d.id} className="border-b hover:bg-blue-50">
              <td className="p-3 font-semibold text-gray-700">{d.name}</td>
              <td className="p-3">{d.license}</td>
              <td className="p-3">{d.vehicle}</td>
              <td className="p-3">
                <span
                  className={`px-3 py-1 rounded-full text-white text-xs ${
                    d.status === "Hoạt động" ? "bg-green-500" : "bg-yellow-500"
                  }`}
                >
                  {d.status}
                </span>
              </td>
              <td className="p-3">
                <button
                  onClick={() => handleStatus(d.id)}
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                >
                  Chuyển
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
