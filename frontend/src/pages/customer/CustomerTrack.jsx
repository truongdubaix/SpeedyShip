// src/pages/customer/CustomerTrack.jsx
import { useState, useEffect } from "react";
import API from "../../services/api";
import toast from "react-hot-toast";
import {
  FaPhoneAlt,
  FaMotorcycle,
  FaTruck,
  FaUser,
  FaMapMarkerAlt,
} from "react-icons/fa";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// ==========================
// 🧭 Icon tài xế và điểm giao
// ==========================
const iconDriver = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/1995/1995574.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});
const iconPackage = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/2991/2991112.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

// 🗣️ Dịch trạng thái sang tiếng Việt
const translateStatus = (status) => {
  const map = {
    pending: "Chờ xử lý",
    assigned: "Đã phân công",
    picking: "Đang lấy hàng",
    delivering: "Đang giao hàng",
    delivered: "Đã giao hàng",
    completed: "Hoàn tất",
    failed: "Thất bại",
    canceled: "Đã hủy",
  };
  return map[status] || "Không xác định";
};

// 🗺️ Auto zoom vừa đủ 2 điểm
function FitBounds({ points }) {
  const map = useMap();
  useEffect(() => {
    if (points.length > 1) map.fitBounds(points, { padding: [60, 60] });
  }, [points]);
  return null;
}

export default function CustomerTrack() {
  const [trackingCode, setTrackingCode] = useState("");
  const [shipment, setShipment] = useState(null);
  const [routePoints, setRoutePoints] = useState([]);

  // ==================
  // 🔍 Tra cứu đơn hàng
  // ==================
  const handleTrack = async (e) => {
    e.preventDefault();
    if (!trackingCode.trim())
      return toast.error("⚠️ Vui lòng nhập mã đơn hàng!");

    try {
      const customerId =
        localStorage.getItem("customer_id") || localStorage.getItem("userId");

      const res = await API.get(
        `/customers/track/${trackingCode}?customer_id=${customerId}`
      );
      const data = res.data;
      setShipment(data);

      // ✅ Tạo tuyến đường hiển thị
      if (
        data.pickup_lat &&
        data.pickup_lng &&
        data.delivery_lat &&
        data.delivery_lng
      ) {
        setRoutePoints([
          [data.pickup_lat, data.pickup_lng],
          [data.delivery_lat, data.delivery_lng],
        ]);
      } else if (data.driver_lat && data.driver_lng) {
        setRoutePoints([
          [data.driver_lat, data.driver_lng],
          [data.delivery_lat, data.delivery_lng],
        ]);
      } else {
        // 🧭 Tọa độ mẫu fallback
        setRoutePoints([
          [10.7769, 106.7009], // HCM
          [21.0285, 105.8542], // HN
        ]);
      }

      toast.success("✅ Đã tìm thấy đơn hàng!");
    } catch {
      setShipment(null);
      toast.error("❌ Bạn không có quyền xem đơn hàng này!");
    }
  };

  const getStatusIndex = (status) => {
    const order = [
      "pending",
      "assigned",
      "picking",
      "delivering",
      "delivered",
      "completed",
    ];
    return order.indexOf(status);
  };

  // ==================
  // 📍 Hiển thị giao diện
  // ==================
  return (
    <div className="pt-28 pb-16 bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-700">
          🔍 Theo dõi đơn hàng
        </h2>

        {/* Form tra cứu */}
        <form
          onSubmit={handleTrack}
          className="flex flex-col md:flex-row items-center gap-3 mb-8"
        >
          <input
            type="text"
            placeholder="Nhập mã vận đơn (VD: SP1001)"
            value={trackingCode}
            onChange={(e) => setTrackingCode(e.target.value)}
            className="w-full md:flex-1 border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition"
          >
            Tra cứu
          </button>
        </form>

        {/* Kết quả tra cứu */}
        {shipment ? (
          <div className="space-y-6">
            {/* 👨‍✈️ Thông tin tài xế */}
            <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-200">
              <div className="w-12 h-12 bg-blue-600 text-white flex items-center justify-center rounded-full text-lg font-bold">
                {shipment.driver_name
                  ? shipment.driver_name.charAt(0).toUpperCase()
                  : "T"}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Tài xế: {shipment.driver_name || "Chưa có tài xế"}
                </h3>
                <p className="text-gray-600 flex flex-wrap items-center gap-2">
                  <FaMotorcycle /> {shipment.vehicle_type || "Xe máy"} • Biển
                  số:{" "}
                  <span className="font-medium">
                    {shipment.plate_number || "Không rõ"}
                  </span>{" "}
                  • <FaPhoneAlt className="inline" />{" "}
                  {shipment.driver_phone || "N/A"}
                </p>
              </div>
            </div>

            {/* 🧾 Người gửi / Người nhận */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <h4 className="font-semibold text-green-700 mb-2 flex items-center gap-2">
                  <FaUser /> Người gửi
                </h4>
                <p>
                  <b>Họ tên:</b> {shipment.sender_name}
                </p>
                <p>
                  <b>SĐT:</b> {shipment.sender_phone}
                </p>
                <p className="flex items-start gap-1">
                  <FaMapMarkerAlt className="mt-1 text-green-600" />
                  {shipment.pickup_address}
                </p>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                <h4 className="font-semibold text-yellow-700 mb-2 flex items-center gap-2">
                  <FaUser /> Người nhận
                </h4>
                <p>
                  <b>Họ tên:</b> {shipment.receiver_name}
                </p>
                <p>
                  <b>SĐT:</b> {shipment.receiver_phone}
                </p>
                <p className="flex items-start gap-1">
                  <FaMapMarkerAlt className="mt-1 text-yellow-600" />
                  {shipment.delivery_address}
                </p>
              </div>
            </div>

            {/* 🗺️ Bản đồ từ CustomerShipmentDetail */}
            <div className="bg-white p-5 rounded-xl shadow-md border">
              <h2 className="text-xl font-semibold mb-3 text-gray-800">
                🗺️ Vị trí tài xế & tuyến đường
              </h2>
              <div className="h-[400px] w-full rounded-lg overflow-hidden">
                <MapContainer
                  center={
                    routePoints.length ? routePoints[0] : [10.7769, 106.7009]
                  }
                  zoom={6}
                  style={{ height: "100%", width: "100%" }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; OpenStreetMap contributors"
                  />
                  {routePoints[0] && (
                    <Marker position={routePoints[0]} icon={iconDriver}>
                      <Popup>🚛 Tài xế đang di chuyển</Popup>
                    </Marker>
                  )}
                  {routePoints[1] && (
                    <Marker position={routePoints[1]} icon={iconPackage}>
                      <Popup>📦 Nơi giao hàng</Popup>
                    </Marker>
                  )}
                  {routePoints.length > 1 && (
                    <>
                      <Polyline
                        positions={routePoints}
                        color="blue"
                        weight={4}
                      />
                      <FitBounds points={routePoints} />
                    </>
                  )}
                </MapContainer>
              </div>
            </div>

            {/* 📦 Thông tin đơn hàng */}
            <div className="border border-gray-200 rounded-xl bg-white shadow-sm p-6 space-y-2">
              <p>
                <b>Mã đơn hàng:</b>{" "}
                <span className="text-blue-700 font-semibold">
                  {shipment.tracking_code}
                </span>
              </p>
              <p>
                <b>Trạng thái hiện tại:</b>{" "}
                <span className="text-green-700 font-semibold">
                  {translateStatus(shipment.status)}
                </span>
              </p>
              <p>
                <b>Tiền thu hộ (COD):</b>{" "}
                {shipment.cod_amount?.toLocaleString("vi-VN")}₫
              </p>
              <p>
                <b>Cập nhật gần nhất:</b>{" "}
                {new Date(shipment.updated_at).toLocaleString("vi-VN")}
              </p>
            </div>

            {/* ⏳ Tiến trình giao hàng */}
            <div className="mt-6 border-t pt-4">
              <h4 className="text-lg font-semibold mb-2 text-gray-800">
                📅 Tiến trình đơn hàng
              </h4>
              <ul className="space-y-3">
                {shipment.timeline?.map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      className={`mt-1 h-3 w-3 rounded-full ${
                        i <= getStatusIndex(shipment.status)
                          ? "bg-green-500"
                          : "bg-gray-300"
                      }`}
                    ></span>
                    <div>
                      <p
                        className={`font-medium ${
                          i <= getStatusIndex(shipment.status)
                            ? "text-green-600"
                            : "text-gray-500"
                        }`}
                      >
                        {step.label}
                      </p>
                      <p className="text-sm text-gray-400">
                        {i <= getStatusIndex(shipment.status)
                          ? new Date(step.time).toLocaleString("vi-VN")
                          : `Dự kiến: ${new Date(step.time).toLocaleString(
                              "vi-VN"
                            )}`}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-400 mt-8 italic">
            Chưa có kết quả tra cứu nào...
          </p>
        )}
      </div>
    </div>
  );
}
