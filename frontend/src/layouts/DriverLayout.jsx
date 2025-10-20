import { Outlet, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { LogOut, Home, Package, Clock, User } from "lucide-react";

export default function DriverLayout() {
  const navigate = useNavigate();
  const [active, setActive] = useState("dashboard");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-blue-600 to-blue-500 text-white p-5 flex flex-col justify-between shadow-xl">
        <div>
          {/* Logo */}
          <div className="flex items-center mb-8 gap-2">
            <div className="bg-white text-blue-700 w-10 h-10 flex items-center justify-center rounded-full text-xl font-bold shadow-inner">
              🚚
            </div>
            <h1 className="text-lg font-extrabold tracking-wide">Tài xế</h1>
          </div>

          {/* Menu */}
          <nav className="space-y-2">
            <Link
              to="/driver"
              onClick={() => setActive("dashboard")}
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition ${
                active === "dashboard"
                  ? "bg-blue-400 shadow"
                  : "hover:bg-blue-500/40"
              }`}
            >
              <Home size={18} /> <span>Trang chính</span>
            </Link>

            <Link
              to="/driver/assignments"
              onClick={() => setActive("assignments")}
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition ${
                active === "assignments"
                  ? "bg-blue-400 shadow"
                  : "hover:bg-blue-500/40"
              }`}
            >
              <Package size={18} /> <span>Đơn được giao</span>
            </Link>

            <Link
              to="/driver/history"
              onClick={() => setActive("history")}
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition ${
                active === "history"
                  ? "bg-blue-400 shadow"
                  : "hover:bg-blue-500/40"
              }`}
            >
              <Clock size={18} /> <span>Lịch sử</span>
            </Link>

            <Link
              to="/driver/profile"
              onClick={() => setActive("profile")}
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition ${
                active === "profile"
                  ? "bg-blue-400 shadow"
                  : "hover:bg-blue-500/40"
              }`}
            >
              <User size={18} /> <span>Hồ sơ</span>
            </Link>
          </nav>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-3 py-2 rounded-md text-white font-semibold transition mt-6 shadow-md"
        >
          <LogOut size={18} />
          <span>Đăng xuất</span>
        </button>
      </aside>

      {/* Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
