import { Outlet, Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function DriverLayout() {
  const { id: paramId } = useParams();
  const navigate = useNavigate();
  const [driverId, setDriverId] = useState(
    paramId || localStorage.getItem("userId")
  );

  useEffect(() => {
    const storedId = localStorage.getItem("userId");
    if (!paramId && storedId) {
      setDriverId(storedId);
      navigate(`/driver/${storedId}`);
    }
  }, [paramId, navigate]);

  if (!driverId)
    return (
      <div className="p-6 text-center text-red-600">
        ⚠️ Vui lòng đăng nhập lại.
      </div>
    );

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-blue-700 text-white flex flex-col">
        <div className="p-4 text-center text-xl font-bold border-b border-blue-500">
          🚛 Tài xế #{driverId}
        </div>
        <nav className="flex-1 p-4 space-y-3">
          <Link
            to={`/driver/${driverId}`}
            className="block hover:bg-blue-600 p-2 rounded"
          >
            📊 Dashboard
          </Link>
          <Link
            to={`/driver/${driverId}/assignments`}
            className="block hover:bg-blue-600 p-2 rounded"
          >
            🚚 Đơn hàng
          </Link>
          <Link
            to={`/driver/${driverId}/history`}
            className="block hover:bg-blue-600 p-2 rounded"
          >
            📜 Lịch sử
          </Link>
          <Link
            to={`/driver/${driverId}/profile`}
            className="block hover:bg-blue-600 p-2 rounded"
          >
            👤 Hồ sơ
          </Link>
        </nav>
        <button
          onClick={handleLogout}
          className="m-4 bg-red-500 hover:bg-red-600 p-2 rounded text-center"
        >
          🚪 Đăng xuất
        </button>
      </aside>

      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
