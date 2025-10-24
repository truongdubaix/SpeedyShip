import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "../../services/api";

export default function DriverProfile() {
  const { id: paramId } = useParams();
  const [profile, setProfile] = useState(null);
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
    fetchProfile();
  }, [paramId]);

  if (!profile) return <p className="p-6 text-gray-500">Đang tải hồ sơ...</p>;

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold text-blue-700">👤 Hồ Sơ Tài Xế</h1>
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
          <strong>Trạng thái:</strong> {profile.status}
        </p>
      </div>
    </div>
  );
}
