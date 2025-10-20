import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import API from "../../services/api";

export default function AdminShipments() {
  const [shipments, setShipments] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    tracking_code: "",
    sender_name: "",
    sender_phone: "",
    receiver_name: "",
    receiver_phone: "",
    pickup_address: "",
    delivery_address: "",
    weight_kg: "",
    cod_amount: "",
    status: "pending",
    current_location: "",
  });

  const [page, setPage] = useState(1);
  const perPage = 10;
  const totalPages = Math.ceil(filtered.length / perPage);

  // 🔹 Lấy danh sách đơn hàng
  const fetchShipments = async () => {
    try {
      const res = await API.get("/shipments");
      setShipments(res.data);
      setFiltered(res.data);
    } catch (err) {
      toast.error("❌ Lỗi khi tải danh sách đơn hàng!");
    }
  };

  useEffect(() => {
    fetchShipments();
  }, []);

  // 🔍 Lọc theo từ khóa
  useEffect(() => {
    const keyword = search.toLowerCase();
    const filteredData = shipments.filter(
      (s) =>
        s.tracking_code?.toLowerCase().includes(keyword) ||
        s.sender_name?.toLowerCase().includes(keyword) ||
        s.receiver_name?.toLowerCase().includes(keyword)
    );
    setFiltered(filteredData);
    setPage(1);
  }, [search, shipments]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // ➕ Thêm hoặc sửa
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await API.put(`/shipments/${editing}`, form);
        toast.success("✏️ Cập nhật đơn hàng thành công!");
      } else {
        await API.post("/shipments", form);
        toast.success("✅ Thêm đơn hàng thành công!");
      }
      setShowForm(false);
      setEditing(null);
      fetchShipments();
    } catch {
      toast.error("❌ Lỗi khi lưu đơn hàng!");
    }
  };

  // ❌ Xóa đơn hàng
  const handleDelete = async (id) => {
    if (confirm("Bạn có chắc muốn xóa đơn hàng này không?")) {
      try {
        await API.delete(`/shipments/${id}`);
        toast.success("🗑️ Đã xóa đơn hàng!");
        fetchShipments();
      } catch {
        toast.error("❌ Xóa thất bại!");
      }
    }
  };

  // 🔄 Cập nhật trạng thái nhanh
  const handleStatusChange = async (id, newStatus) => {
    try {
      await API.patch(`/shipments/${id}/status`, { status: newStatus });
      toast.success("🔄 Cập nhật trạng thái thành công!");
      fetchShipments();
    } catch {
      toast.error("❌ Lỗi khi cập nhật trạng thái!");
    }
  };

  const paginatedData = filtered.slice((page - 1) * perPage, page * perPage);

  // 🇻🇳 Dịch trạng thái
  const translateStatus = (status) => {
    switch (status) {
      case "pending":
        return "Chờ xử lý";
      case "delivering":
        return "Đang giao hàng";
      case "delivered":
        return "Đã giao";
      case "failed":
        return "Giao thất bại";
      case "canceled":
        return "Đã hủy";
      default:
        return "Không xác định";
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-700 flex items-center gap-2">
          📦 Quản lý đơn hàng
        </h1>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="🔍 Tìm theo mã, người gửi, người nhận..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-lg px-3 py-2 w-72"
          />
          <button
            onClick={() => {
              setForm({
                tracking_code: "",
                sender_name: "",
                sender_phone: "",
                receiver_name: "",
                receiver_phone: "",
                pickup_address: "",
                delivery_address: "",
                weight_kg: "",
                cod_amount: "",
                status: "pending",
                current_location: "",
              });
              setEditing(null);
              setShowForm(true);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow"
          >
            + Thêm đơn hàng
          </button>
        </div>
      </div>

      {/* Bảng danh sách đầy đủ */}
      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="w-full border-collapse border border-gray-200 text-sm">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3">Mã</th>
              <th className="p-3">Người gửi</th>
              <th className="p-3">SĐT gửi</th>
              <th className="p-3">Người nhận</th>
              <th className="p-3">SĐT nhận</th>
              <th className="p-3">Địa chỉ gửi</th>
              <th className="p-3">Địa chỉ nhận</th>
              <th className="p-3">Khối lượng (kg)</th>
              <th className="p-3">COD (₫)</th>
              <th className="p-3">Trạng thái</th>
              <th className="p-3">Vị trí hiện tại</th>
              <th className="p-3">Ngày tạo</th>
              <th className="p-3">Thao tác</th>
            </tr>
          </thead>

          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((s) => (
                <tr
                  key={s.id}
                  className="border-b hover:bg-blue-50 transition text-gray-700"
                >
                  <td className="p-3 font-semibold text-blue-600">
                    {s.tracking_code}
                  </td>
                  <td className="p-3">{s.sender_name}</td>
                  <td className="p-3">{s.sender_phone}</td>
                  <td className="p-3">{s.receiver_name}</td>
                  <td className="p-3">{s.receiver_phone}</td>
                  <td className="p-3 max-w-[180px] truncate">
                    {s.pickup_address}
                  </td>
                  <td className="p-3 max-w-[180px] truncate">
                    {s.delivery_address}
                  </td>
                  <td className="p-3 text-center">{s.weight_kg}</td>
                  <td className="p-3 text-right">
                    {Number(s.cod_amount).toLocaleString("vi-VN")}
                  </td>
                  <td
                    className={`p-3 font-semibold ${
                      s.status === "pending"
                        ? "text-yellow-500"
                        : s.status === "delivering"
                        ? "text-blue-500"
                        : s.status === "delivered"
                        ? "text-green-600"
                        : "text-gray-500"
                    }`}
                  >
                    {translateStatus(s.status)}
                  </td>
                  <td className="p-3">{s.current_location}</td>
                  <td className="p-3 text-gray-500 text-center">
                    {new Date(s.created_at).toLocaleString("vi-VN")}
                  </td>
                  <td className="p-3 flex gap-2 justify-center">
                    <button
                      onClick={() => {
                        setForm(s);
                        setEditing(s.id);
                        setShowForm(true);
                      }}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDelete(s.id)}
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
                  colSpan="13"
                  className="p-6 text-center text-gray-500 italic"
                >
                  Không có đơn hàng nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 📄 Thanh phân trang */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 mt-4">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            ← Trước
          </button>
          <span>
            Trang {page}/{totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Sau →
          </button>
        </div>
      )}

      {/* 📋 Modal thêm/sửa */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg shadow-xl w-[420px] space-y-3"
          >
            <h2 className="text-xl font-bold text-center mb-3 text-purple-600">
              {editing ? "✏️ Sửa đơn hàng" : "➕ Thêm đơn hàng mới"}
            </h2>

            {[
              ["tracking_code", "Mã vận đơn"],
              ["sender_name", "Tên người gửi"],
              ["sender_phone", "SĐT người gửi"],
              ["receiver_name", "Tên người nhận"],
              ["receiver_phone", "SĐT người nhận"],
              ["pickup_address", "Địa chỉ gửi"],
              ["delivery_address", "Địa chỉ nhận"],
              ["weight_kg", "Khối lượng (kg)"],
              ["cod_amount", "Tiền thu hộ (COD)"],
              ["current_location", "Vị trí hiện tại"],
            ].map(([name, label]) => (
              <input
                key={name}
                type="text"
                name={name}
                placeholder={label}
                value={form[name]}
                onChange={handleChange}
                className="w-full border p-2 rounded text-sm"
              />
            ))}

            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full border p-2 rounded text-sm"
            >
              <option value="pending">Chờ xử lý</option>
              <option value="delivering">Đang giao hàng</option>
              <option value="delivered">Đã giao</option>
              <option value="failed">Giao thất bại</option>
              <option value="canceled">Đã hủy</option>
            </select>

            <div className="flex gap-2 mt-4">
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
