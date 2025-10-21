import { useEffect, useMemo, useState } from "react";
import API from "../../services/api";
import toast from "react-hot-toast";

export default function DispatcherAssignments() {
  const [unassigned, setUnassigned] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState({});
  const [search, setSearch] = useState("");
  const [statusUpdate, setStatusUpdate] = useState({}); // {assignmentId: 'delivering'}
  const [locationUpdate, setLocationUpdate] = useState({}); // {assignmentId: 'Quận 5 - HCM'}

  const fetchAll = async () => {
    try {
      const [u, d, a] = await Promise.all([
        API.get("/dispatcher/shipments/unassigned"),
        API.get("/dispatcher/drivers"),
        API.get("/dispatcher/assignments?activeOnly=true"),
      ]);
      setUnassigned(u.data);
      setDrivers(d.data);
      setAssignments(a.data);
    } catch (err) {
      console.error(err);
      toast.error("Không tải được dữ liệu điều phối");
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const filteredUnassigned = useMemo(() => {
    const kw = search.toLowerCase();
    return unassigned.filter(
      (s) =>
        (s.tracking_code || "").toLowerCase().includes(kw) ||
        (s.sender_name || "").toLowerCase().includes(kw) ||
        (s.receiver_name || "").toLowerCase().includes(kw) ||
        (s.delivery_address || "").toLowerCase().includes(kw)
    );
  }, [search, unassigned]);

  const handleAssign = async (shipmentId) => {
    const driverId = selectedDriver[shipmentId];
    if (!driverId) return toast.error("Chọn tài xế trước khi phân công");
    try {
      await API.post("/dispatcher/assign", {
        shipment_id: shipmentId,
        driver_id: driverId,
      });
      toast.success("✅ Đã phân công tài xế");
      // reload
      setSelectedDriver((prev) => ({ ...prev, [shipmentId]: "" }));
      fetchAll();
    } catch {
      toast.error("❌ Lỗi khi phân công");
    }
  };

  const handleStatusChange = (assignmentId, newStatus) => {
    setStatusUpdate((prev) => ({ ...prev, [assignmentId]: newStatus }));
  };

  const handleUpdateStatus = async (assignmentId) => {
    const status = statusUpdate[assignmentId];
    const current_location = locationUpdate[assignmentId] || "";
    if (!status) return toast.error("Chọn trạng thái cần cập nhật");
    try {
      await API.patch(`/dispatcher/assignments/${assignmentId}/status`, {
        status,
        current_location,
      });
      toast.success("🔄 Đã cập nhật trạng thái");
      fetchAll();
    } catch {
      toast.error("❌ Cập nhật thất bại");
    }
  };

  const handleReassign = async (assignmentId, driverId) => {
    if (!driverId) return toast.error("Chọn tài xế");
    try {
      await API.patch(`/dispatcher/assignments/${assignmentId}/reassign`, {
        driver_id: driverId,
      });
      toast.success("🔁 Đã đổi tài xế");
      fetchAll();
    } catch {
      toast.error("❌ Đổi tài xế thất bại");
    }
  };

  return (
    <div className="p-6 space-y-10">
      <h1 className="text-2xl font-bold text-gray-700">
        🧭 Điều phối phân công
      </h1>

      {/* Khối 1: Đơn chưa phân công */}
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
          <h2 className="text-lg font-semibold text-gray-700">
            📨 Đơn chưa phân công
          </h2>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-lg px-3 py-2 w-full md:w-80"
            placeholder="Tìm: mã vận đơn / người gửi / người nhận / địa chỉ"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-gray-200">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-3">Mã vận đơn</th>
                <th className="p-3">Người gửi</th>
                <th className="p-3">Người nhận</th>
                <th className="p-3">Nơi lấy</th>
                <th className="p-3">Nơi giao</th>
                <th className="p-3 text-center">Chọn tài xế</th>
                <th className="p-3 text-center">Phân công</th>
              </tr>
            </thead>
            <tbody>
              {filteredUnassigned.length ? (
                filteredUnassigned.map((s) => (
                  <tr key={s.id} className="border-b hover:bg-blue-50">
                    <td className="p-3 font-semibold text-blue-600">
                      {s.tracking_code}
                    </td>
                    <td className="p-3">
                      <div className="font-medium">{s.sender_name}</div>
                      <div className="text-gray-500 text-xs">
                        {s.sender_phone}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="font-medium">{s.receiver_name}</div>
                      <div className="text-gray-500 text-xs">
                        {s.receiver_phone}
                      </div>
                    </td>
                    <td className="p-3">{s.pickup_address}</td>
                    <td className="p-3">{s.delivery_address}</td>
                    <td className="p-3 text-center">
                      <select
                        className="border rounded px-2 py-1"
                        value={selectedDriver[s.id] || ""}
                        onChange={(e) =>
                          setSelectedDriver((prev) => ({
                            ...prev,
                            [s.id]: Number(e.target.value || 0),
                          }))
                        }
                      >
                        <option value="">-- Chọn tài xế --</option>
                        {drivers.map((d) => (
                          <option key={d.id} value={d.id}>
                            {d.name} ({d.vehicle_type})
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => handleAssign(s.id)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                      >
                        Phân công
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="p-6 text-center text-gray-500 italic"
                  >
                    Không có đơn chờ phân công
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Khối 2: Assignment đang hoạt động */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          🚚 Đơn đang xử lý
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-gray-200">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-3">Mã vận đơn</th>
                <th className="p-3">Tài xế</th>
                <th className="p-3">Trạng thái</th>
                <th className="p-3">Vị trí hiện tại</th>
                <th className="p-3">Đổi tài xế</th>
                <th className="p-3 text-center">Cập nhật</th>
              </tr>
            </thead>
            <tbody>
              {assignments.length ? (
                assignments.map((a) => (
                  <tr key={a.id} className="border-b hover:bg-blue-50">
                    <td className="p-3">
                      <div className="font-semibold text-blue-600">
                        {a.tracking_code}
                      </div>
                      <div className="text-xs text-gray-500">
                        {a.pickup_address} → {a.delivery_address}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="font-medium">{a.driver_name}</div>
                      <div className="text-xs text-gray-500">
                        {a.driver_phone} • {a.vehicle_type}
                      </div>
                    </td>
                    <td className="p-3">
                      <select
                        className="border rounded px-2 py-1"
                        value={statusUpdate[a.id] || a.assignment_status}
                        onChange={(e) =>
                          handleStatusChange(a.id, e.target.value)
                        }
                      >
                        <option value="assigned">Đã phân công</option>
                        <option value="picking">Đang lấy hàng</option>
                        <option value="delivering">Đang giao</option>
                        <option value="completed">Hoàn tất</option>
                        <option value="failed">Thất bại</option>
                      </select>
                    </td>
                    <td className="p-3">
                      <input
                        className="border rounded px-2 py-1 w-56"
                        placeholder="Nhập vị trí (VD: Quận 5 - HCM)"
                        value={locationUpdate[a.id] || ""}
                        onChange={(e) =>
                          setLocationUpdate((prev) => ({
                            ...prev,
                            [a.id]: e.target.value,
                          }))
                        }
                      />
                    </td>
                    <td className="p-3">
                      <select
                        className="border rounded px-2 py-1"
                        onChange={(e) =>
                          handleReassign(a.id, Number(e.target.value || 0))
                        }
                      >
                        <option value="">-- Chọn tài xế --</option>
                        {drivers.map((d) => (
                          <option key={d.id} value={d.id}>
                            {d.name} ({d.vehicle_type})
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => handleUpdateStatus(a.id)}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                      >
                        Lưu
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="p-6 text-center text-gray-500 italic"
                  >
                    Không có đơn đang xử lý
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
