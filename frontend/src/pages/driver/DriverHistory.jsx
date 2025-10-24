import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../services/api";

export default function DriverHistory() {
  const { id } = useParams();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await API.get(`/drivers/history/${id}`);
        setHistory(res.data);
      } catch (err) {
        console.error("❌ Lỗi khi tải lịch sử:", err);
      }
    };
    fetchHistory();
  }, [id]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">📜 Lịch sử giao hàng</h1>
      <table className="w-full border">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th>Mã đơn</th>
            <th>Địa chỉ</th>
            <th>Trạng thái</th>
            <th>Ngày hoàn tất</th>
          </tr>
        </thead>
        <tbody>
          {history.map((h, i) => (
            <tr key={i} className="text-center border">
              <td>{h.tracking_code}</td>
              <td>{h.delivery_address}</td>
              <td>{h.status}</td>
              <td>{new Date(h.completed_at).toLocaleString("vi-VN")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
