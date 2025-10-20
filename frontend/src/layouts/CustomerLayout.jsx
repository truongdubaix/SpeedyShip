import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function CustomerLayout() {
  const items = [
    { to: "/customer", label: "Trang chủ", icon: "🏠" },
    { to: "/customer/create", label: "Tạo đơn", icon: "➕" },
    { to: "/customer/track", label: "Theo dõi", icon: "🚚" },
    { to: "/customer/history", label: "Lịch sử", icon: "🕓" },
    { to: "/customer/profile", label: "Hồ sơ", icon: "👤" },
  ];
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar title="Customer" items={items} />
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-700">Khách hàng</h2>
          <button className="bg-red-500 text-white px-3 py-1 rounded">
            Đăng xuất
          </button>
        </header>
        <Outlet />
      </main>
    </div>
  );
}
