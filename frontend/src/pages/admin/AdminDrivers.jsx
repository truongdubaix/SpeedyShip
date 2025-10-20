import { useEffect, useState } from "react";
import API from "../../services/api";
import toast from "react-hot-toast";

export default function AdminDrivers() {
  const [drivers, setDrivers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    license_no: "",
    vehicle_type: "",
    status: "available",
  });

  // 🔹 Lấy dữ liệu tài xế
  const fetchDrivers = async () => {
    try {
      const res = await API.get("/drivers");
      setDrivers(res.data);
      setFiltered(res.data);
    } catch {
      toast.error("❌ Lỗi khi tải danh sách tài xế!");
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  // 🔍 Tìm kiếm
  useEffect(() => {
    const keyword = search.toLowerCase();
    const result = drivers.filter((d) => {
      const name = d?.name?.toLowerCase() || "";
      const email = d?.email?.toLowerCase() || "";
      return name.includes(keyword) || email.includes(keyword);
    });
    setFiltered(result);
  }, [search, drivers]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await API.put(`/drivers/${editing}`, form);
        toast.success("✏️ Cập nhật thành công!");
      } else {
        await API.post("/drivers", form);
        toast.success("✅ Thêm tài xế thành công!");
      }
      setShowForm(false);
      setEditing(null);
      fetchDrivers();
    } catch {
      toast.error("❌ Lỗi khi lưu tài xế!");
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Bạn có chắc muốn xóa tài xế này không?")) {
      try {
        await API.delete(`/drivers/${id}`);
        toast.success("🗑️ Đã xóa tài xế!");
        fetchDrivers();
      } catch {
        toast.error("❌ Xóa thất bại!");
      }
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await API.patch(`/drivers/${id}/status`, { status });
      toast.success("🔄 Đã cập nhật trạng thái!");
      fetchDrivers();
    } catch {
      toast.error("❌ Lỗi cập nhật trạng thái!");
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-700">🚚 Quản lý tài xế</h1>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="🔍 Tìm theo tên hoặc email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-lg px-3 py-2 w-72"
          />
          <button
            onClick={() => {
              setForm({
                name: "",
                email: "",
                phone: "",
                license_no: "",
                vehicle_type: "",
                status: "available",
              });
              setEditing(null);
              setShowForm(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
          >
            + Thêm tài xế
          </button>
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="w-full border-collapse border border-gray-200 text-sm">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Họ tên</th>
              <th className="p-3">Email</th>
              <th className="p-3">SĐT</th>
              <th className="p-3">Biển số</th>
              <th className="p-3">Loại xe</th>
              <th className="p-3">Trạng thái</th>
              <th className="p-3">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length ? (
              filtered.map((d) => (
                <tr key={d.id} className="border-b hover:bg-blue-50">
                  <td className="p-3 text-center">{d.id}</td>
                  <td className="p-3 font-semibold text-blue-600">{d.name}</td>
                  <td className="p-3">{d.email}</td>
                  <td className="p-3">{d.phone}</td>
                  <td className="p-3">{d.license_no}</td>
                  <td className="p-3">{d.vehicle_type}</td>
                  <td className="p-3">
                    <select
                      value={d.status}
                      onChange={(e) => handleStatusChange(d.id, e.target.value)}
                      className={`border rounded px-2 py-1 ${
                        d.status === "available"
                          ? "text-green-600"
                          : d.status === "delivering"
                          ? "text-blue-600"
                          : "text-gray-500"
                      }`}
                    >
                      <option value="available">Đang rảnh</option>
                      <option value="delivering">Đang giao hàng</option>
                      <option value="inactive">Tạm nghỉ</option>
                    </select>
                  </td>
                  <td className="p-3 flex gap-2 justify-center">
                    <button
                      onClick={() => {
                        setForm(d);
                        setEditing(d.id);
                        setShowForm(true);
                      }}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDelete(d.id)}
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
                  colSpan="8"
                  className="text-center p-6 text-gray-500 italic"
                >
                  Không có tài xế nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Form thêm/sửa */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg shadow-lg w-[400px] space-y-3"
          >
            <h2 className="text-xl font-bold text-center text-blue-600">
              {editing ? "✏️ Sửa tài xế" : "➕ Thêm tài xế"}
            </h2>
            {["name", "email", "phone", "license_no", "vehicle_type"].map(
              (field) => (
                <input
                  key={field}
                  name={field}
                  placeholder={
                    field === "name"
                      ? "Họ tên"
                      : field === "email"
                      ? "Email"
                      : field === "phone"
                      ? "Số điện thoại"
                      : field === "license_no"
                      ? "Biển số xe"
                      : "Loại xe"
                  }
                  value={form[field]}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  required={field !== "phone"}
                />
              )
            )}
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            >
              <option value="available">Đang rảnh</option>
              <option value="delivering">Đang giao hàng</option>
              <option value="inactive">Tạm nghỉ</option>
            </select>
            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-blue-600 text-white flex-1 py-2 rounded hover:bg-blue-700"
              >
                Lưu
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-gray-300 text-gray-700 flex-1 py-2 rounded hover:bg-gray-400"
              >
                Hủy
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
