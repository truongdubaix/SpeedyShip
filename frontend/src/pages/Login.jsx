import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
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

    // ⭐ Validate rỗng từng trường
    if (!form.email && !form.password) {
      setError("Vui lòng nhập đầy đủ Email và mật khẩu");
      return;
    }

    if (!form.email) {
      setError("Vui lòng nhập Email");
      return;
    }

    if (!form.password) {
      setError("Vui lòng nhập mật khẩu");
      return;
    }

    try {
      setLoading(true);
      localStorage.clear();

      const res = await API.post("/auth/login", form);
      const { token, user } = res.data;

      if (!user || !user.id) {
        setError("Không xác định được tài khoản người dùng.");
        return;
      }

      // Lưu thông tin user
      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role);
      localStorage.setItem("username", user.name);
      localStorage.setItem("userId", user.id.toString());

      if (user.role === "customer") {
        localStorage.setItem("customer_id", user.id.toString());
      }

      // Chuyển hướng theo role
      if (user.role === "admin") navigate("/admin");
      else if (user.role === "dispatcher") navigate("/dispatcher");
      else if (user.role === "driver") navigate(`/driver/${user.id}`);
      else navigate("/customer");
    } catch (err) {
      console.error("❌ Lỗi đăng nhập:", err);
      setError("Sai tài khoản hoặc mật khẩu");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-400">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/95 backdrop-blur-md p-10 rounded-2xl shadow-2xl w-full max-w-md border border-blue-100"
      >
        <div className="flex flex-col items-center mb-6">
          <div className="bg-blue-600 text-white w-16 h-16 flex items-center justify-center rounded-full shadow-md text-3xl">
            🚀
          </div>
          <h1 className="text-3xl font-extrabold text-blue-700 mt-3">
            SpeedyShip
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Đăng nhập vào hệ thống quản lý
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {error && (
            <p className="text-red-500 text-sm text-center mb-3">{error}</p>
          )}

          <div className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="password"
              name="password"
              placeholder="Mật khẩu"
              value={form.password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 text-white font-semibold rounded-lg ${
                loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Đang đăng nhập..." : "Đăng nhập"}
            </button>
          </div>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Chưa có tài khoản?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-600 font-semibold hover:underline cursor-pointer"
          >
            Đăng ký ngay
          </span>
        </p>
      </motion.div>
    </div>
  );
}
