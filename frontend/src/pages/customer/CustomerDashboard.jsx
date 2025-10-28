import { useEffect, useState } from "react";
import API from "../../services/api";
import toast from "react-hot-toast";
import AOS from "aos";
import "aos/dist/aos.css";

// ✅ Lấy ID người dùng từ localStorage
function getCurrentUserId() {
  const keys = ["user", "userId", "userid", "user_id", "customer_id"];
  for (const key of keys) {
    const value = localStorage.getItem(key);
    if (!value) continue;
    if (key === "user") {
      try {
        const parsed = JSON.parse(value);
        if (parsed?.id) return parsed.id;
      } catch {}
    } else return value;
  }
  return null;
}

export default function CustomerDashboard() {
  const [shipments, setShipments] = useState([]);
  const [stats, setStats] = useState({ total: 0, delivering: 0, completed: 0 });
  const userId = getCurrentUserId();

  useEffect(() => {
    // 👇 Hiệu ứng nhẹ hơn
    AOS.init({ duration: 400, easing: "ease-in-out", once: true });

    if (!userId) {
      toast.error("❌ Không tìm thấy người dùng, vui lòng đăng nhập lại!");
      return;
    }

    const fetchShipments = async () => {
      try {
        const res = await API.get(`/customers/${userId}/shipments`);
        const data = res.data || [];
        setShipments(data);

        const total = data.length;
        const delivering = data.filter(
          (s) => s.status === "delivering" || s.status === "picking"
        ).length;
        const completed = data.filter(
          (s) => s.status === "delivered" || s.status === "completed"
        ).length;

        setStats({ total, delivering, completed });
      } catch (err) {
        console.error(err);
        toast.error("Không thể tải danh sách đơn hàng!");
      }
    };

    fetchShipments();
  }, [userId]);

  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen p-8 font-sans">
      {/* Header */}
      <h2
        className="text-3xl font-bold text-gray-700 mb-10 text-center"
        data-aos="fade-up"
      >
        👋 Xin chào,{" "}
        <span className="text-blue-600 capitalize">
          {localStorage.getItem("username") || "Khách hàng"}
        </span>
        !
      </h2>

      {/* Thống kê */}
      <section
        className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12"
        data-aos="fade-up"
      >
        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition text-center border-t-4 border-blue-500">
          <h3 className="text-gray-500 text-sm font-medium">
            📦 Đơn hàng đã tạo
          </h3>
          <p className="text-4xl font-bold text-blue-600 mt-2">{stats.total}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition text-center border-t-4 border-green-500">
          <h3 className="text-gray-500 text-sm font-medium">🚚 Đang giao</h3>
          <p className="text-4xl font-bold text-green-600 mt-2">
            {stats.delivering}
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition text-center border-t-4 border-orange-500">
          <h3 className="text-gray-500 text-sm font-medium">✅ Hoàn tất</h3>
          <p className="text-4xl font-bold text-orange-600 mt-2">
            {stats.completed}
          </p>
        </div>
      </section>

      {/* Bảng đơn hàng */}
      <section
        className="bg-white rounded-2xl shadow-lg p-6"
        data-aos="fade-up"
      >
        <h3 className="text-xl font-semibold mb-5 text-gray-700 flex items-center gap-2">
          📋 Đơn hàng gần đây
        </h3>

        {shipments.length === 0 ? (
          <p className="text-gray-500 text-center py-10 italic">
            Chưa có đơn hàng nào được tạo.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead className="bg-blue-50 text-gray-700 uppercase">
                <tr>
                  <th className="p-3 border">Mã đơn</th>
                  <th className="p-3 border">Người nhận</th>
                  <th className="p-3 border">Trạng thái</th>
                  <th className="p-3 border">COD</th>
                  <th className="p-3 border">Ngày tạo</th>
                </tr>
              </thead>
              <tbody>
                {shipments.slice(0, 5).map((s) => (
                  <tr
                    key={s.id}
                    className="hover:bg-blue-50 transition text-center"
                  >
                    <td className="p-3 border font-semibold text-blue-600">
                      {s.tracking_code}
                    </td>
                    <td className="p-3 border">{s.receiver_name}</td>
                    <td
                      className={`p-3 border font-medium ${
                        s.status === "pending"
                          ? "text-yellow-600"
                          : s.status === "delivering" || s.status === "picking"
                          ? "text-blue-600"
                          : s.status === "delivered" || s.status === "completed"
                          ? "text-green-600"
                          : s.status === "failed"
                          ? "text-red-600"
                          : "text-gray-500"
                      }`}
                    >
                      {(() => {
                        switch (s.status) {
                          case "pending":
                            return "⏳ Chờ xử lý";
                          case "picking":
                            return "🚚 Đang lấy hàng";
                          case "delivering":
                            return "📦 Đang giao hàng";
                          case "delivered":
                            return "✅ Đã giao thành công";
                          case "failed":
                            return "❌ Giao thất bại";
                          case "cancelled":
                            return "🚫 Đã hủy";
                          default:
                            return s.status;
                        }
                      })()}
                    </td>
                    <td className="p-3 border text-gray-700">
                      {s.cod_amount?.toLocaleString("vi-VN")}₫
                    </td>
                    <td className="p-3 border text-gray-500">
                      {new Date(s.created_at).toLocaleDateString("vi-VN")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
