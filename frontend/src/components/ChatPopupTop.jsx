import { useState } from "react";
import { FaTimes, FaMinus, FaExpand } from "react-icons/fa";
import API from "../services/api";

export default function ChatPopupTop({ onClose, bubbleOpen }) {
  const [collapsed, setCollapsed] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Xin chào! Tôi có thể hỗ trợ gì cho bạn?" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { from: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);

    const res = await API.post("/ai/ask", { message: input });
    const botMsg = { from: "bot", text: res.data.reply };

    setMessages((prev) => [...prev, botMsg]);
    setInput("");
  };

  // Vị trí tự động
  const basePos = bubbleOpen ? "right-[520px]" : "right-[110px]";
  const baseSize = bubbleOpen ? "w-80 h-[350px]" : "w-[420px] h-[520px]";
  const collapsedSize = bubbleOpen ? "w-80 h-[50px]" : "w-[420px] h-[50px]";
  const finalSize = collapsed ? collapsedSize : baseSize;

  return (
    <div
      className={`fixed bottom-6 ${basePos} ${finalSize} z-[9999] animate-zoom-pop`}
    >
      <div className="w-full h-full bg-white shadow-2xl rounded-2xl border flex flex-col overflow-hidden">
        {/* HEADER */}
        <div className="bg-blue-600 text-white px-3 py-2 flex justify-between items-center rounded-t-xl">
          <span className="font-semibold text-sm">🤖 Hỗ trợ AI</span>

          <div className="flex items-center gap-3">
            {collapsed ? (
              <FaExpand
                onClick={() => setCollapsed(false)}
                className="cursor-pointer hover:text-gray-200"
              />
            ) : (
              <FaMinus
                onClick={() => setCollapsed(true)}
                className="cursor-pointer hover:text-gray-200"
              />
            )}

            <FaTimes
              onClick={onClose}
              className="cursor-pointer hover:text-gray-200"
            />
          </div>
        </div>

        {/* BODY */}
        {!collapsed && (
          <>
            <div className="flex-1 p-3 overflow-y-auto bg-gray-50">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`p-2 my-1 rounded-lg max-w-[80%] ${
                    m.from === "user"
                      ? "ml-auto bg-blue-500 text-white msg-anim"
                      : "mr-auto bg-white border msg-anim"
                  }`}
                >
                  {m.text}
                </div>
              ))}
            </div>

            {/* INPUT */}
            <div className="p-2 border-t bg-white flex gap-2">
              <input
                className="flex-1 border rounded px-2 py-1 text-sm"
                placeholder="Nhập tin nhắn..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <button
                onClick={sendMessage}
                className="bg-blue-600 text-white px-3 rounded"
              >
                Gửi
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
