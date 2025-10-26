import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

export default function DispatcherChat() {
  const [activeChats, setActiveChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    // 🟣 B1. Đăng ký dispatcher vào phòng chung
    socket.emit("joinDispatcher");
    console.log("🟣 Dispatcher joined global room");

    // 🟢 Khi có khách hàng mới bắt đầu chat
    socket.on("newChat", (chat) => {
      console.log("📢 Có khách hàng mới:", chat);
      setActiveChats((prev) =>
        prev.includes(chat.chatId) ? prev : [...prev, chat.chatId]
      );
    });

    // 🟠 Khi nhận tin nhắn mới
    socket.on("newMessage", (msg) => {
      console.log("💬 Tin nhắn mới:", msg);
      if (msg.chatId === selectedChat) {
        setMessages((prev) => [...prev, msg]);
      } else if (msg.role === "customer") {
        setActiveChats((prev) =>
          prev.includes(msg.chatId) ? prev : [...prev, msg.chatId]
        );
      }
    });

    // 🔴 Khi chat kết thúc
    socket.on("chatClosed", (chatId) => {
      console.log("❌ Chat kết thúc:", chatId);
      setActiveChats((prev) => prev.filter((id) => id !== chatId));
      if (selectedChat === chatId) {
        setSelectedChat(null);
        setMessages([]);
      }
    });

    return () => {
      socket.off("newChat");
      socket.off("newMessage");
      socket.off("chatClosed");
    };
  }, [selectedChat]);

  // ✉️ Gửi tin nhắn
  const sendMessage = () => {
    if (!selectedChat || !input.trim()) return;
    const msg = {
      chatId: selectedChat,
      senderId: 0, // ✅ dispatcher dùng ID = 0 (đại diện điều phối)
      role: "dispatcher",
      content: input,
    };
    socket.emit("sendMessage", msg);
    setInput("");
  };

  // 🧭 Chọn chat → join đúng phòng
  const selectChat = (id) => {
    setSelectedChat(id);
    setMessages([]);
    socket.emit("joinChat", id); // ✅ join vào room đúng chat
  };

  return (
    <div className="flex h-[85vh] bg-white shadow-xl rounded-xl overflow-hidden">
      {/* 🧭 Sidebar */}
      <div className="w-1/3 border-r p-4 bg-blue-50">
        <h3 className="font-bold text-blue-700 mb-2">💬 Đang chat</h3>
        {activeChats.length === 0 && (
          <p className="text-sm text-gray-500 italic">
            Chưa có khách hàng nào đang chat
          </p>
        )}
        {activeChats.map((id) => (
          <div
            key={id}
            onClick={() => selectChat(id)}
            className={`p-3 mb-2 rounded cursor-pointer transition ${
              selectedChat === id
                ? "bg-blue-600 text-white shadow"
                : "bg-white hover:bg-blue-100"
            }`}
          >
            Chat #{id}
          </div>
        ))}
      </div>

      {/* 💬 Khung chat chính */}
      <div className="flex-1 flex flex-col">
        <div className="bg-blue-600 text-white p-4 font-semibold">
          {selectedChat ? `Chat #${selectedChat}` : "Chưa chọn khách hàng"}
        </div>

        <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
          {selectedChat ? (
            messages.map((m, i) => (
              <div
                key={i}
                className={`mb-3 ${
                  m.role === "dispatcher" ? "text-right" : "text-left"
                }`}
              >
                <div
                  className={`inline-block px-3 py-2 rounded-lg max-w-[70%] text-sm ${
                    m.role === "dispatcher"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400 mt-10">
              👈 Chọn khách hàng để bắt đầu chat
            </p>
          )}
        </div>

        {selectedChat && (
          <div className="flex border-t bg-white">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Nhập tin nhắn..."
              className="flex-1 p-3 outline-none"
            />
            <button
              onClick={sendMessage}
              className="bg-blue-600 text-white px-5 hover:bg-blue-700 transition"
            >
              Gửi
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
