import { useEffect, useState } from "react";
import API from "../../services/api";
import toast from "react-hot-toast";

export default function AdminContacts() {
  const [contacts, setContacts] = useState([]);
  const [dispatchers, setDispatchers] = useState([]);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [selectedDispatcher, setSelectedDispatcher] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // 🔹 Load dữ liệu
  useEffect(() => {
    fetchContacts();
    fetchDispatchers();
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await API.get("/contact");
      setContacts(res.data);
      setFiltered(res.data);
    } catch {
      toast.error("❌ Lỗi khi tải danh sách liên hệ!");
    }
  };
  const fetchDispatchers = async () => {
    try {
      const res = await API.get("/users?role=dispatcher");
      setDispatchers(res.data);
    } catch (err) {
      toast.error("❌ Lỗi khi tải danh sách điều phối viên!");
    }
  };

  // 🔍 Tìm kiếm
  useEffect(() => {
    const keyword = search.toLowerCase();
    const result = contacts.filter((c) => {
      const name = c?.name?.toLowerCase() || "";
      const email = c?.email?.toLowerCase() || "";
      const message = c?.message?.toLowerCase() || "";
      return (
        name.includes(keyword) ||
        email.includes(keyword) ||
        message.includes(keyword)
      );
    });
    setFiltered(result);
    setCurrentPage(1);
  }, [search, contacts]);

  // 📦 Giao điều phối viên
  const handleAssign = async () => {
    if (!selectedDispatcher) {
      toast.error("Vui lòng chọn điều phối viên!");
      return;
    }

    try {
      await API.patch(`/contact/${selectedContact.id}/assign`, {
        dispatcher_id: selectedDispatcher,
      });
      toast.success("✅ Đã giao yêu cầu cho điều phối viên!");
      setShowAssignModal(false);
      setSelectedDispatcher("");
      fetchContacts();
    } catch {
      toast.error("❌ Lỗi khi giao điều phối viên!");
    }
  };

  // ⚙️ Logic phân trang
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentContacts = filtered.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-700">📞 Quản lý liên hệ</h1>
        <input
          type="text"
          placeholder="🔍 Tìm kiếm tên, email hoặc nội dung..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg px-3 py-2 w-80"
        />
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="w-full border-collapse border border-gray-200 text-sm">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3 text-left">Khách hàng</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Điện thoại</th>
              <th className="p-3 text-left">Nội dung</th>
              <th className="p-3 text-center">Trạng thái</th>
              <th className="p-3 text-center">Điều phối viên</th>
              <th className="p-3 text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {currentContacts.length ? (
              currentContacts.map((c) => (
                <tr key={c.id} className="border-b hover:bg-blue-50">
                  <td className="p-3 text-center">{c.id}</td>
                  <td className="p-3 font-semibold text-blue-700">{c.name}</td>
                  <td className="p-3">{c.email}</td>
                  <td className="p-3">{c.phone || "—"}</td>
                  <td className="p-3 truncate max-w-[250px]">{c.message}</td>
                  <td className="p-3 text-center">
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        c.status === "pending"
                          ? "bg-gray-100 text-gray-600"
                          : c.status === "approved"
                          ? "bg-blue-100 text-blue-700"
                          : c.status === "resolved"
                          ? "bg-green-100 text-green-700"
                          : ""
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    {c.assigned_name || (
                      <span className="text-gray-400 italic">Chưa giao</span>
                    )}
                  </td>
                  <td className="p-3 text-center space-x-2">
                    <button
                      onClick={() => {
                        setSelectedContact(c);
                        setShowDetailModal(true);
                      }}
                      className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-3 py-1 rounded"
                    >
                      👁️ Xem
                    </button>
                    {c.status === "pending" && (
                      <button
                        onClick={() => {
                          setSelectedContact(c);
                          setShowAssignModal(true);
                        }}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                      >
                        📤 Giao điều phối viên
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="8"
                  className="text-center p-6 text-gray-500 italic"
                >
                  Không có liên hệ nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 🔸 Pagination */}
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

      {/* 🧩 Modal Giao Điều Phối Viên */}
      {showAssignModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] space-y-3">
            <h2 className="text-lg font-bold text-blue-700 text-center">
              📤 Giao điều phối viên
            </h2>
            <p className="text-gray-600 text-center">
              Cho liên hệ: <strong>{selectedContact?.name}</strong>
            </p>

            <select
              className="w-full border p-2 rounded"
              value={selectedDispatcher}
              onChange={(e) => setSelectedDispatcher(e.target.value)}
            >
              <option value="">-- Chọn điều phối viên --</option>
              {dispatchers.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name} ({d.email})
                </option>
              ))}
            </select>

            <div className="flex gap-2 mt-4">
              <button
                onClick={handleAssign}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
              >
                Giao
              </button>
              <button
                onClick={() => setShowAssignModal(false)}
                className="flex-1 bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400"
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 👁️ Modal Chi tiết */}
      {showDetailModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[450px]">
            <h2 className="text-xl font-bold text-blue-700 text-center mb-3">
              📋 Chi tiết liên hệ
            </h2>
            <div className="space-y-2 text-sm text-gray-700">
              <p>
                <strong>Khách hàng:</strong> {selectedContact?.name}
              </p>
              <p>
                <strong>Email:</strong> {selectedContact?.email}
              </p>
              <p>
                <strong>Điện thoại:</strong> {selectedContact?.phone}
              </p>
              <p>
                <strong>Trạng thái:</strong> {selectedContact?.status}
              </p>
              <p>
                <strong>Ghi chú:</strong> {selectedContact?.note || "—"}
              </p>
              <p>
                <strong>Nội dung:</strong>
              </p>
              <div className="border rounded p-2 bg-gray-50 text-gray-600">
                {selectedContact?.message}
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowDetailModal(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
