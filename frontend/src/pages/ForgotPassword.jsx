import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import API from "../services/api";
import Navbar from "../components/Navbar";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // countdown
  useEffect(() => {
    if (count <= 0) return;
    const t = setInterval(() => setCount((c) => c - 1), 1000);
    return () => clearInterval(t);
  }, [count]);

  const sendOtp = async () => {
    if (!email) return setMessage("Vui lòng nhập email");

    try {
      setLoading(true);
      await API.post("/auth/forgot-password", { email });
      setOtpSent(true);
      setCount(60);
      setMessage("OTP đã gửi tới email của bạn!");
    } catch (err) {
      setMessage(err.response?.data?.message || "Không gửi được OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 via-blue-200 to-blue-400">
      <Navbar />
      <div className="flex flex-1 items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/95 p-10 rounded-2xl shadow-2xl w-full max-w-md border border-blue-100"
        >
          <div className="flex flex-col items-center mb-6">
            <div className="bg-blue-600 text-white w-16 h-16 flex items-center justify-center rounded-full shadow-md text-3xl">
              🔑
            </div>
            <h1 className="text-2xl font-extrabold text-blue-700 mt-3">
              Khôi phục mật khẩu
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Nhập email để lấy mã OTP
            </p>
          </div>

          {message && (
            <p className="text-center text-sm mb-3 text-blue-600 font-medium">
              {message}
            </p>
          )}

          {/* Input email */}
          <div className="space-y-4">
            <input
              type="email"
              placeholder="Địa chỉ Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />

            <button
              onClick={sendOtp}
              disabled={loading || count > 0}
              className={`w-full py-3 text-white font-semibold rounded-lg shadow-md ${
                count > 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {count > 0 ? `Gửi lại (${count}s)` : "Gửi OTP"}
            </button>
          </div>

          <p className="text-center text-sm text-gray-600 mt-6">
            Quay lại{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-blue-600 font-semibold hover:underline cursor-pointer"
            >
              Đăng nhập
            </span>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
