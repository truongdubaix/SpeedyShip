import { useEffect, useState } from "react";
import API from "../../services/api";
import toast from "react-hot-toast";

export default function AdminCustomer() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  // 📦 Lấy danh sách khách hàng
  const fetchCustomers = async () => {
    try {
      const res = await API.get("/admin/customers");
      setCustomers(res.data);
    } catch (err) {
      console.error(err);
      toast.error("❌ Lỗi tải danh sách khách hàng");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // 🔄 Khóa / Mở tài khoản
  const handleToggle = async (id, status) => {
    try {
      await API.put(`/admin/customers/${id}`, {
        status: status === "Hoạt động" ? "Khóa" : "Hoạt động",
      });
      toast.success("✅ Cập nhật trạng thái thành công");
      fetchCustomers();
    } catch {
      toast.error("❌ Không thể cập nhật trạng thái");
    }
  };

  // 🗑️ Xóa khách hàng
  const handleDelete = async (id) => {
    if (!confirm("Bạn có chắc muốn xóa khách hàng này không?")) return;
    try {
      await API.delete(`/admin/customers/${id}`);
      toast.success("🗑️ Đã xóa khách hàng");
      fetchCustomers();
    } catch {
      toast.error("❌ Xóa thất bại");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <span className="ml-3 text-blue-600 font-semibold">
          Đang tải dữ liệu...
        </span>
      </div>
    );

  return (
    <div className="bg-white p-8 rounded-xl shadow">
      <h1 className="text-2xl font-bold text-gray-700 mb-6">
        👥 Quản lý khách hàng
      </h1>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Họ tên</th>
              <th className="p-3">Email</th>
              <th className="p-3">Số điện thoại</th>
              <th className="p-3">Số đơn hàng</th>
              <th className="p-3">Trạng thái</th>
              <th className="p-3 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr
                key={c.id}
                className="border-b hover:bg-blue-50 transition text-gray-700"
              >
                <td className="p-3 font-semibold">{c.id}</td>
                <td className="p-3">{c.name}</td>
                <td className="p-3">{c.email}</td>
                <td className="p-3">{c.phone}</td>
                <td className="p-3">{c.total_orders || 0}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-white text-xs ${
                      c.status === "Hoạt động" ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    {c.status}
                  </span>
                </td>
                <td className="p-3 flex gap-2 justify-center">
                  <button
                    onClick={() => handleToggle(c.id, c.status)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                  >
                    {c.status === "Hoạt động" ? "Khóa" : "Mở"}
                  </button>
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
            {customers.length === 0 && (
              <tr>
                <td
                  colSpan="7"
                  className="text-center text-gray-500 py-6 italic"
                >
                  Không có khách hàng nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
