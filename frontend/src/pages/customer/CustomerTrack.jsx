import { useState } from "react";

export default function CustomerTrack() {
  const [code, setCode] = useState("");
  const [found, setFound] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (code.trim() === "") return alert("Vui lòng nhập mã vận đơn!");
    setFound(true);
  };

  const timeline = [
    { time: "2025-10-18 09:00", status: "Đã tạo đơn hàng" },
    { time: "2025-10-18 11:00", status: "Tài xế đã lấy hàng" },
    { time: "2025-10-19 09:00", status: "Đang giao hàng" },
    { time: "2025-10-19 11:30", status: "Đã giao thành công" },
  ];

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow">
      <h1 className="text-2xl font-bold text-gray-700 mb-6">
        🔍 Tra cứu vận đơn
      </h1>

      <form onSubmit={handleSearch} className="flex gap-3 mb-6">
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Nhập mã vận đơn (VD: SP123456)"
          className="flex-1 border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Tra cứu
        </button>
      </form>

      {found && (
        <div>
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            Kết quả tra cứu cho mã <span className="text-blue-600">{code}</span>
          </h2>
          <ol className="relative border-l-2 border-blue-200 ml-6">
            {timeline.map((t, i) => (
              <li key={i} className="mb-6 ml-6">
                <span className="absolute -left-[11px] w-4 h-4 bg-blue-600 rounded-full"></span>
                <p className="font-semibold text-blue-600">{t.status}</p>
                <p className="text-gray-500 text-sm">{t.time}</p>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
