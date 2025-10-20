import { Outlet, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { LogOut, Home, ListChecks, Map, User } from "lucide-react";

export default function DispatcherLayout() {
  const navigate = useNavigate();
  const [active, setActive] = useState("dashboard");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-gradient-to-b from-indigo-700 to-blue-600 text-white p-5 flex flex-col justify-between shadow-xl">
        <div>
          <div className="flex items-center mb-8 gap-2">
            <div className="bg-white text-indigo-700 w-10 h-10 flex items-center justify-center rounded-full text-xl font-bold shadow-inner">
              🗺️
            </div>
            <h1 className="text-lg font-extrabold tracking-wide">
              Điều phối viên
            </h1>
          </div>

          <nav className="space-y-2">
            <Link
              to="/dispatcher"
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
              to="/dispatcher/assignments"
              onClick={() => setActive("assignments")}
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition ${
                active === "assignments"
                  ? "bg-blue-500 shadow"
                  : "hover:bg-blue-500/40"
              }`}
            >
              <ListChecks size={18} /> <span>Phân công</span>
            </Link>

            <Link
              to="/dispatcher/tracking"
              onClick={() => setActive("tracking")}
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition ${
                active === "tracking"
                  ? "bg-blue-500 shadow"
                  : "hover:bg-blue-500/40"
              }`}
            >
              <Map size={18} /> <span>Theo dõi đơn</span>
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
