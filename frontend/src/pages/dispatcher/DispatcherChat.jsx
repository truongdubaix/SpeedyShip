import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

export default function DispatcherChat() {
  const [activeChats, setActiveChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [toast, setToast] = useState(null);

  // ========================
  // 🧠 Lưu & load LocalStorage
  // ========================
  const saveToStorage = (chats, selected, msgs) => {
    localStorage.setItem(
      "dispatcherChatData",
      JSON.stringify({
        activeChats: chats,
        selectedChat: selected,
        messages: msgs,
      })
    );
  };

  // ========================
  // ⚡ Kết nối Socket.IO
  // ========================
  useEffect(() => {
    socket.emit("joinDispatcher");
    console.log("🟣 Dispatcher joined global room");

    // 🔁 Load từ localStorage
    const saved = localStorage.getItem("dispatcherChatData");
    if (saved) {
      const parsed = JSON.parse(saved);
      setActiveChats(parsed.activeChats || []);
      setSelectedChat(parsed.selectedChat || null);
      setMessages(parsed.messages || []);
      if (parsed.selectedChat) socket.emit("joinChat", parsed.selectedChat);
    }

    // 💬 Nhận tin nhắn chào đầu tiên (welcomeMessage)
    socket.on("welcomeMessage", (msg) => {
      const { chatId } = msg;
      console.log("👋 Nhận welcomeMessage:", msg);

      // Nếu chưa chọn chat hoặc đang ở đúng chat đó → hiển thị tin nhắn chào
      if (!selectedChat || selectedChat === chatId) {
        setSelectedChat(chatId);
        setMessages((prev) => {
          const exists = prev.some((m) => m.content === msg.content);
          const updated = exists ? prev : [...prev, msg];
          saveToStorage(activeChats, chatId, updated);
          return updated;
        });
      }
    });

    // 💬 Nhận tin nhắn mới (trong chat đang mở)
    socket.on("newMessage", (msg) => {
      const { chatId } = msg;
      if (chatId === selectedChat) {
        setMessages((prev) => {
          const updated = [...prev, msg];
          saveToStorage(activeChats, selectedChat, updated);
          return updated;
        });
      }
    });

    // 💬 Tin nhắn mới từ khách trong chat khác
    socket.on("customerMessage", (msg) => {
      const { chatId, content } = msg;
      if (chatId !== selectedChat) {
        showToast(`Tin nhắn mới từ Chat #${chatId}: "${content}"`);
        setActiveChats((prev) => {
          const updated = prev.includes(chatId) ? prev : [...prev, chatId];
          saveToStorage(updated, selectedChat, messages);
          return updated;
        });
      }
    });

    // ❌ Khi chat kết thúc
    socket.on("chatClosed", (chatId) => {
      console.log("❌ Chat kết thúc:", chatId);
      setActiveChats((prev) => {
        const updated = prev.filter((id) => id !== chatId);
        saveToStorage(updated, selectedChat, messages);
        return updated;
      });
      if (selectedChat === chatId) {
        setSelectedChat(null);
        setMessages([]);
        saveToStorage(activeChats, null, []);
      }
    });

    return () => {
      socket.off("newChat");
      socket.off("newMessage");
      socket.off("customerMessage");
      socket.off("chatClosed");
    };
  }, [selectedChat]);

  // ========================
  // ✉️ Gửi tin nhắn
  // ========================
  const sendMessage = () => {
    if (!selectedChat || !input.trim()) return;
    const msg = {
      chatId: selectedChat,
      senderId: 0,
      role: "dispatcher",
      content: input.trim(),
    };
    socket.emit("sendMessage", msg);
    setInput("");
  };

  // ========================
  // 🔁 Chọn chat
  // ========================
  const selectChat = (id) => {
    setSelectedChat(id);
    setMessages([]);
    socket.emit("joinChat", id);
    console.log(`🟣 Dispatcher joined chat_${id}`);
    saveToStorage(activeChats, id, []);
  };

  // ========================
  // 🧹 Xóa lịch sử
  // ========================
  const clearHistory = () => {
    localStorage.removeItem("dispatcherChatData");
    setActiveChats([]);
    setSelectedChat(null);
    setMessages([]);
  };

  // ========================
  // 🔔 Popup toast
  // ========================
  const showToast = (text) => {
    setToast(text);
    setTimeout(() => setToast(null), 3000);
  };

  // ========================
  // 🧩 Giao diện
  // ========================
  return (
    <div className="relative flex h-[85vh] bg-white shadow-xl rounded-xl overflow-hidden">
      {/* Sidebar */}
      <div className="w-1/3 border-r p-4 bg-blue-50 flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-blue-700 text-lg">💬 Đang chat</h3>
          <button
            onClick={clearHistory}
            className="text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
          >
            🧼 Xóa
          </button>
        </div>

        {activeChats.length === 0 ? (
          <p className="text-sm text-gray-500 italic text-center">
            Chưa có khách hàng nào đang chat
          </p>
        ) : (
          <div className="space-y-2 overflow-y-auto">
            {activeChats.map((id) => (
              <div
                key={id}
                onClick={() => selectChat(id)}
                className={`p-3 rounded-lg cursor-pointer transition ${
                  selectedChat === id
                    ? "bg-blue-600 text-white shadow font-semibold"
                    : "bg-white hover:bg-blue-100"
                }`}
              >
                Chat #{id}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Khung chat */}
      <div className="flex-1 flex flex-col">
        <div className="bg-blue-600 text-white p-4 font-semibold flex justify-between items-center">
          <span>
            {selectedChat ? `Chat #${selectedChat}` : "Chưa chọn khách hàng"}
          </span>
          {selectedChat && (
            <span className="text-sm text-blue-100 italic">
              Đang hoạt động...
            </span>
          )}
        </div>

        <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
          {selectedChat ? (
            messages.length > 0 ? (
              messages.map((m, i) => (
                <div
                  key={i}
                  className={`mb-3 ${
                    m.role === "dispatcher" ? "text-right" : "text-left"
                  }`}
                >
                  <div
                    className={`inline-block px-3 py-2 rounded-2xl max-w-[75%] text-sm ${
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
              <p className="text-center text-gray-400 italic mt-10">
                Chưa có tin nhắn nào...
              </p>
            )
          ) : (
            <p className="text-center text-gray-400 mt-10">
              👈 Chọn khách hàng để bắt đầu chat
            </p>
          )}
        </div>

        {selectedChat && (
          <div className="flex border-t bg-white p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Nhập tin nhắn..."
              className="flex-1 p-2 border rounded-lg outline-none text-sm"
            />
            <button
              onClick={sendMessage}
              className="ml-2 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Gửi
            </button>
          </div>
        )}
      </div>

      {/* 🔔 Toast Popup */}
      {toast && (
        <div className="absolute bottom-6 right-6 bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg text-sm animate-fade-in">
          {toast}
        </div>
      )}
    </div>
  );
}
