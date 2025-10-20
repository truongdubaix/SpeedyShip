import { useState } from "react";

export default function DispatcherTracking() {
  const [selected, setSelected] = useState(null);

  const shipments = [
    {
      id: "SP2101",
      driver: "Nguyễn Tài",
      status: "Đang giao",
      location: "Q5, TP.HCM",
    },
    {
      id: "SP2102",
      driver: "Phạm Long",
      status: "Đang lấy hàng",
      location: "Q1, TP.HCM",
    },
    {
      id: "SP2103",
      driver: "Trần Huy",
      status: "Hoàn tất",
      location: "Q9, TP.HCM",
    },
  ];

  return (
    <div className="bg-white p-8 rounded-xl shadow space-y-6">
      <h1 className="text-2xl font-bold text-gray-700">📍 Theo dõi đơn hàng</h1>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h2 className="font-semibold text-gray-700 mb-3">
            Danh sách đơn hàng
          </h2>
          <ul className="divide-y border rounded-lg">
            {shipments.map((s) => (
              <li
                key={s.id}
                className={`p-4 cursor-pointer hover:bg-blue-50 ${
                  selected?.id === s.id ? "bg-blue-100" : ""
                }`}
                onClick={() => setSelected(s)}
              >
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-700">{s.id}</span>
                  <span
                    className={`px-2 py-1 rounded text-white text-xs ${
                      s.status === "Hoàn tất"
                        ? "bg-green-500"
                        : s.status === "Đang giao"
                        ? "bg-blue-500"
                        : "bg-yellow-500"
                    }`}
                  >
                    {s.status}
                  </span>
                </div>
                <p className="text-gray-500 text-sm mt-1">Tài xế: {s.driver}</p>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-semibold text-gray-700 mb-3">Vị trí hiện tại</h2>
          {selected ? (
            <div className="border rounded-lg p-6 text-gray-700 bg-blue-50 shadow-inner">
              <p>
                <b>Mã đơn:</b> {selected.id}
              </p>
              <p>
                <b>Tài xế:</b> {selected.driver}
              </p>
              <p>
                <b>Trạng thái:</b> {selected.status}
              </p>
              <p>
                <b>Vị trí hiện tại:</b> {selected.location}
              </p>
              <div className="mt-4 border h-64 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Map_example_blank.svg/1200px-Map_example_blank.svg.png')] bg-cover bg-center rounded-lg shadow"></div>
            </div>
          ) : (
            <p className="text-gray-500">Chọn 1 đơn để xem chi tiết vị trí.</p>
          )}
        </div>
      </div>
    </div>
  );
}
