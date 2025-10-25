import { useEffect, useState } from "react";
import API from "../../services/api";
import toast from "react-hot-toast";

/** Lấy userId từ localStorage theo nhiều cách:
 * 1) user (JSON) -> .id
 * 2) userId / userid / user_id (string/number)
 * 3) Giải mã JWT token -> payload.id || payload.userId || payload.sub
 */
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

  // fallback: decode JWT
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
    if (!userId) {
      toast.error("❌ Không tìm thấy người dùng, vui lòng đăng nhập lại!");
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        // Nếu backend yêu cầu JWT: thêm Authorization header
        // const token = localStorage.getItem("token");
        // const res = await API.get(`/customers/profile/${userId}`, {
        //   headers: { Authorization: `Bearer ${token}` },
        // });

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
      // const token = localStorage.getItem("token");
      // await API.put(`/customers/profile/${userId}`, profile, {
      //   headers: { Authorization: `Bearer ${token}` },
      // });

      await API.put(`/customers/profile/${userId}`, profile);
      toast.success("✅ Cập nhật hồ sơ thành công!");
    } catch (err) {
      console.error(err);
      toast.error("❌ Lỗi khi cập nhật hồ sơ!");
    }
  };

  if (loading) return <p className="p-6 text-gray-500">Đang tải hồ sơ...</p>;

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md mt-10 space-y-6">
      <h1 className="text-3xl font-bold text-blue-700 text-center">
        👤 Hồ sơ khách hàng
      </h1>

      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Họ và tên:</label>
          <input
            type="text"
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            className="w-full border p-2 rounded-md focus:outline-blue-500"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Email:</label>
          <input
            type="email"
            value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            className="w-full border p-2 rounded-md focus:outline-blue-500"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Số điện thoại:</label>
          <input
            type="text"
            value={profile.phone}
            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
            className="w-full border p-2 rounded-md focus:outline-blue-500"
            required
          />
        </div>

        <div className="pt-4 flex justify-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            💾 Lưu thay đổi
          </button>
        </div>
      </form>
    </div>
  );
}
