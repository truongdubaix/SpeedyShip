import { useState, useEffect } from "react";
import API from "../../services/api";

export default function DriverProfile() {
  const [profile, setProfile] = useState(null);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const driverId = 1; // tạm ID 1 (sau này bạn thay bằng localStorage hoặc token)

  // 📦 Lấy thông tin hồ sơ tài xế
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get(`/drivers/profile/${driverId}`);
        setProfile(res.data);
      } catch (err) {
        console.error("❌ Lỗi khi tải hồ sơ tài xế:", err);
      }
    };
    fetchProfile();
  }, []);

  // 🔐 Hàm đổi mật khẩu
  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword) {
      alert("⚠️ Vui lòng nhập đầy đủ mật khẩu cũ và mật khẩu mới");
      return;
    }
    setLoading(true);
    try {
      await API.patch(`/drivers/password/${driverId}`, {
        oldPassword,
        newPassword,
      });
      alert("✅ Đổi mật khẩu thành công!");
      setOldPassword("");
      setNewPassword("");
    } catch (err) {
      console.error("❌ Lỗi đổi mật khẩu:", err);
      alert(err.response?.data?.message || "Lỗi khi đổi mật khẩu!");
    } finally {
      setLoading(false);
    }
  };

  if (!profile) return <p className="p-6 text-gray-500">Đang tải hồ sơ...</p>;

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold text-blue-700">👤 Hồ Sơ Tài Xế</h1>

      {/* Thông tin cá nhân */}
      <div className="bg-white p-6 rounded-lg shadow-md max-w-lg">
        <p>
          <strong>ID:</strong> {profile.id}
        </p>
        <p>
          <strong>Họ tên:</strong> {profile.name}
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
        <p>
          <strong>Trạng thái:</strong>{" "}
          <span
            className={`${
              profile.status === "active" ? "text-green-600" : "text-gray-500"
            } font-semibold`}
          >
            {profile.status}
          </span>
        </p>
      </div>

      {/* Đổi mật khẩu */}
      <div className="bg-white p-6 rounded-lg shadow-md max-w-lg">
        <h2 className="text-xl font-semibold mb-3 text-gray-700">
          🔒 Đổi mật khẩu
        </h2>
        <div className="space-y-3">
          <input
            type="password"
            placeholder="Nhập mật khẩu cũ"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="border p-2 rounded w-full"
          />
          <input
            type="password"
            placeholder="Nhập mật khẩu mới"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="border p-2 rounded w-full"
          />
          <button
            onClick={handleChangePassword}
            disabled={loading}
            className={`w-full py-2 rounded text-white font-semibold ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Đang cập nhật..." : "Lưu thay đổi"}
          </button>
        </div>
      </div>
    </div>
  );
}
