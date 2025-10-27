// src/layouts/DispatcherLayout.jsx
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

export default function DispatcherLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const username = localStorage.getItem("username") || "Dispatcher";
  const [hasNewMessage, setHasNewMessage] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    navigate("/login");
  };

  // 🟣 Kết nối socket
  useEffect(() => {
    socket.emit("joinDispatcher");

    socket.on("newMessage", (msg) => {
      if (msg.role === "customer") {
        console.log("📩 Khách hàng gửi tin mới:", msg);
        // Nếu dispatcher chưa ở trang chat → bật thông báo
        if (!location.pathname.includes("/dispatcher/chat")) {
          setHasNewMessage(true);
        }
      }
    });

    return () => socket.off("newMessage");
  }, [location.pathname]);

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
              to="/dispatcher"
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
              to="/dispatcher/assignments"
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg hover:bg-blue-600 transition ${
                  isActive ? "bg-blue-600 font-semibold shadow" : ""
                }`
              }
            >
              🚚 Phân công tài xế
            </NavLink>

            <NavLink
              to="/dispatcher/tracking"
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg hover:bg-blue-600 transition ${
                  isActive ? "bg-blue-600 font-semibold shadow" : ""
                }`
              }
            >
              🗺️ Theo dõi đơn hàng
            </NavLink>

            {/* 💬 Hỗ trợ khách hàng có thông báo */}
            <NavLink
              to="/dispatcher/chat"
              onClick={() => setHasNewMessage(false)} // 🔕 Xóa thông báo khi click vào
              className={({ isActive }) =>
                `relative px-3 py-2 rounded-lg hover:bg-blue-600 transition ${
                  isActive ? "bg-blue-600 font-semibold shadow" : ""
                }`
              }
            >
              💬 Hỗ trợ khách hàng
              {hasNewMessage && (
                <span className="absolute right-3 top-2 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
              )}
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
