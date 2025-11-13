import { useState, useEffect } from "react";
import { FiMessageSquare, FiSlack } from "react-icons/fi";

export default function FloatingActions({ onOpenChatBubble, onOpenChatTop }) {
  const [open, setOpen] = useState(false);
  const [showNotice, setShowNotice] = useState(true);

  // Ẩn bubble sau 4 giây
  useEffect(() => {
    if (!showNotice) return;
    const t = setTimeout(() => setShowNotice(false), 4000);
    return () => clearTimeout(t);
  }, [showNotice]);

  // Khi đóng menu → bubble hiện lại
  useEffect(() => {
    if (!open) setShowNotice(true);
    else setShowNotice(false);
  }, [open]);

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-4">
      {/* 🔔 Bubble thông báo */}
      {!open && showNotice && (
        <div
          className="
            bg-white shadow-xl border px-6 py-3 rounded-2xl text-[15px] text-gray-800
            max-w-[320px] mr-28 mb-2 animate-slide-up glow leading-snug
          "
        >
          💡 <b>Cần hỗ trợ?</b> Nhấn vào để bắt đầu chat!
        </div>
      )}

      {/* Nút ChatBot AI */}
      {open && (
        <button
          onClick={onOpenChatTop}
          className="
            w-14 h-14 rounded-full bg-blue-600 shadow-xl flex items-center justify-center
            hover:bg-blue-700 transition transform hover:-translate-y-1 animate-zoom-pop
          "
        >
          <FiSlack size={28} className="text-white" />
        </button>
      )}

      {/* Nút Chat Realtime */}
      {open && (
        <button
          onClick={onOpenChatBubble}
          className="
            w-14 h-14 rounded-full bg-green-600 shadow-xl flex items-center justify-center
            hover:bg-green-700 transition transform hover:-translate-y-1 animate-zoom-pop
          "
        >
          <FiMessageSquare size={28} className="text-white" />
        </button>
      )}

      {/* Nút menu chính */}
      <button
        onClick={() => setOpen(!open)}
        className="
          w-16 h-16 rounded-full bg-red-600 shadow-2xl flex items-center justify-center
          hover:bg-red-700 transition
        "
      >
        <span className={`text-white text-3xl ${open ? "spin-bounce" : ""}`}>
          {open ? "×" : "≡"}
        </span>
      </button>
    </div>
  );
}
