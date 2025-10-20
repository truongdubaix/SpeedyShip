import { Link, Outlet, useLocation } from "react-router-dom";

export default function AdminLayout() {
  const { pathname } = useLocation();

  const menu = [
    { label: "📊 Dashboard", path: "/admin" },
    { label: "👥 Khách hàng", path: "/admin/customers" },
    { label: "🚚 Tài xế", path: "/admin/drivers" },
    { label: "📦 Đơn hàng", path: "/admin/shipments" },
    { label: "💰 Thanh toán", path: "/admin/payments" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-700 text-white flex flex-col">
        <div className="p-5 font-bold text-2xl border-b border-blue-500">
          SpeedyShip Admin
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {menu.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`block px-4 py-2 rounded-lg transition ${
                pathname === item.path
                  ? "bg-blue-500 text-white font-semibold"
                  : "hover:bg-blue-600"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-blue-500 text-sm text-blue-100">
          © 2025 SpeedyShip
        </div>
      </aside>

      {/* Nội dung chính */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
