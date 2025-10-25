// src/pages/driver/DriverHistory.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../services/api";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";

export default function DriverHistory() {
  const { id } = useParams();
  const [history, setHistory] = useState([]);
  const [filter, setFilter] = useState("all");

  const fetchHistory = async () => {
    try {
      const res = await API.get(`/drivers/history/${id}`);
      setHistory(res.data);
    } catch (err) {
      console.error("❌ Lỗi khi tải lịch sử:", err);
      toast.error("Không thể tải lịch sử giao hàng");
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [id]);

  const filtered =
    filter === "all" ? history : history.filter((h) => h.status === filter);

  const statusColor = {
    completed: "text-green-600 bg-green-100",
    delivering: "text-blue-600 bg-blue-100",
    picking: "text-orange-600 bg-orange-100",
    assigned: "text-gray-600 bg-gray-100",
  };

  const formatDate = (date) =>
    new Date(date).toLocaleString("vi-VN", {
      dateStyle: "short",
      timeStyle: "short",
    });

  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      <Toaster position="top-right" />
      <h1 className="text-3xl font-bold text-blue-700">📜 Lịch sử giao hàng</h1>

      {/* Bộ lọc trạng thái */}
      <div className="flex flex-wrap gap-2">
        {["all", "assigned", "picking", "delivering", "completed"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 rounded-lg border transition ${
              filter === f
                ? "bg-blue-600 text-white border-blue-600"
                : "border-gray-300 hover:bg-gray-100"
            }`}
          >
            {f === "all" ? "Tất cả" : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Bảng lịch sử */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="w-full border border-gray-200">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-2">Mã đơn</th>
              <th className="p-2">Địa chỉ giao hàng</th>
              <th className="p-2">Trạng thái</th>
              <th className="p-2">Ngày hoàn tất</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((h, i) => (
                <motion.tr
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="text-center border-b hover:bg-blue-50"
                >
                  <td className="font-semibold text-blue-600">
                    {h.tracking_code}
                  </td>
                  <td>{h.delivery_address}</td>
                  <td>
                    <span
                      className={`px-2 py-1 rounded-md text-sm font-medium ${
                        statusColor[h.status] || "text-gray-600"
                      }`}
                    >
                      {h.status === "completed"
                        ? "✅ Hoàn tất"
                        : h.status === "delivering"
                        ? "🚚 Đang giao"
                        : h.status === "picking"
                        ? "📦 Đang lấy hàng"
                        : "🕒 Được giao"}
                    </span>
                  </td>
                  <td>{formatDate(h.completed_at)}</td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-4 text-gray-500 italic">
                  Không có lịch sử giao hàng.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
