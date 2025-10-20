import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // cập nhật state khi người dùng nhập form
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // xử lý khi bấm nút "Đăng ký"
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", form);
      setSuccess("Đăng ký thành công! Vui lòng đăng nhập.");
      setError("");
      setTimeout(() => navigate("/login"), 1500); // chuyển về trang đăng nhập
    } catch (err) {
      setError("Email đã tồn tại hoặc dữ liệu không hợp lệ");
      setSuccess("");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-blue-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 shadow rounded-lg w-full max-w-md"
      >
        <h1 className="text-2xl font-bold text-center mb-4 text-blue-600">
          Đăng ký SpeedyShip
        </h1>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        {success && <p className="text-green-600 text-sm mb-3">{success}</p>}

        <input
          type="text"
          name="name"
          placeholder="Họ tên"
          onChange={handleChange}
          className="w-full border p-2 rounded mb-3"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full border p-2 rounded mb-3"
        />
        <input
          type="password"
          name="password"
          placeholder="Mật khẩu"
          onChange={handleChange}
          className="w-full border p-2 rounded mb-3"
        />
        <input
          type="text"
          name="phone"
          placeholder="Số điện thoại"
          onChange={handleChange}
          className="w-full border p-2 rounded mb-4"
        />

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded"
        >
          Đăng ký
        </button>

        <p className="text-center text-sm mt-4">
          Đã có tài khoản?{" "}
          <span
            className="text-blue-600 hover:underline cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Đăng nhập ngay
          </span>
        </p>
      </form>
    </div>
  );
}
