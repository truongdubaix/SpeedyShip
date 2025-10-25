import { useEffect, useState } from "react";
import API from "../../services/api";
import toast from "react-hot-toast";
import AOS from "aos";
import "aos/dist/aos.css";

/** Lấy userId từ localStorage theo nhiều cách */
function getCurrentUserId() {
  try {
    const u = localStorage.getItem("user");
    if (u) {
      const parsed = JSON.parse(u);
      if (parsed?.id) return String(parsed.id);
    }
  } catch (_) {}

  const directId =
    localStorage.getItem("userId") ||
    localStorage.getItem("userid") ||
    localStorage.getItem("user_id");
  if (directId) return String(directId);

  const token = localStorage.getItem("token");
  if (token && token.split(".").length === 3) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const fromJwt =
        payload?.id || payload?.userId || payload?.sub || payload?.uid;
      if (fromJwt) return String(fromJwt);
    } catch (_) {}
  }

  return null;
}

export default function CustomerProfile() {
  const [profile, setProfile] = useState({ name: "", email: "", phone: "" });
  const [loading, setLoading] = useState(true);
  const userId = getCurrentUserId();

  useEffect(() => {
    AOS.init({ duration: 800, once: true });

    if (!userId) {
      toast.error("❌ Không tìm thấy người dùng, vui lòng đăng nhập lại!");
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await API.get(`/customers/profile/${userId}`);
        setProfile({
          name: res.data?.name || "",
          email: res.data?.email || "",
          phone: res.data?.phone || "",
        });
      } catch (err) {
        console.error(err);
        toast.error("Không thể tải hồ sơ khách hàng!");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!userId) {
      toast.error("Bạn chưa đăng nhập!");
      return;
    }
    try {
      await API.put(`/customers/profile/${userId}`, profile);
      toast.success("✅ Cập nhật hồ sơ thành công!");
    } catch (err) {
      console.error(err);
      toast.error("❌ Lỗi khi cập nhật hồ sơ!");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center py-20 text-gray-500">
        ⏳ Đang tải hồ sơ...
      </div>
    );

  return (
    <div
      className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-xl mt-10 space-y-6 border border-blue-100"
      data-aos="fade-up"
    >
      <h1
        className="text-3xl font-extrabold text-blue-700 text-center mb-4"
        data-aos="fade-down"
      >
        👤 Hồ sơ khách hàng
      </h1>
      <p
        className="text-gray-500 text-center text-sm"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        Cập nhật thông tin cá nhân để SpeedyShip phục vụ bạn tốt hơn 🚚
      </p>

      <form
        onSubmit={handleUpdate}
        className="space-y-5"
        data-aos="zoom-in"
        data-aos-delay="200"
      >
        <div>
          <label className="block font-semibold mb-2 text-gray-700">
            Họ và tên:
          </label>
          <input
            type="text"
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-2 text-gray-700">
            Email:
          </label>
          <input
            type="email"
            value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-2 text-gray-700">
            Số điện thoại:
          </label>
          <input
            type="text"
            value={profile.phone}
            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            required
          />
        </div>

        <div className="pt-4 flex justify-center">
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold shadow-md transition transform hover:scale-105 active:scale-95"
          >
            💾 Lưu thay đổi
          </button>
        </div>
      </form>
    </div>
  );
}
