// src/layouts/CustomerLayout.jsx
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { LogOut, Home, PlusCircle, Search, Clock, User } from "lucide-react";

export default function CustomerLayout() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username") || "Khách hàng";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* SIDEBAR */}
      <aside className="w-64 bg-gradient-to-b from-blue-600 to-sky-500 text-white flex flex-col shadow-lg">
        {/* Header */}
        <div className="p-5 space-y-5 border-b border-sky-400 text-center">
          <div className="flex justify-center">
            <div className="bg-white text-blue-600 w-12 h-12 flex items-center justify-center rounded-full text-2xl font-bold shadow-inner">
              👤
            </div>
          </div>
          <h2 className="text-lg font-bold text-white">Xin chào,</h2>
          <p className="text-2xl font-extrabold text-yellow-300">{username}</p>

          {/* Logout */}
          {/* 🔵 Nút quay lại trang chủ */}
          <button
            onClick={() => navigate("/")}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-semibold transition shadow mt-2"
          >
            🏠 Về trang chủ
          </button>
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-semibold transition shadow"
          >
            🚪 Đăng xuất
          </button>
        </div>

        {/* MENU */}
        <div className="p-5 flex-1 overflow-y-auto">
          <h1 className="text-lg font-semibold uppercase text-gray-100 mb-3 border-b border-sky-400 pb-2">
            ⚙️ Bảng điều khiển
          </h1>

          <nav className="flex flex-col space-y-2">
            <NavLink
              to="/customer"
              end
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                  isActive
                    ? "bg-sky-500 shadow font-semibold"
                    : "hover:bg-sky-400/40"
                }`
              }
            >
              <Home size={18} /> <span>Trang chính</span>
            </NavLink>

            <NavLink
              to="/customer/create"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                  isActive
                    ? "bg-sky-500 shadow font-semibold"
                    : "hover:bg-sky-400/40"
                }`
              }
            >
              <PlusCircle size={18} /> <span>Tạo đơn hàng</span>
            </NavLink>

            <NavLink
              to="/customer/track"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                  isActive
                    ? "bg-sky-500 shadow font-semibold"
                    : "hover:bg-sky-400/40"
                }`
              }
            >
              <Search size={18} /> <span>Tra cứu đơn</span>
            </NavLink>

            <NavLink
              to="/customer/history"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                  isActive
                    ? "bg-sky-500 shadow font-semibold"
                    : "hover:bg-sky-400/40"
                }`
              }
            >
              <Clock size={18} /> <span>Lịch sử đơn</span>
            </NavLink>

            <NavLink
              to="/customer/profile"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                  isActive
                    ? "bg-sky-500 shadow font-semibold"
                    : "hover:bg-sky-400/40"
                }`
              }
            >
              <User size={18} /> <span>Hồ sơ cá nhân</span>
            </NavLink>
          </nav>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
