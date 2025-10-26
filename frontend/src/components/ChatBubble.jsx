import { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

export default function ChatBubble() {
  const [open, setOpen] = useState(false);
  const [chatId, setChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const userId = localStorage.getItem("userId");
  const role = localStorage.getItem("role");

  useEffect(() => {
    if (!userId || role !== "customer") return;

    socket.on("chatStarted", (id) => {
      setChatId(id);
      socket.emit("joinChat", id); // ✅ join vào room khi bắt đầu
    });

    socket.on("newMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on("chatEnded", () => {
      alert("💬 Cuộc trò chuyện đã kết thúc");
      setOpen(false);
      setChatId(null);
      setMessages([]);
    });

    return () => {
      socket.off("chatStarted");
      socket.off("newMessage");
      socket.off("chatEnded");
    };
  }, []);

  const startChat = () => {
    if (!userId || role !== "customer") {
      alert("⚠️ Vui lòng đăng nhập bằng tài khoản khách hàng!");
      return;
    }
    socket.emit("startChat", userId);
    setOpen(true);
  };

  const sendMessage = () => {
    if (!chatId || !input.trim()) return;
    const msg = { chatId, senderId: userId, role: "customer", content: input };
    socket.emit("sendMessage", msg);
    setInput(""); // server sẽ gửi lại bản tin
  };

  const endChat = () => {
    if (!chatId) return;
    socket.emit("endChat", userId);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!open ? (
        <button
          onClick={startChat}
          className="bg-blue-600 text-white w-16 h-16 rounded-full text-3xl shadow-lg hover:bg-blue-700 transition"
        >
          💬
        </button>
      ) : (
        <div className="w-[420px] h-[520px] bg-white shadow-2xl rounded-2xl flex flex-col">
          {/* Header */}
          <div className="bg-blue-600 text-white p-3 flex justify-between items-center rounded-t-2xl">
            <span className="font-semibold">Hỗ trợ khách hàng</span>
            <button onClick={endChat} className="text-sm underline">
              Kết thúc
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 overflow-y-auto bg-gray-50">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`mb-2 flex ${
                  m.role === "customer" ? "justify-end" : "justify-start"
                }`}
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

          {/* Input */}
          <div className="p-2 border-t flex">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Nhập tin nhắn..."
              className="flex-1 border rounded-lg p-2 text-sm outline-none"
            />
            <button
              onClick={sendMessage}
              className="ml-2 bg-blue-600 text-white px-4 rounded-lg hover:bg-blue-700 transition"
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
