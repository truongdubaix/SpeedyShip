import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import API from "../../services/api";

export default function DispatcherTracking() {
  const [unassigned, setUnassigned] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [selected, setSelected] = useState({ shipment_id: "", driver_id: "" });

  // ===== PAGINATION =====
  const ITEMS_PER_PAGE = 10;
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(assignments.length / ITEMS_PER_PAGE);

  const paginatedAssignments = assignments.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  // ================== LẤY DỮ LIỆU ==================
  const fetchData = async () => {
    try {
      const [shipRes, driverRes, assignRes] = await Promise.all([
        API.get("/dispatcher/shipments/unassigned"),
        API.get("/dispatcher/drivers"),
        API.get("/dispatcher/assignments"),
      ]);
      setUnassigned(shipRes.data);
      setDrivers(driverRes.data);
      setAssignments(assignRes.data);
    } catch (err) {
      console.error("❌ Lỗi load dữ liệu:", err);
      toast.error("Không thể tải dữ liệu điều phối!");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ================== PHÂN CÔNG ==================
  const handleAssign = async () => {
    if (!selected.shipment_id) {
      toast.error("Vui lòng chọn đơn hàng!");
      return;
    }
    if (!selected.driver_id) {
      toast.error("Vui lòng tài xế!");
      return;
    }
    try {
      await API.post("/dispatcher/assign", selected);
      toast.success("✅ Phân công thành công!");
      setSelected({ shipment_id: "", driver_id: "" });
      fetchData();
    } catch (err) {
      console.error("❌ assign error:", err);
      toast.error("Phân công thất bại!");
    }
  };

  // ================== CẬP NHẬT TRẠNG THÁI ==================
  const handleStatusUpdate = async (id, status) => {
    try {
      await API.patch(`/dispatcher/assignments/${id}/status`, { status });
      toast.success("Cập nhật trạng thái thành công!");
      fetchData();
    } catch (err) {
      console.error("❌ updateStatus error:", err);
      toast.error("Lỗi khi cập nhật!");
    }
  };

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">
        🚛 Trang Điều Phối Viên
      </h1>

      {/* PHÂN CÔNG ĐƠN HÀNG */}
      <div className="bg-white p-5 rounded-lg shadow space-y-3">
        <h2 className="text-xl font-semibold text-gray-700">
          ➕ Phân công đơn hàng
        </h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <select
            value={selected.shipment_id}
            onChange={(e) =>
              setSelected({ ...selected, shipment_id: e.target.value })
            }
            className="border p-2 rounded w-full sm:w-1/2"
          >
            <option value="">Chọn đơn hàng...</option>
            {unassigned.map((s) => (
              <option key={s.id} value={s.id}>
                {s.tracking_code} - {s.sender_name} ➜ {s.receiver_name}
              </option>
            ))}
          </select>

          <select
            value={selected.driver_id}
            onChange={(e) =>
              setSelected({ ...selected, driver_id: e.target.value })
            }
            className="border p-2 rounded w-full sm:w-1/2"
          >
            <option value="">Chọn tài xế...</option>
            {drivers.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name} ({d.vehicle_type})
              </option>
            ))}
          </select>

          <button
            onClick={handleAssign}
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
          >
            🚀 Phân công
          </button>
        </div>
      </div>

      {/* DANH SÁCH ĐƠN ĐANG GIAO */}
      <div className="bg-white p-5 rounded-lg shadow space-y-3">
        <h2 className="text-xl font-semibold text-gray-700">
          📦 Danh sách đơn hàng đang theo dõi
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-gray-200">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-2">Mã đơn</th>
                <th className="p-2">Người gửi</th>
                <th className="p-2">Người nhận</th>
                <th className="p-2">Tài xế</th>
                <th className="p-2">Phương tiện</th>
                <th className="p-2">Trạng thái</th>
                <th className="p-2">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {paginatedAssignments.length ? (
                paginatedAssignments.map((a) => (
                  <tr key={a.id} className="border-b hover:bg-blue-50">
                    <td className="p-2 font-semibold text-blue-600">
                      {a.tracking_code}
                    </td>
                    <td className="p-2">{a.sender_name || "-"}</td>
                    <td className="p-2">{a.receiver_name || "-"}</td>
                    <td className="p-2">{a.driver_name}</td>
                    <td className="p-2">{a.vehicle_type}</td>
                    <td className="p-2 capitalize">
                      {a.assignment_status || "chưa có"}
                    </td>
                    <td className="p-2">
                      <select
                        onChange={(e) =>
                          handleStatusUpdate(a.id, e.target.value)
                        }
                        defaultValue=""
                        className="border rounded px-2 py-1"
                      >
                        <option value="">Cập nhật...</option>
                        <option value="picking">Đang lấy hàng</option>
                        <option value="delivering">Đang giao hàng</option>
                        <option value="completed">Hoàn tất</option>
                        <option value="failed">Thất bại</option>
                      </select>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center p-4 text-gray-500">
                    Không có đơn nào được phân công.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PHÂN TRANG */}
        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-40"
          >
            ⬅ Trang trước
          </button>

          <span className="font-semibold text-gray-700">
            Trang {page} / {totalPages || 1}
          </span>

          <button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-40"
          >
            Trang sau ➡
          </button>
        </div>
      </div>
    </div>
  );
}
