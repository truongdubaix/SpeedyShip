import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../../services/api";

export default function DispatcherAssignments() {
  const [assignments, setAssignments] = useState([]);
  const [unassigned, setUnassigned] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const navigate = useNavigate();

  // TAB
  const [activeTab, setActiveTab] = useState("unassigned");

  // PAGINATION
  const ITEMS_PER_PAGE = 10;
  const [pageUnassigned, setPageUnassigned] = useState(1);
  const [pageAssigned, setPageAssigned] = useState(1);

  const paginatedUnassigned = unassigned.slice(
    (pageUnassigned - 1) * ITEMS_PER_PAGE,
    pageUnassigned * ITEMS_PER_PAGE
  );

  const paginatedAssigned = assignments.slice(
    (pageAssigned - 1) * ITEMS_PER_PAGE,
    pageAssigned * ITEMS_PER_PAGE
  );

  const totalUnassignedPages = Math.ceil(unassigned.length / ITEMS_PER_PAGE);
  const totalAssignedPages = Math.ceil(assignments.length / ITEMS_PER_PAGE);

  // 🔹 Lấy toàn bộ dữ liệu ban đầu
  const fetchAll = async () => {
    try {
      const [a1, a2, a3] = await Promise.all([
        API.get("/dispatcher/assignments"),
        API.get("/dispatcher/shipments/unassigned"),
        API.get("/dispatcher/drivers"),
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

  // 🚚 Phân công tài xế
  const handleAssign = async (shipment_id, driver_id) => {
    try {
      await API.post("/shipments/assign", { shipment_id, driver_id });
      toast.success("✅ Đã phân công tài xế!");
      fetchAll();
    } catch {
      toast.error("❌ Phân công thất bại!");
    }
  };

  // 🔁 Cập nhật trạng thái
  const handleStatusChange = async (id, newStatus) => {
    try {
      await API.put(`/dispatcher/assignments/${id}`, { status: newStatus });
      toast.success("🔄 Cập nhật trạng thái thành công!");
      fetchAll();
    } catch {
      toast.error("❌ Lỗi cập nhật!");
    }
  };

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold text-blue-700">
        🚚 Quản lý phân công tài xế
      </h1>

      {/* ----- TABS ----- */}
      <div className="flex gap-4 mb-5">
        <button
          onClick={() => setActiveTab("unassigned")}
          className={`px-5 py-2 rounded-lg font-medium ${
            activeTab === "unassigned"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          🕒 Đơn chưa phân công
        </button>

        <button
          onClick={() => setActiveTab("assigned")}
          className={`px-5 py-2 rounded-lg font-medium ${
            activeTab === "assigned"
              ? "bg-green-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          📋 Danh sách phân công
        </button>
      </div>

      {/* ========== TAB 1: Đơn chưa phân công ========== */}
      {activeTab === "unassigned" && (
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">
            🕒 Đơn hàng chưa phân công
          </h2>

          <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-blue-600 text-white text-left">
                <th className="p-3 text-center w-[15%]">Mã đơn</th>
                <th className="p-3 w-[30%]">Người gửi</th>
                <th className="p-3 w-[30%]">Người nhận</th>
                <th className="p-3 text-center w-[25%]">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUnassigned.length > 0 ? (
                paginatedUnassigned.map((s) => (
                  <tr
                    key={s.id}
                    className="border-b hover:bg-blue-50 even:bg-gray-50 transition-all"
                  >
                    <td className="p-3 text-center font-semibold text-blue-700">
                      {s.tracking_code}
                    </td>
                    <td className="p-3">{s.sender_name}</td>
                    <td className="p-3">{s.receiver_name}</td>
                    <td className="p-3 text-center">
                      <select
                        onChange={(e) =>
                          handleAssign(s.id, e.target.value || null)
                        }
                        defaultValue=""
                        className="border rounded px-3 py-1"
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
                  <td colSpan="4" className="p-4 text-center text-gray-500">
                    Không có đơn nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* PHÂN TRANG */}
          <div className="flex justify-center mt-4 gap-3">
            <button
              disabled={pageUnassigned === 1}
              onClick={() => setPageUnassigned(pageUnassigned - 1)}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-40"
            >
              ⬅ Trang trước
            </button>
            <button
              disabled={pageUnassigned === totalUnassignedPages}
              onClick={() => setPageUnassigned(pageUnassigned + 1)}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-40"
            >
              Trang sau ➡
            </button>
          </div>
        </div>
      )}

      {/* ========== TAB 2: Danh sách phân công ========== */}
      {activeTab === "assigned" && (
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">
            📋 Danh sách phân công
          </h2>

          <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-green-600 text-white">
                <th className="p-3 text-center w-[15%]">Mã đơn</th>
                <th className="p-3 w-[25%]">Tài xế</th>
                <th className="p-3 text-center w-[20%]">Phương tiện</th>
                <th className="p-3 text-center w-[25%]">Trạng thái</th>
                <th className="p-3 text-center w-[15%]">Hành động</th>
              </tr>
            </thead>

            <tbody>
              {paginatedAssigned.length > 0 ? (
                paginatedAssigned.map((a) => (
                  <tr
                    key={a.id}
                    className="border-b even:bg-gray-50 hover:bg-green-50 transition-all"
                  >
                    <td className="p-3 text-center font-semibold text-green-700">
                      {a.tracking_code}
                    </td>
                    <td className="p-3">{a.driver_name}</td>
                    <td className="p-3 text-center">{a.vehicle_type}</td>

                    <td className="p-3 text-center">
                      <select
                        value={a.assignment_status}
                        onChange={(e) =>
                          handleStatusChange(a.id, e.target.value)
                        }
                        className="border rounded px-3 py-1"
                      >
                        <option value="assigned">Đã phân công</option>
                        <option value="picking">Đang lấy hàng</option>
                        <option value="delivering">Đang giao hàng</option>
                        <option value="completed">Hoàn tất</option>
                        <option value="failed">Thất bại</option>
                      </select>
                    </td>

                    <td className="p-3 text-center">
                      <button
                        onClick={() =>
                          navigate(`/dispatcher/tracking/${a.shipment_id}`)
                        }
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                      >
                        🔍 Xem
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-4 text-center text-gray-500">
                    Không có phân công nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* PHÂN TRANG */}
          <div className="flex justify-center mt-4 gap-3">
            <button
              disabled={pageAssigned === 1}
              onClick={() => setPageAssigned(pageAssigned - 1)}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-40"
            >
              ⬅ Trang trước
            </button>
            <button
              disabled={pageAssigned === totalAssignedPages}
              onClick={() => setPageAssigned(pageAssigned + 1)}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-40"
            >
              Trang sau ➡
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
