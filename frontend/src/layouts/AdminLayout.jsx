import { NavLink, Outlet, useNavigate } from "react-router-dom";

export default function AdminLayout() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username") || "Admin";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* SIDEBAR */}
      <aside className="w-64 bg-blue-700 text-white flex flex-col">
        <div className="p-5 space-y-5 border-b border-blue-600">
          {/* 👋 Lời chào */}
          <div className="text-center">
            <h2 className="text-xl font-bold text-white">👋 Xin chào,</h2>
            <p className="text-2xl font-extrabold text-yellow-300 mt-1">
              {username}
            </p>
          </div>

          {/* 🔴 Nút đăng xuất */}
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-semibold transition shadow"
          >
            🚪 Đăng xuất
          </button>
        </div>

        {/* MENU */}
        <div className="p-5 flex-1 overflow-y-auto">
          <h1 className="text-lg font-semibold uppercase text-gray-100 mb-3 border-b border-blue-500 pb-2">
            ⚙️ Bảng điều khiển
          </h1>

          <nav className="flex flex-col space-y-2">
            <NavLink
              to="/admin"
              end
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg hover:bg-blue-600 transition ${
                  isActive ? "bg-blue-600 font-semibold shadow" : ""
                }`
              }
            >
              📊 Dashboard
            </NavLink>

            <NavLink
              to="/admin/shipments"
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg hover:bg-blue-600 transition ${
                  isActive ? "bg-blue-600 font-semibold shadow" : ""
                }`
              }
            >
              🚚 Quản lý đơn hàng
            </NavLink>

            <NavLink
              to="/admin/drivers"
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg hover:bg-blue-600 transition ${
                  isActive ? "bg-blue-600 font-semibold shadow" : ""
                }`
              }
            >
              🚗 Quản lý tài xế
            </NavLink>

            <NavLink
              to="/admin/customers"
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg hover:bg-blue-600 transition ${
                  isActive ? "bg-blue-600 font-semibold shadow" : ""
                }`
              }
            >
              👥 Quản lý khách hàng
            </NavLink>

            <NavLink
              to="/admin/payments"
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg hover:bg-blue-600 transition ${
                  isActive ? "bg-blue-600 font-semibold shadow" : ""
                }`
              }
            >
              💳 Quản lý thanh toán
            </NavLink>

            <NavLink
              to="/admin/users"
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg hover:bg-blue-600 transition ${
                  isActive ? "bg-blue-600 font-semibold shadow" : ""
                }`
              }
            >
              🧑‍💼 Quản lý người dùng
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
