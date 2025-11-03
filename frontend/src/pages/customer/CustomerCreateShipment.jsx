// src/pages/customer/TaoDonHang.jsx
import { useState, useEffect } from "react";
import API from "../../services/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

export default function TaoDonHang() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    sender_name: "",
    sender_phone: "",
    receiver_name: "",
    receiver_phone: "",
    pickup_address: "",
    delivery_address: "",
    weight_kg: "",
    cod_amount: "",
  });

  const [showPaymentChoice, setShowPaymentChoice] = useState(false);
  const [creating, setCreating] = useState(false);

  const customerId =
    localStorage.getItem("customer_id") || localStorage.getItem("userId");

  // 👇 Giảm hiệu ứng xuống mức nhẹ
  useEffect(() => {
    AOS.init({ duration: 400, easing: "ease-in-out", once: true });
  }, []);

  const handleChange = (e) =>
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!customerId) {
      toast.error("⚠️ Bạn chưa đăng nhập!");
      return;
    }
    setShowPaymentChoice(true);
  };

  const createOrderWithMethod = async (method) => {
    setCreating(true);
    try {
      // ✅ API backend thật là /api/shipments
      const payload = {
        ...form,
        customer_id: Number(customerId),
        payment_method: method,
      };

      const res = await API.post("/shipments", payload); // <-- đổi endpoint này
      const shipmentId =
        res.data.shipmentId || res.data.id || res.data.insertId;
      const tracking = res.data.tracking_code;

      toast.success(`✅ Tạo đơn hàng thành công! Mã: ${tracking || "N/A"}`);

      // 🔁 Điều hướng
      if (method === "MOMO" && shipmentId) {
        navigate(
          `/customer/payment?shipment_id=${shipmentId}&amount=${form.cod_amount}`
        );
      } else {
        navigate("/customer/history");
      }
    } catch (err) {
      console.error("❌ Lỗi tạo đơn hàng:", err);
      toast.error("Không thể tạo đơn hàng. Vui lòng thử lại!");
    } finally {
      setCreating(false);
      setShowPaymentChoice(false);
    }
  };

  return (
    <div
      className="p-8 max-w-3xl mx-auto bg-white rounded-2xl shadow-lg mt-6 relative"
      data-aos="fade-up"
    >
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
        🚚 Tạo đơn hàng mới
      </h2>
      <p className="text-center text-gray-500 mb-8">
        Điền đầy đủ thông tin bên dưới để khởi tạo đơn hàng nhanh chóng.
      </p>

      <form
        onSubmit={handleSubmit}
        className="grid md:grid-cols-2 gap-5 text-gray-700"
      >
        {/* Gửi */}
        <div>
          <label className="block mb-1 font-medium">👤 Tên người gửi</label>
          <input
            name="sender_name"
            value={form.sender_name}
            onChange={handleChange}
            placeholder="VD: Nguyễn Văn A"
            className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">📞 SĐT người gửi</label>
          <input
            name="sender_phone"
            value={form.sender_phone}
            onChange={handleChange}
            placeholder="VD: 0901234567"
            className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Nhận */}
        <div>
          <label className="block mb-1 font-medium">👤 Tên người nhận</label>
          <input
            name="receiver_name"
            value={form.receiver_name}
            onChange={handleChange}
            placeholder="VD: Trần Thị B"
            className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">📞 SĐT người nhận</label>
          <input
            name="receiver_phone"
            value={form.receiver_phone}
            onChange={handleChange}
            placeholder="VD: 0912345678"
            className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Địa chỉ */}
        <div className="md:col-span-2">
          <label className="block mb-1 font-medium">🏠 Địa chỉ lấy hàng</label>
          <input
            name="pickup_address"
            value={form.pickup_address}
            onChange={handleChange}
            placeholder="VD: 123 Nguyễn Văn Linh, Đà Nẵng"
            className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="md:col-span-2">
          <label className="block mb-1 font-medium">📍 Địa chỉ giao hàng</label>
          <input
            name="delivery_address"
            value={form.delivery_address}
            onChange={handleChange}
            placeholder="VD: 45 Lê Duẩn, Quảng Nam"
            className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Thông tin thêm */}
        <div>
          <label className="block mb-1 font-medium">⚖️ Khối lượng (kg)</label>
          <input
            type="number"
            name="weight_kg"
            step="0.1"
            value={form.weight_kg}
            onChange={handleChange}
            placeholder="VD: 2.5"
            className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">💰 Tiền thu hộ (VNĐ)</label>
          <input
            type="number"
            name="cod_amount"
            value={form.cod_amount}
            onChange={handleChange}
            placeholder="VD: 150000"
            className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Nút gửi */}
        <div className="md:col-span-2 text-center mt-4">
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-600 to-blue-400 text-white px-10 py-3 rounded-lg font-semibold text-lg shadow-md hover:opacity-90 transition"
          >
            🚀 Tạo đơn hàng
          </button>
        </div>
      </form>

      {/* 💳 Popup chọn phương thức thanh toán */}
      {showPaymentChoice && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl p-8 shadow-xl text-center space-y-6 w-[90%] md:w-[400px]">
            <h3 className="text-xl font-semibold text-gray-800">
              Chọn phương thức thanh toán
            </h3>

            {creating ? (
              <div className="flex flex-col items-center justify-center py-6 space-y-3">
                <div className="w-10 h-10 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-gray-600">Đang xử lý đơn hàng...</p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <button
                  onClick={() => createOrderWithMethod("MOMO")}
                  className="bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-lg font-medium"
                >
                  💜 Thanh toán bằng MoMo
                </button>
                <button
                  onClick={() => createOrderWithMethod("COD")}
                  className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium"
                >
                  💵 Thanh toán khi nhận hàng (COD)
                </button>
              </div>
            )}

            {!creating && (
              <button
                onClick={() => setShowPaymentChoice(false)}
                className="text-gray-500 hover:text-gray-700 mt-4"
              >
                ❌ Hủy
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
