import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import API from "../services/api";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // 🕒 Tự giảm thời gian đếm ngược mỗi giây
  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setInterval(() => setCountdown((c) => c - 1), 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  // 🟦 Gửi OTP
  const handleSendOtp = async () => {
    if (!form.email)
      return setMessage({ type: "error", text: "Vui lòng nhập email" });

    try {
      setLoading(true);
      await API.post("/auth/send-otp", { email: form.email });
      setMessage({
        type: "success",
        text: "✅ Mã OTP đã gửi đến email của bạn!",
      });
      setOtpSent(true);
      setCountdown(60); // 60 giây đếm ngược
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Không gửi được OTP, thử lại sau!",
      });
    } finally {
      setLoading(false);
    }
  };

  // 🟩 Xác thực OTP + Đăng ký
  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    if (!otpSent)
      return setMessage({ type: "error", text: "Vui lòng gửi OTP trước!" });
    if (!otp)
      return setMessage({ type: "error", text: "Vui lòng nhập mã OTP" });

    try {
      setLoading(true);

      // B1: kiểm tra OTP
      await API.post("/auth/verify-otp", { email: form.email, otp });

      // B2: đăng ký người dùng
      await API.post("/auth/register", form);

      setMessage({
        type: "success",
        text: "🎉 Đăng ký thành công! Đang chuyển hướng...",
      });
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Đăng ký thất bại!",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-400">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white/95 backdrop-blur-md p-10 rounded-2xl shadow-2xl w-full max-w-md border border-blue-100"
      >
        {/* Logo */}
        <div className="flex flex-col items-center mb-6">
          <motion.div
            initial={{ scale: 0.8, rotate: -15 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-blue-600 text-white w-16 h-16 flex items-center justify-center rounded-full shadow-md text-3xl"
          >
            🚀
          </motion.div>
          <h1 className="text-3xl font-extrabold text-blue-700 mt-3">
            SpeedyShip
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Xác thực email trước khi đăng ký
          </p>
        </div>

        <form onSubmit={handleRegister}>
          {message.text && (
            <p
              className={`text-center mb-3 text-sm ${
                message.type === "error" ? "text-red-500" : "text-green-600"
              }`}
            >
              {message.text}
            </p>
          )}

          <div className="space-y-4">
            {/* Email + Gửi OTP */}
            <div className="flex gap-2">
              <input
                type="email"
                name="email"
                placeholder="Địa chỉ Email"
                value={form.email}
                onChange={handleChange}
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={handleSendOtp}
                disabled={loading || countdown > 0}
                className={`px-4 py-2 rounded-lg text-white font-semibold transition ${
                  countdown > 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {countdown > 0 ? `Gửi lại (${countdown}s)` : "Gửi OTP"}
              </button>
            </div>

            {otpSent && (
              <motion.input
                type="text"
                placeholder="Nhập mã OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              />
            )}

            <input
              type="text"
              name="name"
              placeholder="Họ và tên"
              value={form.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />
            <input
              type="password"
              name="password"
              placeholder="Mật khẩu"
              value={form.password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />
            <input
              type="text"
              name="phone"
              placeholder="Số điện thoại (tuỳ chọn)"
              value={form.phone}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 text-white font-semibold rounded-lg shadow-md transition transform hover:scale-[1.02] ${
                loading
                  ? "bg-green-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {loading ? "Đang xử lý..." : "Xác nhận & Đăng ký"}
            </button>
          </div>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Đã có tài khoản?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-600 font-semibold hover:underline cursor-pointer"
          >
            Đăng nhập ngay
          </span>
        </p>
      </motion.div>
    </div>
  );
}
