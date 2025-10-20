import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!form.email || !form.password) {
      setError("Vui lòng nhập đầy đủ Email và Mật khẩu");
      setLoading(false);
      return;
    }

    try {
      const res = await API.post("/auth/login", form);
      const { token, user } = res.data;
      const role = user?.role || "customer";
      const username = user?.name || "Người dùng";

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("username", username);

      // Điều hướng đúng vai trò
      switch (role) {
        case "admin":
          navigate("/admin");
          break;
        case "dispatcher":
          navigate("/dispatcher");
          break;
        case "driver":
          navigate("/driver");
          break;
        default:
          navigate("/customer");
      }
    } catch {
      setError("Sai tài khoản hoặc mật khẩu");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-400">
      <div className="bg-white/95 backdrop-blur-md p-10 rounded-2xl shadow-2xl w-full max-w-md border border-blue-100">
        {/* Logo và tiêu đề */}
        <div className="flex flex-col items-center mb-6">
          <div className="bg-blue-600 text-white w-16 h-16 flex items-center justify-center rounded-full shadow-md text-3xl">
            🚀
          </div>
          <h1 className="text-3xl font-extrabold text-blue-700 mt-3">
            SpeedyShip
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Hệ thống quản lý vận chuyển thông minh
          </p>
        </div>

        {/* Form đăng nhập */}
        <form onSubmit={handleSubmit}>
          {error && (
            <p className="text-red-500 text-sm text-center mb-3">{error}</p>
          )}

          <div className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Nhập email của bạn"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />

            <input
              type="password"
              name="password"
              placeholder="Nhập mật khẩu"
              value={form.password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 text-white font-semibold rounded-lg shadow-md transition transform hover:scale-[1.02] ${
                loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Đang đăng nhập..." : "Đăng nhập"}
            </button>
          </div>
        </form>

        {/* Đường link đăng ký */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Chưa có tài khoản?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-600 font-semibold hover:underline cursor-pointer"
          >
            Đăng ký ngay
          </span>
        </p>
      </div>
    </div>
  );
}
