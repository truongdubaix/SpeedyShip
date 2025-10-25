// src/pages/driver/DriverAssignments.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../../services/api";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";

export default function DriverAssignments() {
  const { id } = useParams();
  const [assignments, setAssignments] = useState([]);
  const [filter, setFilter] = useState("all");

  const fetchAssignments = async () => {
    try {
      const res = await API.get(`/drivers/assignments/${id}`);
      setAssignments(res.data);
    } catch (err) {
      console.error("❌ Lỗi khi tải danh sách đơn hàng:", err);
      toast.error("Không thể tải dữ liệu");
    }
  };

  const handleStatusChange = async (shipmentId, status) => {
    try {
      await API.patch(`/drivers/shipments/${shipmentId}/status`, { status });
      fetchAssignments();
      toast.success("✅ Cập nhật trạng thái thành công!");
    } catch {
      toast.error("❌ Lỗi khi cập nhật trạng thái!");
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, [id]);

  const filteredAssignments =
    filter === "all"
      ? assignments
      : assignments.filter((a) => a.status === filter);

  const statusColor = {
    assigned: "text-gray-600 bg-gray-100",
    picking: "text-orange-600 bg-orange-100",
    delivering: "text-blue-600 bg-blue-100",
    completed: "text-green-600 bg-green-100",
  };

  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      <Toaster position="top-right" />
      <h1 className="text-3xl font-bold text-blue-700">
        🚚 Đơn hàng được giao
      </h1>

      {/* Bộ lọc */}
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

      {/* Bảng đơn hàng */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="w-full border border-gray-200">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-2">Mã đơn</th>
              <th className="p-2">Địa chỉ giao</th>
              <th className="p-2">Trạng thái</th>
              <th className="p-2">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filteredAssignments.length > 0 ? (
              filteredAssignments.map((a, i) => (
                <motion.tr
                  key={a.shipment_id}
                  className="text-center border-b hover:bg-blue-50"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <td className="font-semibold text-blue-600">
                    <Link
                      to={`/driver/${id}/shipments/${a.shipment_id}`}
                      className="hover:underline"
                    >
                      {a.tracking_code}
                    </Link>
                  </td>
                  <td>{a.delivery_address}</td>
                  <td>
                    <span
                      className={`px-2 py-1 rounded-md text-sm font-medium ${
                        statusColor[a.status]
                      }`}
                    >
                      {a.status === "assigned"
                        ? "🕒 Được giao"
                        : a.status === "picking"
                        ? "📦 Đang lấy hàng"
                        : a.status === "delivering"
                        ? "🚚 Đang giao"
                        : "✅ Hoàn tất"}
                    </span>
                  </td>
                  <td>
                    <select
                      value={a.status}
                      onChange={(e) =>
                        handleStatusChange(a.shipment_id, e.target.value)
                      }
                      className="border rounded p-1"
                    >
                      <option value="assigned">Được giao</option>
                      <option value="picking">Đang lấy hàng</option>
                      <option value="delivering">Đang giao</option>
                      <option value="completed">Hoàn tất</option>
                    </select>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-3 text-gray-500 italic">
                  Chưa có đơn hàng nào được phân công.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
