let onlineDrivers = {}; // { driverId: socketId }
let activeChats = {}; // { customerId: chatId }

export default function initSocket(io, pool) {
  io.on("connection", (socket) => {
    console.log("⚡ Socket connected:", socket.id);

    // 🟢 Khi tài xế đăng ký
    socket.on("registerDriver", (driverId) => {
      onlineDrivers[driverId] = socket.id;
      console.log(`🚚 Driver #${driverId} online (${socket.id})`);
    });

    // 🟣 Dispatcher vào hệ thống chat
    socket.on("joinDispatcher", () => {
      socket.join("dispatcherRoom");
      console.log("🟣 Dispatcher joined room: dispatcherRoom");
    });

    // 🟣 Dispatcher tham gia chat cụ thể
    socket.on("joinChat", (chatId) => {
      socket.join(`chat_${chatId}`);
      console.log(`🟣 Dispatcher joined chat_${chatId}`);
    });

    // 💬 Khi khách hàng bắt đầu chat
    socket.on("startChat", async (customerId) => {
      try {
        // 🔍 Kiểm tra xem khách đã có chat đang mở chưa
        let [rows] = await pool.query(
          "SELECT * FROM chats WHERE customer_id=? AND status='active'",
          [customerId]
        );

        let chatId;
        if (rows.length > 0) {
          chatId = rows[0].id;
        } else {
          const [res] = await pool.query(
            "INSERT INTO chats (customer_id, status) VALUES (?, 'active')",
            [customerId]
          );
          chatId = res.insertId;
        }

        activeChats[customerId] = chatId;
        const room = `chat_${chatId}`;
        socket.join(room);
        console.log(`💬 Customer #${customerId} joined room: ${room}`);

        // 📢 Báo cho Dispatcher có khách hàng mới
        io.to("dispatcherRoom").emit("newChat", { chatId, customerId });

        // 🕒 Gửi tin nhắn chào tự động sau 300ms
        setTimeout(async () => {
          const welcomeMsg = {
            chatId,
            senderId: 0,
            role: "dispatcher",
            content:
              "Xin chào 👋! Chúng tôi là đội ngũ hỗ trợ SpeedyShip. Bạn cần giúp gì hôm nay?",
            created_at: new Date(),
          };

          // 💾 Lưu vào DB
          await pool.query(
            "INSERT INTO messages (chat_id, sender_id, role, content, created_at) VALUES (?, ?, ?, ?, ?)",
            [
              chatId,
              welcomeMsg.senderId,
              welcomeMsg.role,
              welcomeMsg.content,
              welcomeMsg.created_at,
            ]
          );

          // 📢 Gửi tin nhắn chào cho khách hàng trong phòng chat
          io.to(room).emit("newMessage", welcomeMsg);

          // ⚡ Gửi riêng sự kiện welcomeMessage cho dispatcher (tránh trùng newMessage)
          io.to("dispatcherRoom").emit("welcomeMessage", welcomeMsg);

          // 🔔 Gửi tín hiệu chatStarted cho khách hàng
          io.to(socket.id).emit("chatStarted", chatId);
        }, 300);
      } catch (err) {
        console.error("❌ Lỗi startChat:", err.message);
      }
    });

    // ✉️ Khi có tin nhắn mới
    socket.on("sendMessage", async (msg) => {
      const { chatId, senderId, role, content } = msg;
      const time = new Date();
      const room = `chat_${chatId}`;

      try {
        // 💾 Lưu tin nhắn vào DB
        await pool.query(
          "INSERT INTO messages (chat_id, sender_id, role, content, created_at) VALUES (?, ?, ?, ?, ?)",
          [chatId, senderId, role, content, time]
        );

        // 📢 Gửi tin nhắn tới phòng chat (cả khách & dispatcher đang mở)
        io.to(room).emit("newMessage", {
          chatId,
          senderId,
          role,
          content,
          created_at: time,
        });

        // ⚠️ Chỉ gửi thông báo riêng tới dispatcherRoom nếu khách hàng gửi
        if (role === "customer") {
          io.to("dispatcherRoom").emit("customerMessage", {
            chatId,
            senderId,
            role,
            content,
            created_at: time,
          });
        }
      } catch (err) {
        console.error("❌ Lỗi sendMessage:", err.message);
      }
    });

    // 🔴 Khi khách hàng kết thúc chat
    socket.on("endChat", async (customerId) => {
      const chatId = activeChats[customerId];
      if (!chatId) return;

      try {
        await pool.query(
          "UPDATE chats SET status='closed', ended_at=NOW() WHERE id=?",
          [chatId]
        );

        io.to(`chat_${chatId}`).emit("chatEnded", chatId);
        io.to("dispatcherRoom").emit("chatClosed", chatId);

        delete activeChats[customerId];
        console.log(`❌ Chat #${chatId} closed by customer`);
      } catch (err) {
        console.error("❌ Lỗi endChat:", err.message);
      }
    });

    // 🔴 Khi socket ngắt kết nối
    socket.on("disconnect", () => {
      for (let id in onlineDrivers) {
        if (onlineDrivers[id] === socket.id) delete onlineDrivers[id];
      }
      console.log(`🔴 Socket disconnected: ${socket.id}`);
    });
  });

  // ======================================
  // 🔔 Gửi thông báo cho tài xế (driver)
  // ======================================
  return {
    sendNotificationToDriver: async (driverId, shipmentId, message) => {
      try {
        await pool.query(
          "INSERT INTO notifications (driver_id, shipment_id, message) VALUES (?, ?, ?)",
          [driverId, shipmentId, message]
        );

        const socketId = onlineDrivers[driverId];
        if (socketId) {
          io.to(socketId).emit("newNotification", { shipmentId, message });
        }

        console.log(`📢 Gửi thông báo tới driver #${driverId}: ${message}`);
      } catch (err) {
        console.error("❌ Lỗi gửi thông báo:", err.message);
      }
    },
  };
}
