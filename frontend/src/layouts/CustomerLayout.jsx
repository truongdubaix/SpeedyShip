import { Outlet, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { LogOut, Home, PlusCircle, Search, Clock, User } from "lucide-react";

export default function CustomerLayout() {
  const navigate = useNavigate();
  const [active, setActive] = useState("dashboard");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-gradient-to-b from-blue-500 to-sky-400 text-white p-5 flex flex-col justify-between shadow-xl">
        <div>
          <div className="flex items-center mb-8 gap-2">
            <div className="bg-white text-blue-600 w-10 h-10 flex items-center justify-center rounded-full text-xl font-bold shadow-inner">
              👤
            </div>
            <h1 className="text-lg font-extrabold tracking-wide">Khách hàng</h1>
          </div>

          <nav className="space-y-2">
            <Link
              to="/customer"
              onClick={() => setActive("dashboard")}
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition ${
                active === "dashboard"
                  ? "bg-sky-500 shadow"
                  : "hover:bg-sky-400/40"
              }`}
            >
              <Home size={18} /> <span>Trang chính</span>
            </Link>

            <Link
              to="/customer/create"
              onClick={() => setActive("create")}
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition ${
                active === "create"
                  ? "bg-sky-500 shadow"
                  : "hover:bg-sky-400/40"
              }`}
            >
              <PlusCircle size={18} /> <span>Tạo đơn hàng</span>
            </Link>

            <Link
              to="/customer/track"
              onClick={() => setActive("track")}
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition ${
                active === "track" ? "bg-sky-500 shadow" : "hover:bg-sky-400/40"
              }`}
            >
              <Search size={18} /> <span>Tra cứu đơn</span>
            </Link>

            <Link
              to="/customer/history"
              onClick={() => setActive("history")}
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition ${
                active === "history"
                  ? "bg-sky-500 shadow"
                  : "hover:bg-sky-400/40"
              }`}
            >
              <Clock size={18} /> <span>Lịch sử đơn</span>
            </Link>

            <Link
              to="/customer/profile"
              onClick={() => setActive("profile")}
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition ${
                active === "profile"
                  ? "bg-sky-500 shadow"
                  : "hover:bg-sky-400/40"
              }`}
            >
              <User size={18} /> <span>Hồ sơ cá nhân</span>
            </Link>
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-3 py-2 rounded-md text-white font-semibold transition mt-6 shadow-md"
        >
          <LogOut size={18} />
          <span>Đăng xuất</span>
        </button>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
