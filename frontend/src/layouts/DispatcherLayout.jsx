import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function DispatcherLayout() {
  const items = [
    { to: "/dispatcher", label: "Tổng quan", icon: "🏠" },
    { to: "/dispatcher/assignments", label: "Gán đơn", icon: "🗂️" },
    { to: "/dispatcher/tracking", label: "Theo dõi", icon: "📍" },
  ];
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar title="Dispatcher" items={items} />
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-700">Điều phối viên</h2>
          <button className="bg-red-500 text-white px-3 py-1 rounded">
            Đăng xuất
          </button>
        </header>
        <Outlet />
      </main>
    </div>
  );
}
