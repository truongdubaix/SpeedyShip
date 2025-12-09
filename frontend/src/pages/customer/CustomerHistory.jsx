// src/pages/customer/CustomerHistory.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";
import toast, { Toaster } from "react-hot-toast";

export default function CustomerHistory() {
  const [shipments, setShipments] = useState([]);
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const navigate = useNavigate();

  const customerId =
    localStorage.getItem("customer_id") || localStorage.getItem("userId");

  useEffect(() => {
    if (!customerId) return;
    API.get(`/customers/shipments/customer/${customerId}`)
      .then((res) => setShipments(res.data))
      .catch(() => toast.error("Không thể tải lịch sử đơn hàng!"));
  }, [customerId]);

  const filtered =
    filter === "all" ? shipments : shipments.filter((s) => s.status === filter);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentShipments = filtered.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePrev = () =>
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  const handleNext = () =>
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));

  const statusMap = {
    pending: { text: "⏳ Chờ xử lý", color: "bg-yellow-100 text-yellow-700" },
    picking: {
      text: "📦 Đang lấy hàng",
      color: "bg-orange-100 text-orange-700",
    },
    delivering: {
      text: "🚚 Đang giao hàng",
      color: "bg-blue-100 text-blue-700",
    },
    delivered: { text: "✅ Hoàn tất", color: "bg-green-100 text-green-700" },
    completed: { text: "✅ Hoàn tất", color: "bg-green-100 text-green-700" },
    failed: { text: "❌ Thất bại", color: "bg-red-100 text-red-700" },
    cancelled: { text: "🚫 Đã hủy", color: "bg-gray-100 text-gray-600" },
    assigned: { text: "🕒 Được giao", color: "bg-gray-100 text-gray-600" },
  };

  const formatDate = (date) =>
    new Date(date).toLocaleString("vi-VN", {
      dateStyle: "short",
      timeStyle: "short",
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-8 space-y-6 font-sans">
      <Toaster position="top-right" />
      <h1 className="text-3xl font-bold text-blue-700 text-center mb-6">
        📦 Lịch sử đơn hàng
      </h1>

      {/* Bộ lọc trạng thái */}
      <div className="flex flex-wrap justify-center gap-2 mb-4">
        {[
          { key: "all", label: "Tất cả" },
          { key: "pending", label: "Chờ xử lý" },
          { key: "picking", label: "Đang lấy hàng" },
          { key: "delivering", label: "Đang giao hàng" },
          { key: "completed", label: "Hoàn tất" },
          { key: "failed", label: "Thất bại" },
          { key: "cancelled", label: "Đã hủy" },
        ].map((btn) => (
          <button
            key={btn.key}
            onClick={() => {
              setFilter(btn.key);
              setCurrentPage(1);
            }}
            className={`px-4 py-1.5 rounded-lg border text-sm font-medium transition-all duration-200 ${
              filter === btn.key
                ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                : "border-gray-300 text-gray-700 hover:bg-gray-100"
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* Bảng danh sách đơn hàng */}
      <div className="overflow-x-auto bg-white rounded-2xl shadow-lg border border-blue-100">
        <table className="w-full border-collapse text-center text-sm">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="p-3 w-[15%]">Mã đơn</th>
              <th className="p-3 w-[20%]">Người nhận</th>
              <th className="p-3 w-[20%]">Trạng thái</th>
              <th className="p-3 w-[20%]">Ngày tạo</th>
              <th className="p-3 w-[25%]">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {currentShipments.length > 0 ? (
              currentShipments.map((s, i) => (
                <tr
                  key={s.id}
                  className={`border-b transition-all ${
                    i % 2 === 0 ? "bg-white" : "bg-blue-50/40"
                  } hover:bg-blue-50`}
                >
                  <td className="font-semibold text-blue-600 p-3">
                    {s.tracking_code}
                  </td>
                  <td className="text-gray-700 p-3">{s.receiver_name}</td>
                  <td className="p-3">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-sm font-semibold ${
                        statusMap[s.status]?.color || "text-gray-600"
                      }`}
                    >
                      {statusMap[s.status]?.text || s.status}
                    </span>
                  </td>
                  <td className="p-3 text-gray-700 font-medium">
                    {formatDate(s.created_at)}
                  </td>
                  <td className="p-3">
                    <div className="flex justify-center items-center gap-3">
                      {/* Nút xem */}
                      <button
                        onClick={() => navigate(`/customer/history/${s.id}`)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-md text-sm font-semibold shadow-sm w-[110px] text-center"
                      >
                        👁️ Xem
                      </button>

                      {/* Nút đánh giá hoặc giữ chỗ */}
                      {s.status === "completed" || s.status === "delivered" ? (
                        <button
                          onClick={() =>
                            navigate(`/customer/feedback?shipment_id=${s.id}`)
                          }
                          className="bg-yellow-400 hover:bg-yellow-500 text-white px-5 py-2 rounded-md text-sm font-semibold shadow-sm w-[110px] text-center"
                        >
                          ⭐ Đánh giá
                        </button>
                      ) : (
                        <div className="w-[110px] h-[38px]" />
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-6 text-gray-500 italic">
                  Không có đơn hàng nào để hiển thị.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Phân trang */}
      {filtered.length > itemsPerPage && (
        <div className="flex justify-center items-center mt-6 gap-4">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg border font-medium text-sm ${
              currentPage === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white text-blue-600 border-blue-400 hover:bg-blue-50"
            }`}
          >
            Trước
          </button>

          <span className="text-gray-700 font-medium">
            Trang {currentPage} / {totalPages}
          </span>

          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg border font-medium text-sm ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white text-blue-600 border-blue-400 hover:bg-blue-50"
            }`}
          >
            Sau
          </button>
        </div>
      )}
    </div>
  );
}
