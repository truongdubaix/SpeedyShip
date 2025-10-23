import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import API from "../../services/api";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [search, setSearch] = useState("");

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

  // 🔹 Lấy danh sách vai trò (từ bảng roles)
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

  // 🔹 Cập nhật quyền hoặc trạng thái người dùng
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

  return (
    <div className="p-6 space-y-6">
      {/* Tiêu đề và ô tìm kiếm */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-700">
          👥 Quản lý người dùng
        </h1>
        <input
          type="text"
          placeholder="🔍 Tìm theo tên hoặc email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg px-3 py-2 w-72"
        />
      </div>

      {/* Bảng danh sách người dùng */}
      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="w-full border-collapse border border-gray-200 text-sm">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Họ tên</th>
              <th className="p-3">Email</th>
              <th className="p-3">Vai trò</th>
              <th className="p-3">Trạng thái</th>
              <th className="p-3">Ngày tạo</th>
              <th className="p-3">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((u) => (
                <tr
                  key={u.id}
                  className="border-b hover:bg-blue-50 transition text-gray-700"
                >
                  <td className="p-3 text-center">{u.id}</td>
                  <td className="p-3 font-semibold text-blue-600">{u.name}</td>
                  <td className="p-3">{u.email}</td>

                  {/* Dropdown chọn role */}
                  <td className="p-3 text-center">
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

                  {/* Dropdown chọn trạng thái */}
                  <td className="p-3 text-center">
                    <select
                      value={u.status}
                      onChange={(e) =>
                        handleUpdate(u.id, "status", e.target.value)
                      }
                      className={`border rounded px-2 py-1 ${
                        u.status === "active"
                          ? "text-green-600"
                          : "text-gray-500"
                      }`}
                    >
                      <option value="active">Hoạt động</option>
                      <option value="inactive">Vô hiệu hóa</option>
                    </select>
                  </td>

                  <td className="p-3 text-gray-500 text-center">
                    {new Date(u.created_at).toLocaleString("vi-VN")}
                  </td>

                  <td className="p-3 text-center">
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
    </div>
  );
}
