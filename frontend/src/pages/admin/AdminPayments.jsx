import { useEffect, useState } from "react";
import API from "../../services/api";
import toast from "react-hot-toast";

export default function AdminPayments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🧾 Lấy danh sách thanh toán
  const fetchPayments = async () => {
    setLoading(true);
    try {
      const res = await API.get("/payments");
      setPayments(res.data);
    } catch {
      toast.error("❌ Lỗi khi tải danh sách thanh toán");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  // ✏️ Cập nhật trạng thái
  const handleUpdate = async (id, status) => {
    try {
      await API.put(`/payments/${id}`, { status });
      toast.success("✅ Đã cập nhật trạng thái");
      fetchPayments();
    } catch {
      toast.error("❌ Cập nhật thất bại");
    }
  };

  // 🗑️ Xóa thanh toán
  const handleDelete = async (id) => {
    if (confirm("Bạn có chắc muốn xóa thanh toán này không?")) {
      await API.delete(`/payments/${id}`);
      toast.success("🗑️ Đã xóa thanh toán");
      fetchPayments();
    }
  };

  if (loading)
    return <p className="p-6 text-gray-500 text-center">Đang tải dữ liệu...</p>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold text-blue-700">
        💳 Quản lý thanh toán
      </h1>

      <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
        <table className="w-full border-collapse text-sm">
          <thead className="bg-gradient-to-r from-blue-600 to-blue-500 text-white">
            <tr>
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">Mã vận đơn</th>
              <th className="p-3 text-left">Khách hàng</th>
              <th className="p-3 text-left">Số tiền</th>
              <th className="p-3 text-left">Phương thức</th>
              <th className="p-3 text-left">Trạng thái</th>
              <th className="p-3 text-left">Ngày tạo</th>
              <th className="p-3 text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {payments.length > 0 ? (
              payments.map((p, i) => (
                <tr
                  key={p.id}
                  className="border-b hover:bg-gray-50 transition duration-200"
                >
                  <td className="p-3">{i + 1}</td>
                  <td className="p-3 font-semibold text-blue-600">
                    {p.tracking_code || "—"}
                  </td>
                  <td className="p-3">{p.customer_name || "Không rõ"}</td>
                  <td className="p-3 font-semibold text-green-700">
                    {p.amount?.toLocaleString("vi-VN")} ₫
                  </td>
                  <td className="p-3">
                    {p.method?.toLowerCase() === "momo" ? (
                      <span className="text-pink-600 font-semibold">
                        Ví MoMo
                      </span>
                    ) : (
                      <span className="text-gray-700">Tiền mặt</span>
                    )}
                  </td>
                  <td className="p-3">
                    <select
                      value={p.status}
                      onChange={(e) => handleUpdate(p.id, e.target.value)}
                      className={`border rounded px-2 py-1 ${
                        p.status === "completed"
                          ? "text-green-600 border-green-400"
                          : p.status === "pending"
                          ? "text-yellow-600 border-yellow-400"
                          : "text-red-600 border-red-400"
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
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="8"
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
