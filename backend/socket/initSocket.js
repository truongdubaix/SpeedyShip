let onlineDrivers = {}; // { driverId: socketId }
let activeChats = {}; // { customerId: chatId }

export default function initSocket(io, pool) {
  io.on("connection", (socket) => {
    // 🟢 Khi tài xế đăng ký
    socket.on("registerDriver", (driverId) => {
      onlineDrivers[driverId] = socket.id;
    });

    // 🟣 Dispatcher vào hệ thống chat chung
    socket.on("joinDispatcher", () => {
      socket.join("dispatcherRoom");
    });

    // 🟣 Dispatcher tham gia chat cụ thể
    socket.on("joinChat", async (chatId) => {
      const room = `chat_${chatId}`;
      socket.join(room);

      try {
        // Kiểm tra nếu chat chưa có tin nhắn nào → gửi lại welcomeMsg
        const [msgs] = await pool.query(
          "SELECT COUNT(*) AS total FROM messages WHERE chat_id = ?",
          [chatId]
        );
        if (msgs[0].total === 0) {
          const welcomeMsg = {
            chatId,
            senderId: 0,
            role: "dispatcher",
            content:
              "Xin chào 👋! Chúng tôi là đội ngũ hỗ trợ SpeedyShip. Bạn cần giúp gì hôm nay?",
            created_at: new Date(),
          };

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

          io.to(room).emit("newMessage", welcomeMsg);
        }
      } catch (err) {
        console.error("❌ Lỗi joinChat:", err.message);
      }
    });

    // 💬 Khi khách hàng bắt đầu chat
    socket.on("startChat", async (customerId) => {
      try {
        let [rows] = await pool.query(
          "SELECT * FROM chats WHERE customer_id=? AND status='active'",
          [customerId]
        );

        let chatId;
        if (rows.length > 0) chatId = rows[0].id;
        else {
          const [res] = await pool.query(
            "INSERT INTO chats (customer_id, status) VALUES (?, 'active')",
            [customerId]
          );
          chatId = res.insertId;
        }

        activeChats[customerId] = chatId;
        const room = `chat_${chatId}`;
        socket.join(room);

        // 📢 Báo cho Dispatcher có khách hàng mới
        io.to("dispatcherRoom").emit("newChat", { chatId, customerId });

        // ⏳ Tạo và gửi tin nhắn chào một cách chắc chắn
        setTimeout(async () => {
          const welcomeMsg = {
            chatId,
            senderId: 0,
            role: "dispatcher",
            content:
              "Xin chào 👋! Chúng tôi là đội ngũ hỗ trợ SpeedyShip. Bạn cần giúp gì hôm nay?",
            created_at: new Date(),
          };

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

          // Gửi đến phòng chat + dispatcher + chính customer
          io.to(room).emit("newMessage", welcomeMsg);
          io.to("dispatcherRoom").emit("welcomeMessage", welcomeMsg);
          io.to(socket.id).emit("chatStarted", chatId);
        }, 800); // delay nhẹ để đảm bảo dispatcher kịp join room
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
        await pool.query(
          "INSERT INTO messages (chat_id, sender_id, role, content, created_at) VALUES (?, ?, ?, ?, ?)",
          [chatId, senderId, role, content, time]
        );

        io.to(room).emit("newMessage", {
          chatId,
          senderId,
          role,
          content,
          created_at: time,
        });

        // Nếu khách gửi → báo Dispatcher
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
    socket.on("endChat", async (userId) => {
      try {
        await pool.query(
          "UPDATE chats SET status='closed', ended_at=NOW() WHERE customer_id=? AND status='active'",
          [userId]
        );
        const chatId = activeChats[userId];
        delete activeChats[userId];

        if (chatId) {
          io.to(`chat_${chatId}`).emit("chatEnded");
          io.to("dispatcherRoom").emit("chatEnded", { chatId, userId });
        }

        console.log(`💬 Chat của khách hàng #${userId} đã kết thúc.`);
      } catch (err) {
        console.error("❌ Lỗi endChat:", err.message);
      }
    });

    // ⚪ Khi socket ngắt kết nối
    socket.on("disconnect", () => {
      for (let id in onlineDrivers) {
        if (onlineDrivers[id] === socket.id) delete onlineDrivers[id];
      }
    });
  });

  // ======================================================
  // 🔔 Gửi thông báo cho DRIVER và DISPATCHER
  // ======================================================
  return {
    sendNotificationToDriver: async (driverId, shipmentId, message) => {
      try {
        await pool.query(
          "INSERT INTO notifications (receiver_id, target_role, shipment_id, message) VALUES (?, 'driver', ?, ?)",
          [driverId, shipmentId, message]
        );
        const socketId = onlineDrivers[driverId];
        if (socketId)
          io.to(socketId).emit("newNotification", { shipmentId, message });
      } catch (err) {
        console.error("❌ Lỗi gửi thông báo driver:", err.message);
      }
    },

    sendNotificationToDispatcher: async (dispatcherId, shipmentId, message) => {
      try {
        await pool.query(
          "INSERT INTO notifications (receiver_id, target_role, shipment_id, message) VALUES (?, 'dispatcher', ?, ?)",
          [dispatcherId, shipmentId, message]
        );
        io.to("dispatcherRoom").emit("newDispatcherNotification", {
          shipmentId,
          message,
          created_at: new Date(),
        });
      } catch (err) {
        console.error("❌ Lỗi gửi thông báo dispatcher:", err.message);
      }
    },
  };
}
