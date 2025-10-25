// src/pages/driver/DriverShipmentDetail.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import API from "../../services/api";

// 🚚 Icon xe tải
const truckIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/3202/3202926.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

export default function DriverShipmentDetail() {
  const { id, shipmentId } = useParams(); // ✅ lấy cả driverId và shipmentId
  const [shipment, setShipment] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchShipment = async () => {
    try {
      const res = await API.get(`/shipments/${shipmentId}`);
      setShipment(res.data);
    } catch (err) {
      console.error("❌ Lỗi khi tải chi tiết đơn hàng:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShipment();
  }, [shipmentId]);

  if (loading)
    return <p className="text-center text-gray-600">⏳ Đang tải...</p>;
  if (!shipment)
    return (
      <p className="text-center text-red-600 font-semibold">
        ❌ Không tìm thấy thông tin đơn hàng.
      </p>
    );

  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      <div>
        <Link
          to={`/driver/${id}/assignments`}
          className="text-blue-600 hover:underline"
        >
          ← Quay lại danh sách
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-blue-700">
        📦 Chi tiết đơn hàng #{shipment.tracking_code}
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            🧾 Thông tin giao hàng
          </h2>
          <ul className="space-y-2 text-gray-700">
            <li>
              <strong>Người gửi:</strong> {shipment.sender_name} (
              {shipment.sender_phone})
            </li>
            <li>
              <strong>Người nhận:</strong> {shipment.receiver_name} (
              {shipment.receiver_phone})
            </li>
            <li>
              <strong>Địa chỉ lấy hàng:</strong> {shipment.pickup_address}
            </li>
            <li>
              <strong>Địa chỉ giao hàng:</strong> {shipment.delivery_address}
            </li>
            <li>
              <strong>Trọng lượng:</strong> {shipment.weight_kg} kg
            </li>
            <li>
              <strong>COD:</strong> {shipment.cod_amount?.toLocaleString()} đ
            </li>
            <li>
              <strong>Trạng thái:</strong>{" "}
              <span
                className={`font-semibold ${
                  shipment.status === "completed"
                    ? "text-green-600"
                    : shipment.status === "delivering"
                    ? "text-blue-600"
                    : shipment.status === "picking"
                    ? "text-orange-500"
                    : "text-gray-600"
                }`}
              >
                {shipment.status}
              </span>
            </li>
          </ul>
        </div>

        <div className="bg-white p-5 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            🗺️ Vị trí hiện tại
          </h2>
          <div className="h-[350px] rounded-lg overflow-hidden">
            <MapContainer
              center={[
                shipment.latitude || 16.054407,
                shipment.longitude || 108.202167,
              ]}
              zoom={14}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker
                position={[
                  shipment.latitude || 16.054407,
                  shipment.longitude || 108.202167,
                ]}
                icon={truckIcon}
              >
                <Popup>
                  <strong>📍 Đơn #{shipment.tracking_code}</strong>
                  <br />
                  {shipment.delivery_address}
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
