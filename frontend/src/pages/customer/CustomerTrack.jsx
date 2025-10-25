import { useState, useEffect } from "react";
import API from "../../services/api";
import toast from "react-hot-toast";
import AOS from "aos";
import "aos/dist/aos.css";

export default function CustomerTrack() {
  const [trackingCode, setTrackingCode] = useState("");
  const [shipment, setShipment] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 700, once: true });
  }, []);

  const handleTrack = async (e) => {
    e.preventDefault();
    if (!trackingCode.trim())
      return toast.error("⚠️ Vui lòng nhập mã đơn hàng!");

    try {
      const res = await API.get(`/customers/track/${trackingCode}`);
      setShipment(res.data);
      toast.success("✅ Đã tìm thấy đơn hàng!");
    } catch {
      setShipment(null);
      toast.error("❌ Không tìm thấy đơn hàng!");
    }
  };

  return (
    <div className="pt-28 pb-16 bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen">
      <div
        className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8"
        data-aos="fade-up"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-700">
          🔍 Theo dõi đơn hàng
        </h2>
        <p className="text-center text-gray-500 mb-8">
          Nhập mã đơn hàng để xem thông tin chi tiết giao – nhận & trạng thái
          hiện tại.
        </p>

        {/* Form tra cứu */}
        <form
          onSubmit={handleTrack}
          className="flex flex-col md:flex-row items-center gap-3 mb-6"
          data-aos="zoom-in"
        >
          <input
            type="text"
            placeholder="Nhập mã vận đơn (VD: SP1001)"
            value={trackingCode}
            onChange={(e) => setTrackingCode(e.target.value)}
            className="w-full md:flex-1 border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition"
          >
            Tra cứu
          </button>
        </form>

        {/* Hiển thị kết quả */}
        {shipment && (
          <div
            className="border border-gray-200 rounded-xl bg-gradient-to-r from-white to-blue-50 shadow p-6 space-y-3"
            data-aos="fade-up"
          >
            <h3 className="text-xl font-semibold text-green-700 mb-3">
              📦 Mã đơn:{" "}
              <span className="text-gray-800">{shipment.tracking_code}</span>
            </h3>
            <div className="grid md:grid-cols-2 gap-x-6 text-gray-700">
              <div>
                <p>
                  <b>👤 Người gửi:</b> {shipment.sender_name} -{" "}
                  {shipment.sender_phone}
                </p>
                <p>
                  <b>🏠 Địa chỉ lấy hàng:</b> {shipment.pickup_address}
                </p>
                <p>
                  <b>⚖️ Khối lượng:</b> {shipment.weight_kg} kg
                </p>
              </div>
              <div>
                <p>
                  <b>👥 Người nhận:</b> {shipment.receiver_name} -{" "}
                  {shipment.receiver_phone}
                </p>
                <p>
                  <b>📍 Địa chỉ giao hàng:</b> {shipment.delivery_address}
                </p>
                <p>
                  <b>💰 Tiền thu hộ:</b>{" "}
                  {shipment.cod_amount?.toLocaleString("vi-VN")} VNĐ
                </p>
              </div>
            </div>
            <hr className="my-3 border-gray-300" />
            <p>
              <b>🚚 Trạng thái:</b>{" "}
              <span className="text-blue-700 font-semibold">
                {shipment.status}
              </span>
            </p>
            <p>
              <b>📡 Vị trí hiện tại:</b>{" "}
              {shipment.current_location || "Chưa cập nhật"}
            </p>
            <p>
              <b>🕒 Ngày tạo:</b>{" "}
              {new Date(shipment.created_at).toLocaleString("vi-VN")}
            </p>
          </div>
        )}

        {!shipment && (
          <p
            className="text-center text-gray-400 mt-8 italic"
            data-aos="fade-up"
          >
            Chưa có kết quả tra cứu nào...
          </p>
        )}
      </div>
    </div>
  );
}
