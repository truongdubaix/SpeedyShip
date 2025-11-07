// src/pages/driver/DriverProfile.jsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "../../services/api";
import { motion } from "framer-motion";

export default function DriverProfile() {
  const { id: paramId } = useParams();
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState(null); // ➕ thêm state thống kê
  const [driverId, setDriverId] = useState(
    paramId || localStorage.getItem("userId")
  );

  useEffect(() => {
    const id = paramId || localStorage.getItem("userId");
    setDriverId(id);
    if (!id) return;

    const fetchProfile = async () => {
      try {
        const res = await API.get(`/drivers/profile/${id}`);
        setProfile(res.data);
      } catch (err) {
        console.error("❌ Lỗi khi tải hồ sơ tài xế:", err);
      }
    };

    const fetchStats = async () => {
      try {
        const res = await API.get(`/drivers/dashboard/${id}`);
        setStats(res.data);
      } catch (err) {
        console.warn("❌ Không thể tải dashboard");
        setStats({ total: 0, completed: 0, rating: 0 });
      }
    };

    fetchProfile();
    fetchStats();
  }, [paramId]);

  if (!profile)
    return (
      <p className="p-6 text-gray-500 text-center">⏳ Đang tải hồ sơ...</p>
    );

  const statusColor = {
    available: "text-green-600 bg-green-100",
    delivering: "text-blue-600 bg-blue-100",
    inactive: "text-gray-600 bg-gray-100",
  };

  const avatarUrl = `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(
    profile.name
  )}&backgroundColor=blue&fontSize=50`;

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen flex justify-center">
      <motion.div
        className="bg-white p-8 rounded-2xl shadow-lg max-w-lg w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Hồ sơ tài xế */}
        <div className="flex flex-col items-center text-center space-y-4">
          <img
            src={avatarUrl}
            alt={profile.name}
            className="w-28 h-28 rounded-full border-4 border-blue-500 shadow"
          />
          <h1 className="text-3xl font-bold text-blue-700">{profile.name}</h1>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              statusColor[profile.status]
            }`}
          >
            {profile.status === "available"
              ? "🟢 Sẵn sàng nhận đơn"
              : profile.status === "delivering"
              ? "🚚 Đang giao hàng"
              : "⚪ Không hoạt động"}
          </span>
        </div>

        <hr className="my-6 border-gray-200" />

        {/* Thông tin chi tiết */}
        <div className="space-y-3 text-gray-700">
          <p>
            <strong>ID:</strong> {profile.id}
          </p>
          <p>
            <strong>Email:</strong> {profile.email}
          </p>
          <p>
            <strong>Số điện thoại:</strong> {profile.phone}
          </p>
          <p>
            <strong>Loại xe:</strong> {profile.vehicle_type}
          </p>
        </div>

        {/* 📊 Thống kê hiệu suất */}
        {stats && (
          <>
            <hr className="my-8 border-gray-200" />
            <h2 className="text-xl font-semibold text-blue-700 mb-3 text-center">
              📊 Hiệu suất tài xế
            </h2>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-blue-50 p-3 rounded-lg shadow-sm">
                <p className="text-sm text-gray-500">Tổng đơn</p>
                <p className="text-xl font-bold text-blue-700">{stats.total}</p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg shadow-sm">
                <p className="text-sm text-gray-500">Hoàn tất</p>
                <p className="text-xl font-bold text-green-700">
                  {stats.completed}
                </p>
              </div>
              <div className="bg-yellow-50 p-3 rounded-lg shadow-sm">
                <p className="text-sm text-gray-500">Tỉ lệ</p>
                <p className="text-xl font-bold text-yellow-700">
                  {((stats.completed / stats.total) * 100 || 0).toFixed(1)}%
                </p>
              </div>
            </div>
            <div className="text-center mt-4 text-purple-700 font-semibold">
              ⭐ Đánh giá trung bình: {stats.rating?.toFixed(1) || 5.0}/5
            </div>
          </>
        )}

        {/* Nút làm mới */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => window.location.reload()}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            🔄 Làm mới hồ sơ
          </button>
        </div>
      </motion.div>
    </div>
  );
}
