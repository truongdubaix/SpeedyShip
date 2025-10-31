import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import API from "../../services/api";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // 🔹 Lấy danh sách người dùng
  const fetchUsers = async () => {
    try {
      const res = await API.get("/users");
      setUsers(res.data);
    } catch (err) {
      toast.error("❌ Lỗi khi tải danh sách người dùng!");
      console.error(err);
    }
  };

  // 🔹 Lấy danh sách vai trò
  const fetchRoles = async () => {
    try {
      const res = await API.get("/roles");
      setRoles(res.data);
    } catch (err) {
      console.error("❌ Lỗi khi tải vai trò:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  // 🔹 Cập nhật quyền hoặc trạng thái
  const handleUpdate = async (id, field, value) => {
    try {
      const payload =
        field === "role_id"
          ? { role_id: value }
          : field === "status"
          ? { status: value }
          : {};

      await API.put(`/users/${id}`, payload);
      toast.success("✅ Cập nhật thành công!");
      fetchUsers();
    } catch (err) {
      toast.error("❌ Cập nhật thất bại!");
      console.error(err);
    }
  };

  // 🔹 Xóa người dùng
  const handleDelete = async (id) => {
    if (confirm("Bạn có chắc muốn xóa người dùng này không?")) {
      try {
        await API.delete(`/users/${id}`);
        toast.success("🗑️ Đã xóa người dùng!");
        fetchUsers();
      } catch {
        toast.error("❌ Xóa thất bại!");
      }
    }
  };

  // 🔍 Lọc danh sách theo từ khóa tìm kiếm
  const filteredUsers = users.filter((u) => {
    const keyword = search.toLowerCase();
    return (
      u.name?.toLowerCase().includes(keyword) ||
      u.email?.toLowerCase().includes(keyword)
    );
  });

  // 🔢 Phân trang
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentUsers = filteredUsers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Reset về trang đầu khi tìm kiếm
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  return (
    <div className="p-6 space-y-6">
      {/* Tiêu đề và ô tìm kiếm */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-700">
          👥 Quản lý người dùng
        </h1>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="🔍 Tìm theo tên hoặc email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-lg px-3 py-2 w-72"
          />
          <span className="text-sm text-gray-500">
            Tổng: <b>{filteredUsers.length}</b> người
          </span>
        </div>
      </div>

      {/* Bảng danh sách người dùng */}
      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="w-full border-collapse border border-gray-200 text-sm">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3">#</th>
              <th className="p-3">Họ tên</th>
              <th className="p-3">Email</th>
              <th className="p-3">Vai trò</th>
              <th className="p-3">Trạng thái</th>
              <th className="p-3">Ngày tạo</th>
              <th className="p-3">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.length > 0 ? (
              currentUsers.map((u, index) => (
                <tr
                  key={u.id}
                  className="border-b hover:bg-blue-50 transition text-gray-700 text-center"
                >
                  <td className="p-3">{startIndex + index + 1}</td>
                  <td className="p-3 font-semibold text-blue-600 text-left">
                    {u.name}
                  </td>
                  <td className="p-3 text-left">{u.email}</td>
                  <td className="p-3">
                    <select
                      value={u.role_id}
                      onChange={(e) =>
                        handleUpdate(u.id, "role_id", e.target.value)
                      }
                      className="border rounded px-2 py-1"
                    >
                      {roles.map((r) => (
                        <option key={r.id} value={r.id}>
                          {r.name}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="p-3">
                    <select
                      value={u.status}
                      onChange={(e) =>
                        handleUpdate(u.id, "status", e.target.value)
                      }
                      className={`border rounded px-2 py-1 ${
                        u.status === "active"
                          ? "text-green-600 border-green-400"
                          : "text-gray-500 border-gray-300"
                      }`}
                    >
                      <option value="active">Hoạt động</option>
                      <option value="inactive">Vô hiệu hóa</option>
                    </select>
                  </td>
                  <td className="p-3 text-gray-500">
                    {new Date(u.created_at).toLocaleString("vi-VN")}
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => handleDelete(u.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="p-6 text-center text-gray-500 italic"
                >
                  Không có người dùng nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 🔸 PHÂN TRANG */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-4 text-sm">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className={`px-4 py-2 rounded border ${
              currentPage === 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white hover:bg-gray-100 text-gray-700"
            }`}
          >
            ← Trước
          </button>

          <span className="text-gray-700 font-medium">
            Trang {currentPage}/{totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className={`px-4 py-2 rounded border ${
              currentPage === totalPages
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white hover:bg-gray-100 text-gray-700"
            }`}
          >
            Sau →
          </button>
        </div>
      )}
    </div>
  );
}
