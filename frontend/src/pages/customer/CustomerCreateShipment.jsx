// src/pages/customer/TaoDonHang.jsx
import { useState, useEffect } from "react";
import API from "../../services/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import DiaChiSelector from "../../components/DiaChiSelector.jsx";

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
    shipping_fee: 0,
  });

  const [pickupOption, setPickupOption] = useState("sender");
  const [showPaymentChoice, setShowPaymentChoice] = useState(false);
  const [creating, setCreating] = useState(false);
  const [estimatedFee, setEstimatedFee] = useState(0);

  const customerId =
    localStorage.getItem("customer_id") || localStorage.getItem("userId");

  // 👇 Khởi tạo hiệu ứng
  useEffect(() => {
    AOS.init({ duration: 400, easing: "ease-in-out", once: true });
  }, []);

  // 🧮 Tính phí vận chuyển ước tính
  useEffect(() => {
    if (!form.delivery_address) return;
    const randomDistance = Math.floor(Math.random() * 30) + 5;
    const baseFee = 10000;
    const distanceFee = randomDistance * 2000;
    const weightFee = (parseFloat(form.weight_kg) || 0) * 3000;
    const total = baseFee + distanceFee + weightFee;
    setEstimatedFee(total);
    setForm((prev) => ({ ...prev, shipping_fee: total }));
  }, [form.delivery_address, form.weight_kg, pickupOption]);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  // 🚀 Gửi form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!customerId) {
      toast.error("⚠️ Bạn chưa đăng nhập!");
      return;
    }
    setShowPaymentChoice(true);
  };

  // 🧾 Tạo đơn hàng và điều hướng thanh toán
  const createOrderWithMethod = async (method) => {
    setCreating(true);
    try {
      const payload = {
        ...form,
        customer_id: Number(customerId),
        payment_method: method,
        pickup_option: pickupOption,
        shipping_fee: estimatedFee,
      };

      const res = await API.post("/shipments", payload);
      const shipmentId =
        res.data.shipmentId || res.data.id || res.data.insertId;
      const tracking = res.data.tracking_code;

      toast.success(`✅ Tạo đơn hàng thành công! Mã: ${tracking || "N/A"}`);

      if (method === "MOMO" && shipmentId) {
        const totalAmount =
          (parseFloat(form.cod_amount) || 0) + (parseFloat(estimatedFee) || 0);
        navigate(
          `/customer/payment?shipment_id=${shipmentId}&amount=${totalAmount}`
        );
        return;
      }

      navigate("/customer/history");
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

      <form
        onSubmit={handleSubmit}
        className="grid md:grid-cols-2 gap-5 text-gray-700"
      >
        {/* NGƯỜI GỬI */}
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

        {/* NƠI LẤY HÀNG */}
        <div className="md:col-span-2 mt-2">
          <label className="block mb-2 font-medium text-gray-700">
            📦 Nơi tài xế lấy hàng
          </label>
          <div className="flex flex-col sm:flex-row gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="pickupOption"
                value="sender"
                checked={pickupOption === "sender"}
                onChange={() => setPickupOption("sender")}
              />
              <span>Lấy tại địa chỉ người gửi</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="pickupOption"
                value="warehouse"
                checked={pickupOption === "warehouse"}
                onChange={() => setPickupOption("warehouse")}
              />
              <span>Lấy tại kho SpeedyShip</span>
            </label>
          </div>
        </div>

        {/* ĐỊA CHỈ LẤY HÀNG */}
        {pickupOption === "sender" ? (
          <div className="md:col-span-2">
            <DiaChiSelector
              label="🏠 Địa chỉ lấy hàng"
              onChange={(value) =>
                setForm((prev) => ({ ...prev, pickup_address: value }))
              }
            />
          </div>
        ) : (
          <div className="md:col-span-2 bg-gray-50 border border-gray-200 rounded-lg p-3 mt-2">
            <p className="text-gray-700">
              📍 <b>Địa chỉ kho SpeedyShip:</b> 123 Nguyễn Văn Linh, Quận Hải
              Châu, Đà Nẵng
            </p>
          </div>
        )}

        {/* NGƯỜI NHẬN */}
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

        {/* ĐỊA CHỈ GIAO HÀNG */}
        <div className="md:col-span-2">
          <DiaChiSelector
            label="📍 Địa chỉ giao hàng"
            onChange={(value) =>
              setForm((prev) => ({ ...prev, delivery_address: value }))
            }
          />
        </div>

        {/* THÔNG TIN HÀNG HÓA */}
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

        {/* ƯỚC TÍNH PHÍ */}
        <div className="md:col-span-2 border-t pt-4 mt-2 text-center">
          <p className="text-gray-700 mb-1 font-medium">
            💸 Phí vận chuyển ước tính:
          </p>
          <p className="text-xl font-semibold text-blue-600">
            {estimatedFee.toLocaleString("vi-VN")} ₫
          </p>
        </div>

        {/* NÚT TẠO */}
        <div className="md:col-span-2 text-center mt-4">
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-600 to-blue-400 text-white px-10 py-3 rounded-lg font-semibold text-lg shadow-md hover:opacity-90 transition"
          >
            🚀 Tạo đơn hàng
          </button>
        </div>
      </form>

      {/* POPUP THANH TOÁN */}
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
