import { useState, useEffect } from "react";
import API from "../services/api";
import toast from "react-hot-toast";
import AOS from "aos";
import "aos/dist/aos.css";

export default function ApplyDriver() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    license_plate: "",
    vehicle_type: "",
    experience: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 900, once: true });
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.phone || !form.email || !form.license_plate) {
      return toast.error("⚠️ Vui lòng nhập đầy đủ thông tin bắt buộc!");
    }

    try {
      setLoading(true);
      const res = await API.post("/drivers/apply", form);
      toast.success("✅ " + res.data.message);

      setForm({
        name: "",
        phone: "",
        email: "",
        license_plate: "",
        vehicle_type: "",
        experience: "",
      });
    } catch (err) {
      toast.error("❌ Gửi thất bại, vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Banner tuyển dụng */}
      <section
        className="pt-24 bg-blue-700 text-white py-16 shadow-lg"
        data-aos="fade-up"
      >
        <div className="max-w-5xl mx-auto text-center px-6">
          <h1 className="text-4xl font-extrabold mb-4 drop-shadow-lg">
            🚚 TUYỂN DỤNG TÀI XẾ SPEEDYSHIP
          </h1>
          <p className="text-lg text-blue-100">
            Thu nhập ổn định – Thời gian linh hoạt – Môi trường chuyên nghiệp
          </p>
        </div>
      </section>

      {/* Lợi ích */}
      <section className="py-16 bg-gray-50">
        <div
          className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-6"
          data-aos="fade-up"
        >
          {[
            {
              icon: "🔥",
              title: "Thu nhập cao",
              desc: "Tài xế SpeedyShip có thu nhập từ 10–18 triệu/tháng tùy năng suất.",
            },
            {
              icon: "⏱️",
              title: "Thời gian linh hoạt",
              desc: "Chủ động chọn giờ làm — không bị gò bó như doanh nghiệp truyền thống.",
            },
            {
              icon: "🛠️",
              title: "Hỗ trợ toàn diện",
              desc: "Được hỗ trợ 24/7 từ bộ phận điều phối và chăm sóc tài xế.",
            },
          ].map((b, i) => (
            <div
              key={i}
              data-aos="zoom-in"
              className="bg-white p-6 rounded-xl shadow hover:shadow-2xl transition transform hover:-translate-y-2"
            >
              <div className="text-5xl mb-3">{b.icon}</div>
              <h3 className="text-xl font-semibold text-blue-600 mb-2">
                {b.title}
              </h3>
              <p className="text-gray-600">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Yêu cầu */}
      <section className="py-16" data-aos="fade-right">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
            ✅ YÊU CẦU CƠ BẢN
          </h2>

          <ul className="space-y-3 text-gray-700 text-lg">
            <li>• Có xe máy & giấy phép lái xe</li>
            <li>• Sử dụng smartphone thành thạo</li>
            <li>• Tinh thần trách nhiệm, đúng giờ</li>
            <li>• Giao tiếp tốt & thái độ lịch sự</li>
            <li>• Ưu tiên có kinh nghiệm giao hàng</li>
          </ul>
        </div>
      </section>

      {/* Form nộp hồ sơ */}
      <section className="py-20 bg-white shadow-inner">
        <div
          className="max-w-3xl mx-auto bg-gray-50 p-8 rounded-xl shadow-xl"
          data-aos="fade-up"
        >
          <h2 className="text-3xl font-bold text-blue-600 text-center mb-6">
            📝 NỘP ĐƠN ỨNG TUYỂN
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Các input vẫn giữ nguyên */}
            <input
              type="text"
              name="name"
              placeholder="Họ và tên *"
              value={form.name}
              onChange={handleChange}
              className="border p-3 rounded-lg w-full"
            />

            <input
              type="text"
              name="phone"
              placeholder="Số điện thoại *"
              value={form.phone}
              onChange={handleChange}
              className="border p-3 rounded-lg w-full"
            />

            <input
              type="email"
              name="email"
              placeholder="Email *"
              value={form.email}
              onChange={handleChange}
              className="border p-3 rounded-lg w-full"
            />

            <input
              type="text"
              name="license_plate"
              placeholder="Biển số xe *"
              value={form.license_plate}
              onChange={handleChange}
              className="border p-3 rounded-lg w-full"
            />

            <input
              type="text"
              name="vehicle_type"
              placeholder="Loại xe (VD: Xe máy, xe tải...)"
              value={form.vehicle_type}
              onChange={handleChange}
              className="border p-3 rounded-lg w-full md:col-span-2"
            />

            <textarea
              name="experience"
              placeholder="Kinh nghiệm (không bắt buộc)"
              value={form.experience}
              onChange={handleChange}
              className="border p-3 rounded-lg w-full md:col-span-2 h-28"
            />

            <button
              type="submit"
              disabled={loading}
              className={`p-3 rounded-lg text-white font-semibold transition md:col-span-2
              ${
                loading
                  ? "bg-gray-400"
                  : "bg-blue-600 hover:bg-blue-700 transform hover:-translate-y-1"
              }`}
            >
              {loading ? "Đang gửi..." : "📨 Gửi ứng tuyển"}
            </button>
          </form>
        </div>
      </section>

      {/* Quy trình tuyển dụng */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2
            className="text-3xl font-bold text-blue-700 mb-8"
            data-aos="fade-down"
          >
            🛠️ QUY TRÌNH TUYỂN DỤNG
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "1️⃣", text: "Gửi hồ sơ online" },
              { step: "2️⃣", text: "Nhân sự SpeedyShip gọi xác nhận" },
              { step: "3️⃣", text: "Đến văn phòng đào tạo & nhận việc" },
            ].map((s, i) => (
              <div
                key={i}
                data-aos="flip-left"
                className="bg-white p-6 rounded-xl shadow text-center hover:shadow-xl transition"
              >
                <div className="text-4xl mb-3">{s.step}</div>
                <p className="text-gray-700 text-lg">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
