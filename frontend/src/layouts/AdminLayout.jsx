import { Outlet, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { LogOut, Home, Truck, Users, CreditCard, Package } from "lucide-react"; // icon đẹp

export default function AdminLayout() {
  const navigate = useNavigate();
  const [active, setActive] = useState("dashboard");

  const handleLogout = () => {
    localStorage.clear(); // xoá token, role, username
    navigate("/login"); // quay về trang đăng nhập
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-blue-700 to-blue-600 text-white p-5 flex flex-col justify-between shadow-xl">
        {/* Logo & Title */}
        <div>
          <div className="flex items-center mb-8 gap-2">
            <div className="bg-white text-blue-700 w-10 h-10 flex items-center justify-center rounded-full text-xl font-bold shadow-inner">
              🚀
            </div>
            <h1 className="text-lg font-extrabold tracking-wide">SpeedyShip</h1>
          </div>

          {/* Menu items */}
          <nav className="space-y-2">
            <Link
              to="/admin"
              onClick={() => setActive("dashboard")}
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition ${
                active === "dashboard"
                  ? "bg-blue-500 shadow"
                  : "hover:bg-blue-500/40"
              }`}
            >
              <Home size={18} /> <span>Dashboard</span>
            </Link>

            <Link
              to="/admin/shipments"
              onClick={() => setActive("shipments")}
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition ${
                active === "shipments"
                  ? "bg-blue-500 shadow"
                  : "hover:bg-blue-500/40"
              }`}
            >
              <Package size={18} /> <span>Đơn hàng</span>
            </Link>

            <Link
              to="/admin/drivers"
              onClick={() => setActive("drivers")}
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition ${
                active === "drivers"
                  ? "bg-blue-500 shadow"
                  : "hover:bg-blue-500/40"
              }`}
            >
              <Truck size={18} /> <span>Tài xế</span>
            </Link>

            <Link
              to="/admin/customers"
              onClick={() => setActive("customers")}
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition ${
                active === "customers"
                  ? "bg-blue-500 shadow"
                  : "hover:bg-blue-500/40"
              }`}
            >
              <Users size={18} /> <span>Khách hàng</span>
            </Link>

            <Link
              to="/admin/payments"
              onClick={() => setActive("payments")}
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition ${
                active === "payments"
                  ? "bg-blue-500 shadow"
                  : "hover:bg-blue-500/40"
              }`}
            >
              <CreditCard size={18} /> <span>Thanh toán</span>
            </Link>
          </nav>
        </div>

        {/* Logout button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-3 py-2 rounded-md text-white font-semibold transition mt-6 shadow-md"
        >
          <LogOut size={18} />
          <span>Đăng xuất</span>
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
