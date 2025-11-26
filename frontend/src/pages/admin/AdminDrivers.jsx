import { useEffect, useState } from "react";
import API from "../../services/api";
import toast from "react-hot-toast";

export default function AdminDrivers() {
  const [tab, setTab] = useState("drivers"); // drivers | applications

  const [drivers, setDrivers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showVehicleModal, setShowVehicleModal] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [editing, setEditing] = useState(null);

  // 👉 FORM CHỈ CHO SỬA name, email, phone, status
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    status: "available",
  });

  const [applications, setApplications] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // ===== FETCH DRIVERS =====
  const fetchDrivers = async () => {
    try {
      const res = await API.get("/drivers");
      setDrivers(res.data);
      setFiltered(res.data);
    } catch {
      toast.error("❌ Lỗi khi tải danh sách tài xế!");
    }
  };

  // ===== FETCH VEHICLES =====
  const fetchVehicles = async () => {
    try {
      const res = await API.get("/vehicles");
      setVehicles(res.data);
    } catch {
      toast.error("❌ Lỗi khi tải danh sách xe!");
    }
  };

  const fetchApplications = async () => {
    try {
      const res = await API.get("/drivers/applications");
      setApplications(res.data);
    } catch {
      toast.error("❌ Không tải được danh sách ứng viên!");
    }
  };

  useEffect(() => {
    fetchDrivers();
    fetchVehicles();
  }, []);

  useEffect(() => {
    if (tab === "applications") fetchApplications();
  }, [tab]);

  // ===== SEARCH =====
  useEffect(() => {
    const keyword = search.toLowerCase();
    const result = drivers.filter((d) => {
      const name = d?.name?.toLowerCase() || "";
      const email = d?.email?.toLowerCase() || "";
      return name.includes(keyword) || email.includes(keyword);
    });
    setFiltered(result);
    setCurrentPage(1);
  }, [search, drivers]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // ===== CREATE / UPDATE DRIVER =====
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

  // ===== DELETE =====
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

  // ===== CHANGE STATUS =====
  const handleStatusChange = async (id, status) => {
    try {
      await API.patch(`/drivers/${id}/status`, { status });
      toast.success("🔄 Đã cập nhật trạng thái!");
      fetchDrivers();
    } catch {
      toast.error("❌ Lỗi cập nhật trạng thái!");
    }
  };

  // ===== ASSIGN VEHICLE =====
  const handleAssignVehicle = async () => {
    if (!selectedVehicle) return toast.error("Vui lòng chọn xe!");

    try {
      await API.put(`/drivers/${selectedDriver}/vehicle`, {
        vehicle_id: selectedVehicle,
      });

      toast.success("🚗 Đã gán xe thành công!");
      setShowVehicleModal(false);
      setSelectedVehicle("");
      fetchDrivers();
    } catch {
      toast.error("❌ Lỗi khi gán xe!");
    }
  };

  const approveApplication = async (id) => {
    try {
      await API.post(`/drivers/applications/${id}/approve`);
      toast.success("✅ Đã duyệt hồ sơ!");
      fetchApplications();
      fetchDrivers();
    } catch {
      toast.error("❌ Lỗi khi duyệt!");
    }
  };

  const rejectApplication = async (id) => {
    try {
      await API.post(`/drivers/applications/${id}/reject`);
      toast.success("❌ Đã từ chối hồ sơ.");
      fetchApplications();
    } catch {
      toast.error("❌ Lỗi khi từ chối!");
    }
  };

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const currentDrivers = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-6 space-y-6">
      {/* TABS */}
      <div className="flex gap-4">
        <button
          onClick={() => setTab("drivers")}
          className={`px-4 py-2 rounded-lg font-semibold ${
            tab === "drivers"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          🚚 Danh sách tài xế
        </button>

        <button
          onClick={() => setTab("applications")}
          className={`px-4 py-2 rounded-lg font-semibold ${
            tab === "applications"
              ? "bg-green-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          📝 Duyệt đăng ký tài xế
        </button>
      </div>

      {/* TAB 1 – DRIVER LIST */}
      {tab === "drivers" && (
        <>
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-700">
              🚚 Quản lý tài xế
            </h1>
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

          {/* DRIVER TABLE */}
          <div className="overflow-x-auto bg-white rounded-xl shadow mt-4">
            <table className="w-full border-collapse border border-gray-200 text-sm">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="p-3">ID</th>
                  <th className="p-3">Họ tên</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">SĐT</th>
                  <th className="p-3">Xe</th>
                  <th className="p-3">Trạng thái</th>
                  <th className="p-3">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {currentDrivers.map((d) => (
                  <tr
                    key={d.id}
                    className="border-b hover:bg-blue-50 text-center"
                  >
                    <td className="p-3">{d.id}</td>
                    <td className="p-3 font-semibold text-blue-600">
                      {d.name}
                    </td>
                    <td className="p-3">{d.email}</td>
                    <td className="p-3">{d.phone}</td>
                    <td className="p-3">
                      {d.plate_no ? (
                        <span className="text-green-700 font-semibold">
                          {d.plate_no}
                        </span>
                      ) : (
                        <span className="text-gray-500 italic">Chưa gán</span>
                      )}
                    </td>
                    <td className="p-3">
                      <select
                        value={d.status}
                        onChange={(e) =>
                          handleStatusChange(d.id, e.target.value)
                        }
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
                      {/* GÁN XE */}
                      <button
                        onClick={() => {
                          setSelectedDriver(d.id);
                          setShowVehicleModal(true);
                        }}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                      >
                        🚗 Gán xe
                      </button>

                      {/* SỬA */}
                      <button
                        onClick={() => {
                          setForm({
                            name: d.name,
                            email: d.email,
                            phone: d.phone,
                            status: d.status,
                          });
                          setEditing(d.id);
                          setShowForm(true);
                        }}
                        className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
                      >
                        Sửa
                      </button>

                      {/* XÓA */}
                      <button
                        onClick={() => handleDelete(d.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* PAGINATION */}
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
        </>
      )}

      {/* TAB 2 – APPLICATIONS */}
      {tab === "applications" && (
        <div className="bg-white p-6 rounded-xl shadow mt-4">
          <h2 className="text-xl font-bold mb-4 text-green-700">
            📝 Hồ sơ đăng ký tài xế
          </h2>

          <table className="w-full border-collapse border border-gray-200 text-sm">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">Họ tên</th>
                <th className="p-3">SĐT</th>
                <th className="p-3">Email</th>
                <th className="p-3">Phương tiện</th>
                <th className="p-3">Biển số</th>
                <th className="p-3">Trạng thái</th>
                <th className="p-3">Thao tác</th>
              </tr>
            </thead>

            <tbody>
              {applications.map((app) => (
                <tr key={app.id} className="border-b text-center">
                  <td className="p-3">{app.id}</td>
                  <td className="p-3 font-semibold">{app.name}</td>
                  <td className="p-3">{app.phone}</td>
                  <td className="p-3">{app.email}</td>
                  <td className="p-3">{app.vehicle_type}</td>
                  <td className="p-3">{app.license_plate}</td>
                  <td className="p-3">
                    {app.status === "pending" && (
                      <span className="text-yellow-600 font-semibold">
                        Chờ duyệt
                      </span>
                    )}
                    {app.status === "approved" && (
                      <span className="text-green-600 font-semibold">
                        Đã duyệt
                      </span>
                    )}
                    {app.status === "rejected" && (
                      <span className="text-red-600 font-semibold">
                        Từ chối
                      </span>
                    )}
                  </td>

                  <td className="p-3 flex gap-2 justify-center">
                    {app.status === "pending" && (
                      <>
                        <button
                          onClick={() => approveApplication(app.id)}
                          className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                        >
                          ✅ Duyệt
                        </button>
                        <button
                          onClick={() => rejectApplication(app.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                          ❌ Từ chối
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* VEHICLE ASSIGN MODAL */}
      {showVehicleModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-[400px] space-y-3 shadow-lg">
            <h2 className="text-lg font-bold text-center text-blue-700">
              🚗 Gán xe cho tài xế #{selectedDriver}
            </h2>

            <select
              className="w-full border p-2 rounded"
              value={selectedVehicle}
              onChange={(e) => setSelectedVehicle(e.target.value)}
            >
              <option value="">-- Chọn xe --</option>
              {vehicles.map((v, index) => (
                <option key={`${v.id}-${index}`} value={v.id}>
                  {v.plate_no} ({v.type}) - {v.status}
                </option>
              ))}
            </select>

            <div className="flex gap-2 mt-4">
              <button
                onClick={handleAssignVehicle}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded"
              >
                Lưu
              </button>

              <button
                onClick={() => setShowVehicleModal(false)}
                className="flex-1 bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400"
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FORM THÊM / SỬA */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg shadow-lg w-[400px] space-y-3"
          >
            <h2 className="text-xl font-bold text-center text-blue-600">
              {editing ? "✏️ Sửa tài xế" : "➕ Thêm tài xế"}
            </h2>

            {/* CHỈ 3 INPUT: NAME, EMAIL, PHONE */}
            {["name", "email", "phone"].map((field) => (
              <input
                key={field}
                name={field}
                placeholder={
                  field === "name"
                    ? "Họ tên"
                    : field === "email"
                    ? "Email"
                    : "Số điện thoại"
                }
                value={form[field]}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
            ))}

            {/* SELECT STATUS */}
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
