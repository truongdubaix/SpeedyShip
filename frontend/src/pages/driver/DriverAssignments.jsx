import { useState, useEffect } from "react";
import API from "../../services/api";

export default function DriverAssignments() {
  const [assignments, setAssignments] = useState([]);

  // 🧭 Lấy danh sách đơn giao cho tài xế (tạm ID = 1)
  const fetchAssignments = async () => {
    try {
      const res = await API.get("/drivers/assignments/1"); // ✅ sửa từ /driver -> /drivers
      setAssignments(res.data);
    } catch (err) {
      console.error("❌ Lỗi khi tải danh sách đơn:", err);
    }
  };

  // ⚙️ Cập nhật trạng thái đơn hàng
  const handleStatusChange = async (shipmentId, newStatus) => {
    try {
      await API.patch(`/drivers/shipments/${shipmentId}/status`, {
        status: newStatus,
      });
      alert("✅ Cập nhật trạng thái thành công!");
      fetchAssignments();
    } catch (err) {
      console.error("❌ Lỗi cập nhật trạng thái:", err);
      alert("Không thể cập nhật trạng thái!");
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "assigned":
        return "text-gray-600 bg-gray-100";
      case "picking":
        return "text-yellow-700 bg-yellow-100";
      case "delivering":
        return "text-blue-700 bg-blue-100";
      case "completed":
        return "text-green-700 bg-green-100";
      default:
        return "";
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-blue-700">
        🚚 Đơn hàng được giao
      </h1>

      {assignments.length === 0 ? (
        <p className="text-gray-500 text-center mt-10">
          Không có đơn hàng nào được giao.
        </p>
      ) : (
        <table className="w-full border-collapse border border-gray-200 shadow">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-2">Mã đơn</th>
              <th className="p-2">Địa chỉ giao</th>
              <th className="p-2">Trạng thái</th>
              <th className="p-2">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((item) => (
              <tr
                key={item.shipment_id}
                className="border-b text-center hover:bg-blue-50"
              >
                <td className="p-2 font-semibold">{item.tracking_code}</td>
                <td className="p-2">{item.delivery_address}</td>
                <td className="p-2">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      item.status
                    )}`}
                  >
                    {{
                      assigned: "Được giao",
                      picking: "Đang lấy hàng",
                      delivering: "Đang giao hàng",
                      completed: "Hoàn tất",
                    }[item.status] || item.status}
                  </span>
                </td>
                <td className="p-2">
                  <select
                    value={item.status}
                    onChange={(e) =>
                      handleStatusChange(item.shipment_id, e.target.value)
                    }
                    className="border rounded px-2 py-1 bg-white focus:ring focus:ring-blue-300"
                  >
                    <option value="assigned">Được giao</option>
                    <option value="picking">Đang lấy hàng</option>
                    <option value="delivering">Đang giao</option>
                    <option value="completed">Hoàn tất</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
