import { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

export default function ChatBubble({ onClose }) {
  const [collapsed, setCollapsed] = useState(false);
  const [chatId, setChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [ready, setReady] = useState(false);

  const userId = localStorage.getItem("userId");
  const role = localStorage.getItem("role");

  // 🟢 Auto start chat khi mở component
  useEffect(() => {
    if (!userId || role !== "customer") {
      alert("⚠ Vui lòng đăng nhập bằng tài khoản khách hàng!");
      onClose();
      return;
    }

    socket.emit("startChat", userId);

    socket.on("chatStarted", (id) => {
      setChatId(id);
      setReady(true);
      socket.emit("joinChat", id);
    });

    socket.on("newMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on("chatEnded", () => {
      alert("💬 Cuộc trò chuyện đã kết thúc");
      setCollapsed(false);
      setChatId(null);
      setMessages([]);
      setReady(false);
      onClose();
    });

    return () => {
      socket.off("chatStarted");
      socket.off("newMessage");
      socket.off("chatEnded");
    };
  }, []);

  const sendMessage = () => {
    if (!ready || !chatId || !input.trim()) return;

    socket.emit("sendMessage", {
      chatId,
      senderId: userId,
      role: "customer",
      content: input,
    });

    setInput("");
  };

  const endChat = () => {
    if (chatId) socket.emit("endChat", userId);
    onClose();
  };

  // ========== EFFECT SIZE ==========
  const baseSize = "w-[420px] h-[520px]";
  const collapsedSize = "w-[420px] h-[50px]";
  const finalSize = collapsed ? collapsedSize : baseSize;

  return (
    <div
      className={`fixed bottom-6 right-[110px] ${finalSize} z-[9998] animate-zoom-pop`}
    >
      <div className="w-full h-full bg-white shadow-2xl rounded-2xl border flex flex-col overflow-hidden">
        {/* HEADER */}
        <div className="bg-blue-600 text-white px-3 py-2 flex justify-between items-center rounded-t-2xl">
          <span className="font-semibold text-sm">💬 Hỗ trợ khách hàng</span>
          <div className="flex items-center gap-3">
            {/* Thu gọn */}
            {collapsed ? (
              <svg
                onClick={() => setCollapsed(false)}
                className="cursor-pointer hover:text-gray-200"
                width="16"
                height="16"
                fill="currentColor"
              >
                <path d="M2 6h12v4H2z" />
              </svg>
            ) : (
              <svg
                onClick={() => setCollapsed(true)}
                className="cursor-pointer hover:text-gray-200"
                width="16"
                height="16"
                fill="currentColor"
              >
                <rect x="2" y="7" width="12" height="2" />
              </svg>
            )}

            {/* Đóng */}
            <svg
              onClick={endChat}
              className="cursor-pointer hover:text-gray-200"
              width="18"
              height="18"
              fill="currentColor"
            >
              <path d="M2 2l12 12M14 2L2 14" stroke="white" strokeWidth="2" />
            </svg>
          </div>
        </div>

        {/* BODY */}
        {!collapsed && (
          <>
            <div className="flex-1 p-3 overflow-y-auto bg-gray-50">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`mb-2 flex ${
                    m.role === "customer" ? "justify-end" : "justify-start"
                  } msg-anim`}
                >
                  <div
                    className={`px-3 py-2 rounded-lg max-w-[70%] text-sm ${
                      m.role === "customer"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-2 border-t flex">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={!ready}
                placeholder={ready ? "Nhập tin nhắn..." : "⏳ Đang kết nối..."}
                className="flex-1 border rounded-lg p-2 text-sm outline-none"
              />

              <button
                onClick={sendMessage}
                disabled={!ready}
                className={`ml-2 px-4 rounded-lg ${
                  ready
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-400 text-gray-200"
                }`}
              >
                ➤
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
