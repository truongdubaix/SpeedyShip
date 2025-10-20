import { useState } from "react";

export default function AdminCustomer() {
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: "Nguyễn Văn A",
      email: "a@gmail.com",
      phone: "0909123456",
      totalOrders: 15,
      status: "Hoạt động",
    },
    {
      id: 2,
      name: "Trần Thị B",
      email: "b@gmail.com",
      phone: "0909789123",
      totalOrders: 8,
      status: "Khóa",
    },
    {
      id: 3,
      name: "Phạm Văn C",
      email: "c@gmail.com",
      phone: "0909654321",
      totalOrders: 23,
      status: "Hoạt động",
    },
  ]);

  const handleToggle = (id) => {
    setCustomers((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, status: c.status === "Hoạt động" ? "Khóa" : "Hoạt động" }
          : c
      )
    );
  };

  const handleDelete = (id) => {
    setCustomers((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow">
      <h1 className="text-2xl font-bold text-gray-700 mb-6">
        👥 Quản lý khách hàng
      </h1>

      <table className="w-full text-sm text-left border-collapse">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="p-3 rounded-l-md">ID</th>
            <th className="p-3">Họ tên</th>
            <th className="p-3">Email</th>
            <th className="p-3">Số điện thoại</th>
            <th className="p-3">Số đơn hàng</th>
            <th className="p-3">Trạng thái</th>
            <th className="p-3 rounded-r-md text-center">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c) => (
            <tr
              key={c.id}
              className="border-b hover:bg-blue-50 transition text-gray-700"
            >
              <td className="p-3 font-semibold">{c.id}</td>
              <td className="p-3">{c.name}</td>
              <td className="p-3">{c.email}</td>
              <td className="p-3">{c.phone}</td>
              <td className="p-3">{c.totalOrders}</td>
              <td className="p-3">
                <span
                  className={`px-3 py-1 rounded-full text-white text-xs ${
                    c.status === "Hoạt động" ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {c.status}
                </span>
              </td>
              <td className="p-3 flex gap-2 justify-center">
                <button
                  onClick={() => handleToggle(c.id)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                >
                  {c.status === "Hoạt động" ? "Khóa" : "Mở"}
                </button>
                <button
                  onClick={() => handleDelete(c.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
