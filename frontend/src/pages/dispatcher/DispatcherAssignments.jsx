import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../../services/api";

export default function DispatcherAssignments() {
  const [assignments, setAssignments] = useState([]);
  const [unassigned, setUnassigned] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const navigate = useNavigate();

  // 🔹 Lấy toàn bộ dữ liệu ban đầu
  const fetchAll = async () => {
    try {
      const [a1, a2, a3] = await Promise.all([
        API.get("/dispatcher/assignments"), // danh sách đã phân công
        API.get("/dispatcher/shipments/unassigned"), // đơn chưa phân công
        API.get("/dispatcher/drivers"), // tài xế
      ]);
      setAssignments(a1.data);
      setUnassigned(a2.data);
      setDrivers(a3.data);
    } catch (err) {
      console.error("❌ Lỗi khi tải dữ liệu:", err);
      toast.error("Không thể tải dữ liệu");
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  // 🚚 Phân công tài xế cho đơn hàng (gửi thông báo realtime)
  const handleAssign = async (shipment_id, driver_id) => {
    try {
      await API.post("/shipments/assign", { shipment_id, driver_id }); // ✅ API mới
      toast.success("✅ Đã phân công tài xế và gửi thông báo!");
      fetchAll();
    } catch (err) {
      console.error("❌ Lỗi khi phân công:", err);
      toast.error("❌ Phân công thất bại!");
    }
  };

  // 🔁 Cập nhật trạng thái đơn
  const handleStatusChange = async (id, newStatus) => {
    try {
      await API.put(`/dispatcher/assignments/${id}`, { status: newStatus });
      toast.success("🔄 Cập nhật trạng thái thành công!");
      fetchAll();
    } catch (err) {
      console.error("❌ Lỗi khi cập nhật trạng thái:", err);
      toast.error("❌ Lỗi cập nhật trạng thái!");
    }
  };

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold text-blue-700">
        🚚 Quản lý phân công tài xế
      </h1>

      {/* ====== Đơn hàng chưa phân công ====== */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-3 text-gray-800">
          🕒 Đơn hàng chưa phân công
        </h2>
        <table className="w-full text-sm border border-gray-200">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-2">Mã đơn</th>
              <th className="p-2">Người gửi</th>
              <th className="p-2">Người nhận</th>
              <th className="p-2">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {unassigned.length > 0 ? (
              unassigned.map((s) => (
                <tr key={s.id} className="border-b hover:bg-blue-50">
                  <td className="p-2 font-semibold text-blue-700">
                    {s.tracking_code}
                  </td>
                  <td className="p-2">{s.sender_name}</td>
                  <td className="p-2">{s.receiver_name}</td>
                  <td className="p-2">
                    <select
                      onChange={(e) =>
                        handleAssign(s.id, e.target.value || null)
                      }
                      defaultValue=""
                      className="border rounded px-2 py-1"
                    >
                      <option value="">-- Chọn tài xế --</option>
                      {drivers.map((d) => (
                        <option key={d.id} value={d.id}>
                          {d.name} ({d.vehicle_type})
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="p-3 text-center text-gray-500 italic"
                >
                  ✅ Tất cả đơn đã được phân công.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ====== Danh sách phân công ====== */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-3 text-gray-800">
          📋 Danh sách phân công
        </h2>
        <table className="w-full text-sm border border-gray-200">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="p-2">Mã đơn</th>
              <th className="p-2">Tài xế</th>
              <th className="p-2">Phương tiện</th>
              <th className="p-2">Trạng thái</th>
              <th className="p-2">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {assignments.length > 0 ? (
              assignments.map((a) => (
                <tr key={a.id} className="border-b hover:bg-green-50">
                  <td className="p-2 font-semibold text-green-700">
                    {a.tracking_code}
                  </td>
                  <td className="p-2">{a.driver_name}</td>
                  <td className="p-2">{a.vehicle_type}</td>
                  <td className="p-2">
                    <select
                      value={a.assignment_status}
                      onChange={(e) => handleStatusChange(a.id, e.target.value)}
                      className="border rounded px-2 py-1"
                    >
                      <option value="assigned">Đã phân công</option>
                      <option value="picking">Đang lấy hàng</option>
                      <option value="delivering">Đang giao hàng</option>
                      <option value="completed">Hoàn tất</option>
                      <option value="failed">Thất bại</option>
                    </select>
                  </td>
                  <td className="p-2 text-center flex justify-center gap-2">
                    <button
                      onClick={() =>
                        navigate(`/dispatcher/tracking/${a.shipment_id}`)
                      }
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                    >
                      🔍 Xem chi tiết
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="p-3 text-center text-gray-500 italic"
                >
                  Không có phân công nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
