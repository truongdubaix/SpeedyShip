import { useState, useEffect } from "react";
import { FiMessageSquare, FiSlack } from "react-icons/fi";

export default function FloatingActions({ onOpenChatBubble, onOpenChatTop }) {
  const [open, setOpen] = useState(false);

  // 🔔 Bubble chú ý
  const [showNotice, setShowNotice] = useState(true);

  // Auto ẩn sau 4 giây mỗi lần nó xuất hiện
  useEffect(() => {
    if (!showNotice) return;
    const timer = setTimeout(() => setShowNotice(false), 4000);
    return () => clearTimeout(timer);
  }, [showNotice]);

  // 🆕 Khi đóng menu → hiện bubble lại
  useEffect(() => {
    if (!open) {
      // menu đóng → reset bubble
      setShowNotice(true);
    } else {
      // menu mở → tắt bubble
      setShowNotice(false);
    }
  }, [open]);

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-3">
      {/* 🔔 Bubble thông báo chú ý */}
      {!open && showNotice && (
        <div
          className="
          bg-white shadow-xl border px-4 py-2 rounded-xl text-sm text-gray-800
          max-w-[240px] mr-20 mb-2 animate-slide-up
        "
        >
          💡 <b>Cần hỗ trợ?</b> Nhấn để chat với SpeedyShip!
        </div>
      )}

      {open && (
        <button
          onClick={onOpenChatTop}
          className="w-12 h-12 rounded-full bg-blue-600 shadow-xl flex items-center justify-center 
          hover:bg-blue-700 transition transform hover:-translate-y-1"
        >
          <FiSlack size={24} className="text-white" />
        </button>
      )}

      {open && (
        <button
          onClick={onOpenChatBubble}
          className="w-12 h-12 rounded-full bg-green-600 shadow-xl flex items-center justify-center 
          hover:bg-green-700 transition transform hover:-translate-y-1"
        >
          <FiMessageSquare size={24} className="text-white" />
        </button>
      )}

      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full bg-red-600 shadow-2xl flex items-center justify-center hover:bg-red-700 transition"
      >
        <span className="text-white text-2xl">{open ? "×" : "≡"}</span>
      </button>
    </div>
  );
}
