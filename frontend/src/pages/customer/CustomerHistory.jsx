import { useEffect, useState } from "react";
import API from "../../services/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

export default function CustomerHistory() {
  const [shipments, setShipments] = useState([]);
  const customerId =
    localStorage.getItem("customer_id") || localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 700, once: true });

    if (!customerId) return;
    API.get(`/customers/shipments/${customerId}`)
      .then((res) => setShipments(res.data))
      .catch(() => toast.error("Không thể tải lịch sử đơn hàng!"));
  }, [customerId]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2
        className="text-3xl font-extrabold mb-8 text-center text-blue-700"
        data-aos="fade-down"
      >
        🕓 Lịch sử đơn hàng của tôi
      </h2>

      {shipments.length === 0 ? (
        <p
          className="text-gray-500 text-center mt-10 text-lg italic"
          data-aos="fade-up"
        >
          Bạn chưa có đơn hàng nào.
        </p>
      ) : (
        <div
          className="overflow-x-auto bg-white shadow-lg rounded-2xl p-4 border border-blue-100"
          data-aos="zoom-in"
        >
          <table className="w-full border-collapse text-center text-sm rounded-lg overflow-hidden">
            <thead className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 uppercase text-xs">
              <tr>
                <th className="p-3 border">Mã đơn hàng</th>
                <th className="p-3 border">Người nhận</th>
                <th className="p-3 border">Trạng thái</th>
                <th className="p-3 border">Ngày tạo</th>
                <th className="p-3 border">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {shipments.map((s, i) => (
                <tr
                  key={s.id}
                  data-aos="fade-up"
                  data-aos-delay={i * 100}
                  className="transition-all duration-300 hover:scale-[1.01] hover:shadow-md border-b last:border-none"
                >
                  <td className="border p-3 font-semibold text-blue-700">
                    {s.tracking_code}
                  </td>
                  <td className="border p-3 text-gray-700">
                    {s.receiver_name}
                  </td>
                  <td
                    className={`border p-3 font-medium ${
                      s.status === "pending"
                        ? "text-yellow-600"
                        : s.status === "delivering" || s.status === "picking"
                        ? "text-blue-600"
                        : s.status === "delivered" || s.status === "completed"
                        ? "text-green-600"
                        : s.status === "failed"
                        ? "text-red-600"
                        : "text-gray-600"
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
                        case "completed":
                          return "✅ Hoàn tất";
                        case "failed":
                          return "❌ Giao thất bại";
                        case "cancelled":
                          return "🚫 Đã hủy";
                        default:
                          return s.status;
                      }
                    })()}
                  </td>
                  <td className="border p-3 text-gray-500">
                    {new Date(s.created_at).toLocaleString("vi-VN")}
                  </td>
                  <td className="border p-3 flex justify-center gap-2">
                    <button
                      onClick={() => navigate(`/customer/history/${s.id}`)}
                      className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-1.5 rounded-lg text-sm font-semibold shadow-md transition-transform transform hover:scale-105 active:scale-95"
                    >
                      Xem
                    </button>

                    {(s.status === "completed" || s.status === "delivered") && (
                      <button
                        onClick={() =>
                          navigate(`/customer/feedback?shipment_id=${s.id}`)
                        }
                        className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white px-4 py-1.5 rounded-lg text-sm font-semibold shadow-md transition-transform transform hover:scale-105 active:scale-95"
                      >
                        ⭐ Đánh giá
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
