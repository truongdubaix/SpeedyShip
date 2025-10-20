import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Xoá dữ liệu đăng nhập
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");

    // Chuyển về trang đăng nhập
    navigate("/login");
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-blue-50">
      <p className="text-blue-700 text-lg font-semibold">Đang đăng xuất...</p>
    </div>
  );
}
