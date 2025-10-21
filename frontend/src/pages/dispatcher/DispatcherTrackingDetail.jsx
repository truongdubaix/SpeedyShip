import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../services/api";
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

// 🧭 Icon tài xế
const iconDriver = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/1995/1995574.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

// 📦 Icon điểm giao hàng
const iconPackage = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/2991/2991112.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

// 🗺️ Tự động zoom để hiển thị đủ 2 điểm
function FitBounds({ points }) {
  const map = useMap();
  useEffect(() => {
    if (points.length > 1) {
      map.fitBounds(points, { padding: [60, 60] });
    }
  }, [points]);
  return null;
}

// 🔁 Dịch trạng thái sang tiếng Việt
const translateStatus = (status) => {
  const map = {
    pending: "Chờ xử lý",
    assigned: "Đã phân công",
    picking: "Đang lấy hàng",
    delivering: "Đang giao hàng",
    delivered: "Đã giao thành công",
    completed: "Hoàn tất",
    failed: "Giao thất bại",
    cancelled: "Đã hủy",
  };
  return map[status] || status;
};

export default function DispatcherTrackingDetail() {
  const { id } = useParams();
  const [shipment, setShipment] = useState(null);
  const [routePoints, setRoutePoints] = useState([]);

  // 📦 Lấy thông tin chi tiết đơn hàng
  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await API.get(`/dispatcher/shipments/${id}`);
        const data = res.data;
        setShipment(data);

        // ✅ Lấy tọa độ từ DB (nếu có)
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
        } else {
          // 🧭 Gán mẫu nếu thiếu
          setRoutePoints([
            [10.7769, 106.7009], // HCM
            [21.0285, 105.8542], // Hà Nội
          ]);
        }
      } catch (err) {
        console.error("❌ Lỗi khi tải chi tiết đơn:", err);
      }
    };
    fetchDetail();
  }, [id]);

  if (!shipment)
    return <p className="p-6 text-gray-500">Đang tải chi tiết đơn...</p>;

  const driverPos =
    shipment.driver_lat && shipment.driver_lng
      ? [shipment.driver_lat, shipment.driver_lng]
      : routePoints[0];
  const deliveryPos = routePoints[1];

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold text-blue-700">
        🚛 Theo dõi đơn hàng #{shipment.tracking_code}
      </h1>

      {/* 🧾 Thông tin đơn */}
      <div className="bg-white p-5 rounded-xl shadow space-y-2 text-gray-800">
        <p>
          <b>📦 Người gửi:</b> {shipment.sender_name}
        </p>
        <p>
          <b>🏠 Địa chỉ lấy hàng:</b> {shipment.pickup_address}
        </p>
        <p>
          <b>👤 Người nhận:</b> {shipment.receiver_name}
        </p>
        <p>
          <b>📍 Địa chỉ giao hàng:</b> {shipment.delivery_address}
        </p>
        <p>
          <b>🚗 Tài xế:</b> {shipment.driver_name || "Chưa phân công"}
        </p>
        <p>
          <b>⚙️ Trạng thái:</b>{" "}
          <span className="text-blue-700 font-semibold">
            {translateStatus(shipment.status)}
          </span>
        </p>
        <p>
          <b>⏰ Cập nhật lúc:</b>{" "}
          {new Date(shipment.updated_at).toLocaleString("vi-VN")}
        </p>
      </div>

      {/* 🗺️ Bản đồ */}
      <div className="bg-white p-5 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-3 text-gray-800">
          🗺️ Vị trí tài xế & tuyến đường
        </h2>
        <div className="h-[500px] w-full rounded-lg overflow-hidden">
          <MapContainer
            center={driverPos || [10.7769, 106.7009]}
            zoom={5}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            {driverPos && (
              <Marker position={driverPos} icon={iconDriver}>
                <Popup>🚛 Tài xế đang di chuyển</Popup>
              </Marker>
            )}
            {deliveryPos && (
              <Marker position={deliveryPos} icon={iconPackage}>
                <Popup>📦 Nơi giao hàng</Popup>
              </Marker>
            )}
            {routePoints.length > 0 && (
              <Polyline positions={routePoints} color="blue" weight={4} />
            )}
            <FitBounds points={routePoints} />
          </MapContainer>
        </div>
      </div>
    </div>
  );
}
