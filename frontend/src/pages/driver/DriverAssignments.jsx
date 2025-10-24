import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../services/api";

export default function DriverAssignments() {
  const { id } = useParams();
  const [assignments, setAssignments] = useState([]);

  const fetchAssignments = async () => {
    const res = await API.get(`/drivers/assignments/${id}`);
    setAssignments(res.data);
  };

  const handleStatusChange = async (shipmentId, status) => {
    try {
      await API.patch(`/drivers/shipments/${shipmentId}/status`, { status });
      fetchAssignments();
      alert("✅ Trạng thái đã được cập nhật!");
    } catch {
      alert("❌ Cập nhật thất bại!");
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, [id]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">🚚 Đơn hàng được giao</h1>
      <table className="w-full border">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th>Mã đơn</th>
            <th>Địa chỉ</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((a) => (
            <tr key={a.shipment_id} className="text-center border">
              <td>{a.tracking_code}</td>
              <td>{a.delivery_address}</td>
              <td>{a.status}</td>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
