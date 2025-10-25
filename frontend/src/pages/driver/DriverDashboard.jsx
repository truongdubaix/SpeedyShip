import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import { PackageCheck, Truck, ClipboardCheck, Clock } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import API from "../../services/api";
import DriverNotifications from "../../components/DriverNotifications";

export default function DriverDashboard() {
  const { id } = useParams();
  const [stats, setStats] = useState(null);
  const [driverLocation, setDriverLocation] = useState({
    latitude: 10.762622,
    longitude: 106.660172,
  });

  // ✅ Kết nối socket để nhận thông báo realtime
  useEffect(() => {
    const socket = io("http://localhost:5000"); // ⚠️ đổi port nếu cần
    if (id) {
      socket.emit("registerDriver", id); // Đăng ký tài xế online
      console.log("🟢 Driver connected with ID:", id);
    }

    // 🔔 Nhận thông báo real-time từ server
    socket.on("newNotification", (data) => {
      toast.success(`📦 ${data.message}`, {
        duration: 4000,
        style: { background: "#333", color: "#fff" },
      });
      console.log("📩 Thông báo mới:", data);
    });

    return () => {
      socket.disconnect();
      console.log("🔴 Driver disconnected");
    };
  }, [id]);

  // 🧾 Lấy thống kê dashboard
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await API.get(`/drivers/dashboard/${id}`);
        setStats(res.data);
      } catch (err) {
        console.error("❌ Lỗi khi tải dashboard:", err);
      }
    };
    fetchStats();
  }, [id]);

  // 🗺️ Lấy vị trí tài xế (giả lập / sau này có thể lấy từ backend)
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const res = await API.get(`/drivers/${id}`);
        setDriverLocation({
          latitude: res.data.latitude || 10.762622,
          longitude: res.data.longitude || 106.660172,
        });
      } catch (err) {
        console.error("⚠️ Không thể lấy vị trí tài xế:", err);
      }
    };
    fetchLocation();
  }, [id]);

  if (!stats) return <p>Đang tải dữ liệu...</p>;

  return (
    <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
      {/* 🔔 Toast hiển thị thông báo */}
      <Toaster position="top-right" />

      {/* Header + Nút chuông */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-blue-700">
            🚛 Dashboard Tài xế #{id}
          </h1>
          <p className="text-gray-500 mt-1">
            Cập nhật tiến độ và theo dõi trạng thái giao hàng theo thời gian
            thực.
          </p>
        </div>
        <DriverNotifications driverId={id} />
      </div>

      {/* Thống kê chính */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            title: "Đơn hoàn tất",
            value: stats.completed,
            color: "from-green-500 to-green-600",
            icon: <PackageCheck className="w-6 h-6 text-white" />,
          },
          {
            title: "Đang giao",
            value: stats.delivering,
            color: "from-blue-500 to-blue-600",
            icon: <Truck className="w-6 h-6 text-white" />,
          },
          {
            title: "Đang lấy hàng",
            value: stats.picking,
            color: "from-orange-400 to-orange-500",
            icon: <Clock className="w-6 h-6 text-white" />,
          },
          {
            title: "Được phân công",
            value: stats.assigned,
            color: "from-gray-500 to-gray-600",
            icon: <ClipboardCheck className="w-6 h-6 text-white" />,
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`p-4 rounded-xl shadow-lg text-white bg-gradient-to-r ${item.color} flex justify-between items-center`}
          >
            <div>
              <h2 className="text-sm font-semibold opacity-90">{item.title}</h2>
              <p className="text-3xl font-bold mt-1">{item.value}</p>
            </div>
            <div className="opacity-70">{item.icon}</div>
          </motion.div>
        ))}
      </div>

      {/* Tiến độ hoạt động */}
      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Tiến độ hoạt động
        </h2>
        <div className="relative w-full bg-gray-200 h-3 rounded-full overflow-hidden">
          <div
            className="absolute top-0 left-0 h-3 bg-blue-600 rounded-full transition-all"
            style={{
              width: `${
                (stats.completed /
                  (stats.completed + stats.delivering + stats.picking + 1)) *
                100
              }%`,
            }}
          ></div>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Tổng đơn hoàn tất: <b>{stats.completed}</b>
        </p>
      </div>

      {/* Bản đồ vị trí */}
      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Vị trí hiện tại của bạn
        </h2>
        <MapContainer
          center={[driverLocation.latitude, driverLocation.longitude]}
          zoom={13}
          className="h-64 w-full rounded-lg"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker
            position={[driverLocation.latitude, driverLocation.longitude]}
          >
            <Popup>Bạn đang ở đây 📍</Popup>
          </Marker>
        </MapContainer>
      </div>

      {/* Đơn hàng gần đây */}
      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Đơn hàng gần đây
        </h2>
        <table className="w-full text-sm border border-gray-200">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-2">Mã đơn</th>
              <th className="p-2">Người nhận</th>
              <th className="p-2">Trạng thái</th>
              <th className="p-2">Ngày</th>
            </tr>
          </thead>
          <tbody>
            {stats.recentShipments?.length > 0 ? (
              stats.recentShipments.map((s) => (
                <tr key={s.id} className="border-b hover:bg-blue-50">
                  <td className="p-2 font-semibold text-blue-700">
                    {s.tracking_code}
                  </td>
                  <td className="p-2">{s.receiver_name}</td>
                  <td className="p-2 capitalize">{s.status}</td>
                  <td className="p-2 text-gray-500">
                    {new Date(s.updated_at).toLocaleString("vi-VN")}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="p-3 text-center text-gray-500 italic"
                >
                  Chưa có đơn hàng nào gần đây.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
