import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const [role, setRole] = useState(null);
  const [name, setName] = useState("");

  useEffect(() => {
    setRole(localStorage.getItem("role"));
    setName(localStorage.getItem("username") || "Người dùng");
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const getRoleLabel = (r) => {
    switch (r) {
      case "admin":
        return "Quản trị viên";
      case "dispatcher":
        return "Điều phối viên";
      case "driver":
        return "Tài xế";
      case "customer":
        return "Khách hàng";
      default:
        return "";
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="bg-white text-blue-600 w-10 h-10 flex items-center justify-center rounded-full font-bold text-xl shadow-inner">
            🚀
          </div>
          <span className="text-white font-extrabold text-xl tracking-wide">
            SpeedyShip
          </span>
        </div>

        {/* Menu chính */}
        <div className="hidden md:flex space-x-6 text-white text-sm font-medium">
          <Link to="/" className="hover:text-yellow-300 transition">
            Trang chủ
          </Link>
          <Link to="/services" className="hover:text-yellow-300 transition">
            Dịch vụ
          </Link>
          <Link to="/contact" className="hover:text-yellow-300 transition">
            Liên hệ
          </Link>
          <Link to="/tracking" className="hover:text-yellow-300 transition">
            Tra cứu đơn
          </Link>
        </div>

        {/* Góc phải: đăng nhập / chào người dùng */}
        <div className="flex items-center space-x-4">
          {role ? (
            <>
              <div className="hidden sm:flex flex-col items-end text-sm text-white">
                <span className="font-semibold text-yellow-300">
                  Xin chào, {name}
                </span>
                <span className="text-gray-200 text-xs">
                  ({getRoleLabel(role)})
                </span>
              </div>

              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 px-3 py-1.5 rounded-md text-white text-sm font-semibold shadow-sm transition"
              >
                Đăng xuất
              </button>
            </>
          ) : (
            <div className="flex items-center space-x-3">
              <Link
                to="/login"
                className="bg-white text-blue-700 font-semibold px-3 py-1.5 rounded-md shadow-sm hover:bg-blue-100 transition"
              >
                Đăng nhập
              </Link>
              <Link
                to="/register"
                className="border border-white text-white px-3 py-1.5 rounded-md hover:bg-white hover:text-blue-700 transition"
              >
                Đăng ký
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
