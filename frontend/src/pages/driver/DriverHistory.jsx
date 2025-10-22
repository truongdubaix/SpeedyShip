import { useEffect, useState } from "react";
import API from "../../services/api";

export default function DriverHistory() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    API.get("/drivers/history/1").then((res) => setHistory(res.data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📜 Lịch sử giao hàng</h1>
      <table className="w-full border-collapse border border-gray-200">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="p-2">Mã đơn</th>
            <th className="p-2">Địa chỉ giao</th>
            <th className="p-2">Trạng thái</th>
            <th className="p-2">Ngày hoàn tất</th>
          </tr>
        </thead>
        <tbody>
          {history.map((h) => (
            <tr key={h.tracking_code} className="text-center border-b">
              <td className="p-2">{h.tracking_code}</td>
              <td className="p-2">{h.delivery_address}</td>
              <td className="p-2">{h.status}</td>
              <td className="p-2">
                {new Date(h.completed_at).toLocaleString("vi-VN")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
