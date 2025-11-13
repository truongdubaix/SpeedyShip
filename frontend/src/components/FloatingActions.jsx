import { useState } from "react";
import { FiMessageSquare, FiSlack } from "react-icons/fi";

export default function FloatingActions({ onOpenChatBubble, onOpenChatTop }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-3">
      {/* Nút ChatBot AI – mở cạnh bong bóng */}
      {open && (
        <button
          onClick={onOpenChatTop}
          className="w-12 h-12 rounded-full bg-blue-600 shadow-xl flex items-center justify-center 
          hover:bg-blue-700 transition transform hover:-translate-y-1"
        >
          <FiSlack size={24} className="text-white" />
        </button>
      )}

      {/* Nút Chat Realtime */}
      {open && (
        <button
          onClick={onOpenChatBubble}
          className="w-12 h-12 rounded-full bg-green-600 shadow-xl flex items-center justify-center 
          hover:bg-green-700 transition transform hover:-translate-y-1"
        >
          <FiMessageSquare size={24} className="text-white" />
        </button>
      )}

      {/* Nút menu chính */}
      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full bg-red-600 shadow-2xl flex items-center justify-center hover:bg-red-700 transition"
      >
        <span className="text-white text-2xl">{open ? "×" : "≡"}</span>
      </button>
    </div>
  );
}
