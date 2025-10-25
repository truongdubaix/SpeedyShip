import { useEffect, useState } from "react";
import API from "../../services/api";
import toast from "react-hot-toast";

export default function AdminFeedbacks() {
  const [feedbacks, setFeedbacks] = useState([]);

  const fetchFeedbacks = async () => {
    try {
      const res = await API.get("/feedbacks");
      setFeedbacks(res.data);
    } catch {
      toast.error("❌ Lỗi tải danh sách feedback");
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Bạn có chắc muốn xóa feedback này không?")) {
      await API.delete(`/feedbacks/${id}`);
      toast.success("🗑️ Đã xóa feedback");
      fetchFeedbacks();
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  return (
    <div className="p-6 bg-white shadow rounded-xl">
      <h1 className="text-2xl font-bold text-gray-700 mb-4">
        💬 Quản lý đánh giá khách hàng
      </h1>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-gray-200">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3">Khách hàng</th>
              <th className="p-3">Mã đơn hàng</th>
              <th className="p-3">Đánh giá</th>
              <th className="p-3">Nội dung</th>
              <th className="p-3">Ngày</th>
              <th className="p-3">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map((f) => (
              <tr key={f.id} className="border-b hover:bg-gray-50">
                <td className="p-3 font-semibold">{f.customer_name}</td>
                <td className="p-3">{f.tracking_code}</td>
                <td className="p-3 text-yellow-500">⭐ {f.rating}</td>
                <td className="p-3">{f.content}</td>
                <td className="p-3 text-gray-500">
                  {new Date(f.created_at).toLocaleString("vi-VN")}
                </td>
                <td className="p-3 text-center">
                  <button
                    onClick={() => handleDelete(f.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
            {feedbacks.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  className="text-center text-gray-500 italic p-4"
                >
                  Không có feedback nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
