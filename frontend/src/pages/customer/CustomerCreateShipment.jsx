// src/pages/customer/CustomerCreateShipment.jsx
import { useState, useEffect } from "react";
import API from "../../services/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import DiaChiSelector from "../../components/DiaChiSelector.jsx";
import MapPicker from "../../components/MapPicker.jsx";

export default function TaoDonHang() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    sender_name: "",
    sender_phone: "",
    receiver_name: "",
    receiver_phone: "",
    pickup_address: "",
    pickup_lat: null,
    pickup_lng: null,
    delivery_address: "",
    delivery_lat: null,
    delivery_lng: null,
    item_name: "",
    weight_kg: "",
    cod_amount: "",
    shipping_fee: 0,
  });

  const [pickupMapPos, setPickupMapPos] = useState([16.047079, 108.20623]);
  const [deliveryMapPos, setDeliveryMapPos] = useState([16.047079, 108.20623]);

  const [pickupOption, setPickupOption] = useState("sender");
  const [creating, setCreating] = useState(false);
  const [estimatedFee, setEstimatedFee] = useState(0);
  const [distanceKm, setDistanceKm] = useState(0);

  const [serviceType, setServiceType] = useState("standard");
  const SERVICE_PRICE = {
    standard: 0,
    express: 20000,
    fast: 40000,
  };

  // MAP POPUP
  const [showPickupMap, setShowPickupMap] = useState(false);
  const [showDeliveryMap, setShowDeliveryMap] = useState(false);

  const customerId =
    localStorage.getItem("customer_id") || localStorage.getItem("userId");

  useEffect(() => {
    AOS.init({ duration: 400, easing: "ease-in-out", once: true });
  }, []);

  // fake distance
  useEffect(() => {
    if (!form.delivery_address) return;
    const km = Math.floor(Math.random() * 30) + 5;
    setDistanceKm(km);
  }, [form.delivery_address]);

  // Tính phí
  useEffect(() => {
    if (!form.delivery_address) return;
    const baseFee = 10000;
    const distanceFee = distanceKm * 2000;
    const weightFee = (parseFloat(form.weight_kg) || 0) * 3000;
    const serviceFee = SERVICE_PRICE[serviceType];

    const total = baseFee + distanceFee + weightFee + serviceFee;
    setEstimatedFee(total);

    setForm((prev) => ({
      ...prev,
      shipping_fee: total,
    }));
  }, [distanceKm, form.weight_kg, serviceType]);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  /** SUBMIT = TẠO ĐƠN LUÔN (COD) */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!customerId) {
      toast.error("⚠️ Bạn chưa đăng nhập!");
      return;
    }
    createOrder();
  };

  /** GỌI API */
  const createOrder = async () => {
    setCreating(true);
    try {
      const payload = {
        ...form,
        customer_id: Number(customerId),
        payment_method: "COD",
        pickup_option: pickupOption,
        shipping_fee: estimatedFee,
        service_type: serviceType,
      };

      const res = await API.post("/shipments", payload);

      toast.success("🎉 Tạo đơn thành công!");
      navigate("/customer/history");
    } catch (err) {
      toast.error("❌ Không thể tạo đơn hàng!");
    } finally {
      setCreating(false);
    }
  };

  // helper: nhận pos (có thể là [lat, lng] hoặc {lat, lng})
  const normalizePos = (pos) => {
    if (!pos) return { lat: null, lng: null };
    if (Array.isArray(pos)) {
      return { lat: pos[0], lng: pos[1] };
    }
    // LatLng object
    return { lat: pos.lat, lng: pos.lng };
  };

  return (
    <div
      data-aos="fade-up"
      className="p-8 max-w-3xl mx-auto bg-white rounded-2xl shadow-lg mt-6 relative"
    >
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
        🚚 Tạo đơn hàng mới
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid md:grid-cols-2 gap-5 text-gray-700"
      >
        {/* Người gửi */}
        <div>
          <label className="block mb-1 font-medium">👤 Tên người gửi</label>
          <input
            name="sender_name"
            value={form.sender_name}
            onChange={handleChange}
            placeholder="VD: Nguyễn Văn A"
            className="border p-3 rounded-lg w-full"
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
            className="border p-3 rounded-lg w-full"
            required
            maxLength={10}
            pattern="0[0-9]{9}"
          />
        </div>

        {/* Nơi lấy */}
        <div className="md:col-span-2 mt-2">
          <label className="block mb-2 font-medium text-gray-700">
            📦 Nơi tài xế lấy hàng
          </label>

          <div className="flex gap-4">
            <label className="flex gap-2 items-center">
              <input
                type="radio"
                checked={pickupOption === "sender"}
                onChange={() => setPickupOption("sender")}
              />
              Lấy tại địa chỉ người gửi
            </label>

            <label className="flex gap-2 items-center">
              <input
                type="radio"
                checked={pickupOption === "warehouse"}
                onChange={() => setPickupOption("warehouse")}
              />
              Lấy tại kho SpeedyShip
            </label>
          </div>
        </div>

        {/* Địa chỉ lấy */}
        {pickupOption === "sender" && (
          <div className="md:col-span-2">
            <DiaChiSelector
              label="🏠 Địa chỉ lấy hàng"
              required
              onChange={(data) => {
                setForm((prev) => ({
                  ...prev,
                  pickup_address: data.address,
                  pickup_lat: data.lat,
                  pickup_lng: data.lng,
                }));
                setPickupMapPos([data.lat, data.lng]); // array [lat, lng]
              }}
            />

            <button
              type="button"
              onClick={() => setShowPickupMap(true)}
              className="mt-2 px-3 py-2 rounded-lg border bg-gray-50 hover:bg-gray-100"
            >
              🗺️ Chọn vị trí trên bản đồ
            </button>
          </div>
        )}

        {/* Người nhận */}
        <div>
          <label className="block mb-1 font-medium">👤 Tên người nhận</label>
          <input
            name="receiver_name"
            value={form.receiver_name}
            onChange={handleChange}
            placeholder="VD: Trần Thị B"
            className="border p-3 rounded-lg w-full"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">📞 SĐT người nhận</label>
          <input
            name="receiver_phone"
            value={form.receiver_phone}
            onChange={handleChange}
            className="border p-3 rounded-lg w-full"
            required
            maxLength={10}
            pattern="0[0-9]{9}"
          />
        </div>

        {/* Địa chỉ giao */}
        <div className="md:col-span-2">
          <DiaChiSelector
            label="📍 Địa chỉ giao hàng"
            required
            onChange={(data) => {
              setForm((prev) => ({
                ...prev,
                delivery_address: data.address,
                delivery_lat: data.lat,
                delivery_lng: data.lng,
              }));
              setDeliveryMapPos([data.lat, data.lng]); // array [lat, lng]
            }}
          />

          <button
            type="button"
            onClick={() => setShowDeliveryMap(true)}
            className="mt-2 px-3 py-2 rounded-lg border bg-gray-50 hover:bg-gray-100"
          >
            🗺️ Chọn vị trí trên bản đồ
          </button>
        </div>

        {/* Tên đơn hàng */}
        <div className="md:col-span-2">
          <label className="block mb-1 font-medium">📦 Tên đơn hàng</label>
          <input
            name="item_name"
            value={form.item_name}
            onChange={handleChange}
            placeholder="VD: Laptop, quần áo shop X..."
            className="border p-3 rounded-lg w-full"
            required
          />
        </div>

        {/* Khối lượng */}
        <div>
          <label className="block mb-1 font-medium">⚖️ Khối lượng (kg)</label>
          <input
            type="number"
            name="weight_kg"
            min="0.1"
            max="99.9"
            step="0.1"
            value={form.weight_kg}
            onChange={handleChange}
            className="border p-3 rounded-lg w-full"
            placeholder="VD: 2.5"
            required
          />
        </div>

        {/* COD */}
        <div>
          <label className="block mb-1 font-medium">💰 Tiền thu hộ (VNĐ)</label>
          <input
            type="number"
            name="cod_amount"
            min="0"
            value={form.cod_amount}
            onChange={handleChange}
            className="border p-3 rounded-lg w-full"
            required
          />
        </div>

        {/* Dịch vụ */}
        <div className="md:col-span-2 mt-3">
          <label className="block mb-2 font-medium text-gray-700 text-lg">
            🚚 Dịch vụ vận chuyển
          </label>

          <div className="grid grid-cols-3 gap-3">
            {[
              { key: "standard", label: "Tiêu chuẩn", note: "2–3 ngày" },
              { key: "express", label: "Nhanh", note: "1–2 ngày" },
              { key: "fast", label: "Hỏa tốc", note: "Trong ngày" },
            ].map((opt) => (
              <button
                key={opt.key}
                type="button"
                onClick={() => setServiceType(opt.key)}
                className={`p-3 text-center rounded-lg border transition ${
                  serviceType === opt.key
                    ? "bg-blue-600 text-white border-blue-600 shadow"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
              >
                <span className="font-semibold">{opt.label}</span>
                <br />
                <span className="text-sm opacity-70">{opt.note}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Phí ước tính */}
        <div className="md:col-span-2 border-t pt-4 mt-2 text-center">
          <p className="text-gray-700 mb-1 font-medium">
            💸 Phí vận chuyển ước tính:
          </p>
          <p className="text-xl font-semibold text-blue-600">
            {estimatedFee.toLocaleString("vi-VN")} ₫
          </p>
        </div>

        {/* Submit */}
        <div className="md:col-span-2 text-center mt-4">
          <button
            type="submit"
            disabled={creating}
            className="bg-gradient-to-r from-blue-600 to-blue-400 text-white px-10 py-3 rounded-lg font-semibold text-lg shadow-md hover:opacity-90 transition"
          >
            🚀 {creating ? "Đang tạo..." : "Tạo đơn hàng"}
          </button>
        </div>
      </form>

      {/* MAP PICKUP */}
      {showPickupMap && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999]">
          <MapPicker
            defaultPos={[
              form.pickup_lat || 16.047079,
              form.pickup_lng || 108.20623,
            ]}
            onCancel={() => setShowPickupMap(false)}
            onConfirm={(pos) => {
              const { lat, lng } = pos;
              if (!lat || !lng) return;

              setPickupMapPos([lat, lng]);
              setForm((prev) => ({
                ...prev,
                pickup_lat: lat,
                pickup_lng: lng,
              }));
              setShowPickupMap(false);
            }}
          />
        </div>
      )}

      {/* MAP DELIVERY */}
      {showDeliveryMap && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999]">
          <MapPicker
            defaultPos={[
              form.delivery_lat || 16.047079,
              form.delivery_lng || 108.20623,
            ]}
            onCancel={() => setShowDeliveryMap(false)}
            onConfirm={(pos) => {
              const { lat, lng } = pos;
              if (!lat || !lng) return;

              setDeliveryMapPos([lat, lng]);
              setForm((prev) => ({
                ...prev,
                delivery_lat: lat,
                delivery_lng: lng,
              }));
              setShowDeliveryMap(false);
            }}
          />
        </div>
      )}
    </div>
  );
}
