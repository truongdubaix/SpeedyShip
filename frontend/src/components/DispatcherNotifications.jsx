import { useEffect, useState } from "react";
import { Bell, Package } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import API from "../services/api";
import { io } from "socket.io-client";

// ⚡ Kết nối socket
const socket = io("http://localhost:5000", { transports: ["websocket"] });

export default function DispatcherNotifications({ dispatcherId }) {
  const [show, setShow] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [hasNew, setHasNew] = useState(false);

  // 🧾 Lấy danh sách thông báo dispatcher
  const fetchNotifications = async () => {
    try {
      const res = await API.get(`/notifications/dispatcher/${dispatcherId}`);
      setNotifications(res.data);
    } catch (err) {
      console.error("❌ Lỗi khi tải thông báo dispatcher:", err);
    }
  };

  // ⚡ Khi mở dropdown → load thông báo
  useEffect(() => {
    if (show && dispatcherId) fetchNotifications();
  }, [show, dispatcherId]);

  // 🔔 Đăng ký socket realtime
  useEffect(() => {
    if (!dispatcherId) return;

    socket.emit("joinDispatcher");

    socket.on("newDispatcherNotification", (notif) => {
      setHasNew(true);
      setNotifications((prev) => [
        {
          id: Date.now(),
          message: notif.message,
          is_read: 0,
          created_at: notif.created_at,
        },
        ...prev,
      ]);
    });

    return () => socket.off("newDispatcherNotification");
  }, [dispatcherId]);

  // 🔘 Đánh dấu đã đọc
  const markAsRead = async (id) => {
    try {
      await API.put(`/notifications/${id}/read`);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, is_read: 1 } : n))
      );
    } catch (err) {
      console.error("❌ Lỗi khi đánh dấu đã đọc:", err);
    }
  };

  return (
    <div className="relative select-none">
      {/* 🔔 Nút chuông */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        animate={hasNew ? { rotate: [0, -15, 15, -15, 15, 0] } : {}}
        transition={{ duration: 0.6 }}
        onClick={() => {
          setShow(!show);
          setHasNew(false);
        }}
        className="relative bg-white border rounded-full p-2 shadow hover:bg-gray-100"
      >
        <Bell className="text-orange-600 w-6 h-6" />
        {notifications.some((n) => !n.is_read) && (
          <motion.span
            layoutId="dot"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full"
          />
        )}
      </motion.button>

      {/* 📜 Panel thông báo */}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="absolute right-0 mt-2 w-80 bg-white border rounded-xl shadow-2xl overflow-hidden z-10"
          >
            <div className="p-3 border-b font-semibold text-orange-700 bg-orange-50 flex justify-between items-center">
              <span>📦 Thông báo điều phối viên</span>
              <button
                onClick={fetchNotifications}
                className="text-xs text-orange-600 hover:underline"
              >
                Làm mới
              </button>
            </div>

            <div className="max-h-80 overflow-y-auto">
              {notifications.length > 0 ? (
                notifications.map((n) => (
                  <motion.div
                    key={n.id}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => markAsRead(n.id)}
                    className={`p-3 border-b cursor-pointer transition-all ${
                      n.is_read
                        ? "bg-gray-50 hover:bg-gray-100"
                        : "bg-orange-50 hover:bg-orange-100"
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <Package
                        className={`w-5 h-5 ${
                          n.is_read ? "text-gray-400" : "text-orange-500"
                        }`}
                      />
                      <div>
                        <p
                          className={`text-sm ${
                            n.is_read ? "text-gray-600" : "text-gray-900"
                          }`}
                        >
                          {n.message}
                        </p>
                        <span className="text-xs text-gray-500">
                          {new Date(n.created_at).toLocaleString("vi-VN")}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="p-4 text-gray-500 italic text-center">
                  Không có thông báo nào.
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
