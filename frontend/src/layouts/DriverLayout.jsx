import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function DriverLayout() {
  const items = [
    { to: "/driver", label: "Tổng quan", icon: "🏠" },
    { to: "/driver/assignments", label: "Đơn được giao", icon: "📦" },
    { to: "/driver/history", label: "Lịch sử", icon: "🕓" },
    { to: "/driver/profile", label: "Hồ sơ", icon: "👤" },
  ];

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar title="Driver Panel" items={items} />
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-700">Tài xế</h2>
          <button className="bg-red-500 text-white px-3 py-1 rounded">
            Đăng xuất
          </button>
        </header>
        <Outlet />
      </main>
    </div>
  );
}
