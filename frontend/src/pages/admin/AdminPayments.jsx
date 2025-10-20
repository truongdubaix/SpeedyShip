import { useEffect, useState } from "react";
import API from "../../services/api";
import toast from "react-hot-toast";

export default function AdminPayments() {
  const [payments, setPayments] = useState([]);

  const fetchPayments = async () => {
    try {
      const res = await API.get("/payments");
      setPayments(res.data);
    } catch {
      toast.error("❌ Lỗi khi tải danh sách thanh toán");
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const handleUpdate = async (id, status) => {
    try {
      await API.put(`/payments/${id}`, { status });
      toast.success("✅ Đã cập nhật trạng thái");
      fetchPayments();
    } catch {
      toast.error("❌ Cập nhật thất bại");
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Bạn có chắc muốn xóa thanh toán này không?")) {
      await API.delete(`/payments/${id}`);
      toast.success("🗑️ Đã xóa thanh toán");
      fetchPayments();
    }
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold text-gray-700">
        💳 Quản lý thanh toán
      </h1>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full border-collapse border border-gray-200 text-sm">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3">Mã vận đơn</th>
              <th className="p-3">Khách hàng</th>
              <th className="p-3">Số tiền</th>
              <th className="p-3">Phương thức</th>
              <th className="p-3">Trạng thái</th>
              <th className="p-3">Ngày tạo</th>
              <th className="p-3">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p) => (
              <tr key={p.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{p.tracking_code}</td>
                <td className="p-3">{p.customer_name}</td>
                <td className="p-3">{p.amount.toLocaleString()} ₫</td>
                <td className="p-3">
                  {p.method === "COD"
                    ? "Thanh toán khi nhận hàng"
                    : p.method === "Momo"
                    ? "Ví Momo"
                    : "Chuyển khoản"}
                </td>
                <td className="p-3">
                  <select
                    value={p.status}
                    onChange={(e) => handleUpdate(p.id, e.target.value)}
                    className={`border rounded px-2 py-1 ${
                      p.status === "completed"
                        ? "text-green-600"
                        : p.status === "pending"
                        ? "text-yellow-500"
                        : "text-red-500"
                    }`}
                  >
                    <option value="pending">Đang xử lý</option>
                    <option value="completed">Hoàn tất</option>
                    <option value="failed">Thất bại</option>
                  </select>
                </td>
                <td className="p-3 text-gray-500">
                  {new Date(p.created_at).toLocaleString("vi-VN")}
                </td>
                <td className="p-3 text-center">
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
            {payments.length === 0 && (
              <tr>
                <td
                  colSpan="7"
                  className="p-6 text-center text-gray-500 italic"
                >
                  Không có dữ liệu thanh toán
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
