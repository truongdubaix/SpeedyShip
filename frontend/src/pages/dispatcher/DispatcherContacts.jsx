import { useEffect, useState } from "react";
import API from "../../services/api";
import { PhoneCall, CheckCircle, RefreshCcw, X } from "lucide-react";
import toast from "react-hot-toast";

export default function DispatcherContacts() {
  const [contacts, setContacts] = useState([]);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [note, setNote] = useState("");
  const dispatcherId = localStorage.getItem("userId");

  // 🧭 Load dữ liệu khi mở trang
  useEffect(() => {
    fetchMyContacts();
  }, []);

  const fetchMyContacts = async () => {
    try {
      const res = await API.get(`/contact/dispatcher/${dispatcherId}`);
      setContacts(res.data);
    } catch {
      toast.error("❌ Lỗi khi tải danh sách liên hệ!");
    }
  };

  // 📝 Mở modal ghi chú
  const openNoteModal = (id) => {
    setSelectedId(id);
    setShowNoteModal(true);
  };

  const closeNoteModal = () => {
    setShowNoteModal(false);
    setSelectedId(null);
    setNote("");
  };

  // 💾 Lưu ghi chú + cập nhật trạng thái
  const submitNote = async () => {
    if (!note.trim()) {
      toast.error("Vui lòng nhập ghi chú trước khi xác nhận!");
      return;
    }

    try {
      await API.patch(`/contact/${selectedId}/status`, {
        status: "resolved",
        note,
      });
      toast.success("✅ Đã xác nhận xử lý và gửi email cảm ơn!");
      closeNoteModal();
      fetchMyContacts();
    } catch (err) {
      console.error(err);
      toast.error("Không thể cập nhật trạng thái!");
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-700">
          📞 Liên hệ được giao cho tôi
        </h1>
        <button
          onClick={fetchMyContacts}
          className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition font-medium shadow-sm"
        >
          <RefreshCcw size={16} /> Tải lại
        </button>
      </div>

      {/* BẢNG LIÊN HỆ */}
      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="w-full border-collapse border border-gray-200 text-sm">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3 text-left">Khách hàng</th>
              <th className="p-3 text-left">SĐT</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Nội dung</th>
              <th className="p-3 text-center">Trạng thái</th>
              <th className="p-3 text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {contacts.length ? (
              contacts.map((c) => (
                <tr key={c.id} className="border-b hover:bg-blue-50">
                  <td className="p-3 font-semibold text-blue-700">{c.name}</td>
                  <td className="p-3">{c.phone}</td>
                  <td className="p-3">{c.email}</td>
                  <td className="p-3 truncate max-w-[250px]">{c.message}</td>
                  <td className="p-3 text-center">
                    <span
                      className={`px-2 py-1 rounded text-sm font-medium ${
                        c.status === "approved"
                          ? "bg-blue-100 text-blue-700"
                          : c.status === "resolved"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td className="p-3 text-center flex justify-center gap-2">
                    {c.status !== "resolved" ? (
                      <>
                        <a
                          href={`tel:${c.phone}`}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded flex items-center gap-1 transition"
                        >
                          <PhoneCall size={16} /> Gọi
                        </a>
                        <button
                          onClick={() => openNoteModal(c.id)}
                          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded flex items-center gap-1 transition"
                        >
                          <CheckCircle size={16} /> Xử lý
                        </button>
                      </>
                    ) : (
                      <span className="text-green-600 font-semibold">
                        ✅ Đã xử lý
                      </span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center p-6 text-gray-500 italic"
                >
                  Không có yêu cầu nào được giao
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 📝 MODAL GHI CHÚ */}
      {showNoteModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-[400px] relative">
            <button
              onClick={closeNoteModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              <X size={20} />
            </button>

            <h2 className="text-lg font-bold text-blue-700 mb-3 text-center">
              📝 Ghi chú xử lý yêu cầu
            </h2>

            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={4}
              className="w-full border rounded p-2 focus:outline-none focus:ring focus:ring-blue-300 text-gray-700"
              placeholder="Nhập nội dung ghi chú... (vd: Đã gọi khách hàng và hỗ trợ xong)"
            ></textarea>

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={closeNoteModal}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              >
                Hủy
              </button>
              <button
                onClick={submitNote}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Lưu & Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
