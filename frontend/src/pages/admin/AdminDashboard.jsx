import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

export default function AdminDashboard() {
  // 🔹 Dữ liệu mẫu (mock)
  const shipmentData = [
    { month: "Jan", shipments: 240 },
    { month: "Feb", shipments: 320 },
    { month: "Mar", shipments: 500 },
    { month: "Apr", shipments: 420 },
    { month: "May", shipments: 610 },
    { month: "Jun", shipments: 720 },
    { month: "Jul", shipments: 830 },
    { month: "Aug", shipments: 900 },
    { month: "Sep", shipments: 960 },
    { month: "Oct", shipments: 1040 },
    { month: "Nov", shipments: 1170 },
    { month: "Dec", shipments: 1300 },
  ];

  const revenueData = [
    { name: "COD", value: 540 },
    { name: "VNPAY", value: 320 },
    { name: "MOMO", value: 210 },
  ];

  const driverData = [
    { name: "Hoạt động", drivers: 24 },
    { name: "Nghỉ phép", drivers: 6 },
    { name: "Đang giao", drivers: 15 },
  ];

  const topDrivers = [
    { name: "Nguyễn Văn A", deliveries: 320, rating: 4.9 },
    { name: "Trần Minh B", deliveries: 285, rating: 4.8 },
    { name: "Phạm Tài C", deliveries: 270, rating: 4.7 },
    { name: "Lê Hoàng D", deliveries: 260, rating: 4.9 },
    { name: "Võ Văn E", deliveries: 245, rating: 4.6 },
  ];

  const COLORS = ["#2563EB", "#60A5FA", "#93C5FD"];

  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-bold text-gray-700">
        📊 Bảng điều khiển quản trị
      </h1>

      {/* Tổng quan nhanh */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            label: "Đơn hàng",
            value: "1,245",
            note: "+15% so với tháng trước",
          },
          { label: "Tài xế", value: "45", note: "3 mới hôm nay" },
          { label: "Khách hàng", value: "2,130", note: "+5% tuần qua" },
          { label: "Doanh thu", value: "₫87.4M", note: "+12% tháng này" },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-blue-600 text-white p-6 rounded-xl shadow hover:bg-blue-700 transition"
          >
            <h2 className="text-sm uppercase opacity-80">{item.label}</h2>
            <p className="text-3xl font-bold mt-1">{item.value}</p>
            <p className="text-sm mt-2 text-blue-100">{item.note}</p>
          </div>
        ))}
      </div>

      {/* Biểu đồ doanh thu 12 tháng */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Biểu đồ tăng trưởng đơn hàng (12 tháng)
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={shipmentData}>
            <XAxis dataKey="month" stroke="#94A3B8" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="shipments"
              stroke="#2563EB"
              strokeWidth={3}
              dot={{ fill: "#2563EB" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Biểu đồ phụ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Cơ cấu phương thức thanh toán
          </h2>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={revenueData}
                cx="50%"
                cy="50%"
                outerRadius={90}
                dataKey="value"
                label
              >
                {revenueData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Trạng thái tài xế
          </h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={driverData}>
              <XAxis dataKey="name" stroke="#94A3B8" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="drivers"
                fill="#2563EB"
                barSize={40}
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bảng top tài xế */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          🏅 Top tài xế tháng
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="p-3 rounded-l-md">Tên tài xế</th>
                <th className="p-3">Số đơn hoàn thành</th>
                <th className="p-3 rounded-r-md">Đánh giá</th>
              </tr>
            </thead>
            <tbody>
              {topDrivers.map((driver, i) => (
                <tr
                  key={i}
                  className={`border-b hover:bg-blue-50 transition ${
                    i % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="p-3 font-semibold text-gray-700">
                    {driver.name}
                  </td>
                  <td className="p-3">{driver.deliveries}</td>
                  <td className="p-3 text-yellow-500 font-semibold">
                    ⭐ {driver.rating.toFixed(1)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
