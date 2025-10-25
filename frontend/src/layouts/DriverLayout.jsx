// src/layouts/DriverLayout.jsx
import { NavLink, Outlet, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function DriverLayout() {
  const { id: paramId } = useParams();
  const navigate = useNavigate();
  const [driverId, setDriverId] = useState(
    paramId || localStorage.getItem("userId")
  );
  const username = localStorage.getItem("username") || "Tài xế";

  useEffect(() => {
    const storedId = localStorage.getItem("userId");
    if (!paramId && storedId) {
      setDriverId(storedId);
      navigate(`/driver/${storedId}`);
    }
  }, [paramId, navigate]);

  if (!driverId)
    return (
      <div className="p-6 text-center text-red-600 font-semibold">
        ⚠️ Vui lòng đăng nhập lại.
      </div>
    );

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* SIDEBAR */}
      <aside className="w-64 bg-blue-700 text-white flex flex-col">
        {/* Thông tin tài xế */}
        <div className="p-5 space-y-5 border-b border-blue-600 text-center">
          <h2 className="text-xl font-bold text-white">👋 Xin chào,</h2>
          <p className="text-2xl font-extrabold text-yellow-300 mt-1">
            {username}
          </p>
          <p className="text-sm text-gray-200 italic">Mã tài xế: #{driverId}</p>

          {/* Nút đăng xuất */}
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
              to={`/driver/${driverId}`}
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
              to={`/driver/${driverId}/assignments`}
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg hover:bg-blue-600 transition ${
                  isActive ? "bg-blue-600 font-semibold shadow" : ""
                }`
              }
            >
              🚚 Đơn hàng được giao
            </NavLink>

            <NavLink
              to={`/driver/${driverId}/history`}
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg hover:bg-blue-600 transition ${
                  isActive ? "bg-blue-600 font-semibold shadow" : ""
                }`
              }
            >
              📜 Lịch sử giao hàng
            </NavLink>

            <NavLink
              to={`/driver/${driverId}/profile`}
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg hover:bg-blue-600 transition ${
                  isActive ? "bg-blue-600 font-semibold shadow" : ""
                }`
              }
            >
              👤 Hồ sơ tài xế
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
