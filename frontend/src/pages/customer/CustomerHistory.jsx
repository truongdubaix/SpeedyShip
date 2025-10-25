import { useEffect, useState } from "react";
import API from "../../services/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function CustomerHistory() {
  const [shipments, setShipments] = useState([]);
  const customerId =
    localStorage.getItem("customer_id") || localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    if (!customerId) return;
    API.get(`/customers/shipments/${customerId}`)
      .then((res) => setShipments(res.data))
      .catch(() => toast.error("Không thể tải lịch sử đơn hàng!"));
  }, [customerId]);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">
        🕓 Lịch sử đơn hàng của tôi
      </h2>
      {shipments.length === 0 ? (
        <p className="text-gray-500 text-center mt-10">
          Bạn chưa có đơn hàng nào.
        </p>
      ) : (
        <table className="w-full border-collapse border text-center shadow-md rounded-lg overflow-hidden">
          <thead className="bg-blue-100">
            <tr>
              <th className="border p-2">Mã đơn hàng</th>
              <th className="border p-2">Người nhận</th>
              <th className="border p-2">Trạng thái</th>
              <th className="border p-2">Ngày tạo</th>
              <th className="border p-2">Chi tiết</th>
            </tr>
          </thead>
          <tbody>
            {shipments.map((s) => (
              <tr key={s.id} className="border hover:bg-gray-50 transition">
                <td className="border p-2">{s.tracking_code}</td>
                <td className="border p-2">{s.receiver_name}</td>
                <td className="border p-2 text-blue-700 font-semibold">
                  {s.status}
                </td>
                <td className="border p-2">
                  {new Date(s.created_at).toLocaleString("vi-VN")}
                </td>
                <td className="border p-2">
                  <button
                    onClick={() => navigate(`/customer/history/${s.id}`)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Xem
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
