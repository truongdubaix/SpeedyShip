import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import pool from "./config/db.js";
import { createServer } from "http";
import { Server } from "socket.io";

// Import routes
import authRoutes from "./routes/authRoutes.js";
import driverRoutes from "./routes/driverRoutes.js";
import shipmentRoutes from "./routes/shipmentRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import dispatcherRoutes from "./routes/dispatcherRoutes.js";
import driverAdminRoutes from "./routes/driverAdminRoutes.js";
import driverLocationRoutes from "./routes/driverLocationRoutes.js";
import roleRoutes from "./routes/roleRoutes.js";
import vehicleRoutes from "./routes/vehicleRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";

dotenv.config();
const app = express();

// ==========================
// 🔧 Middleware setup
// ==========================
app.use(cors({ origin: process.env.CLIENT_URL || "*", credentials: true }));
app.use(express.json());
app.use(cookieParser());

// ✅ Kiểm tra kết nối MySQL
pool
  .query("SELECT 1")
  .then(() => console.log("✅ MySQL connected"))
  .catch(console.error);

// ==========================
// ⚡ Socket.io setup (Realtime Chat + Notifications)
// ==========================
const server = createServer(app);
const io = new Server(server, {
  cors: { origin: process.env.CLIENT_URL || "*", methods: ["GET", "POST"] },
});

// 🔹 Lưu trạng thái kết nối
let onlineDrivers = {}; // { driverId: socketId }
let activeChats = {}; // { customerId: chatId }

// ==========================
// 💬 CHAT REALTIME SYSTEM
// ==========================
io.on("connection", (socket) => {
  console.log("⚡ Socket connected:", socket.id);

  // 🟢 Khi tài xế kết nối
  socket.on("registerDriver", (driverId) => {
    onlineDrivers[driverId] = socket.id;
  });

  // 🟣 Khi dispatcher vào hệ thống chat
  socket.on("joinDispatcher", () => {
    socket.join("dispatcherRoom");
    console.log("🟣 Dispatcher joined global room");
  });

  // 🟣 Dispatcher join vào chat cụ thể
  socket.on("joinChat", (chatId) => {
    const room = `chat_${chatId}`;
    socket.join(room);
    console.log(`🟣 Dispatcher joined ${room}`);
  });

  // 🟢 Khi khách hàng bắt đầu chat
  socket.on("startChat", async (customerId) => {
    try {
      let [rows] = await pool.query(
        "SELECT * FROM chats WHERE customer_id = ? AND status='active'",
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
      console.log(`💬 Customer ${customerId} started ${room}`);

      // ⚡ Gửi ID chat lại cho khách hàng
      io.to(socket.id).emit("chatStarted", chatId);

      // ⚡ Bắt buộc khách hàng join phòng ngay (để nhận tin)
      socket.emit("joinChat", chatId);

      // Gửi thông báo tới tất cả dispatcher
      io.to("dispatcherRoom").emit("newChat", { chatId, customerId });
    } catch (err) {
      console.error("❌ Lỗi startChat:", err.message);
    }
  });

  // 🟠 Khi có tin nhắn mới
  socket.on("sendMessage", async (msg) => {
    const { chatId, senderId, content, role } = msg;
    const timestamp = new Date();
    const room = `chat_${chatId}`;

    try {
      // ✅ Đảm bảo người gửi ở trong room
      socket.join(room);

      await pool.query(
        "INSERT INTO messages (chat_id, sender_id, role, content, created_at) VALUES (?, ?, ?, ?, ?)",
        [chatId, senderId, role, content, timestamp]
      );

      // 📢 Gửi tin nhắn đến room (đã gồm customer + dispatcher)
      io.to(room).emit("newMessage", {
        chatId,
        senderId,
        role,
        content,
        created_at: timestamp,
      });

      // 🔔 Nếu người gửi là customer → báo dispatcher có tin mới
      if (role === "customer") {
        io.to("dispatcherRoom").emit("newChat", {
          chatId,
          customerId: senderId,
        });
      }
    } catch (err) {
      console.error("❌ Lỗi lưu message:", err.message);
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
      console.log(`❌ Chat ${chatId} closed`);
    } catch (err) {
      console.error("❌ Lỗi endChat:", err.message);
    }
  });

  // 🔴 Khi user ngắt kết nối
  socket.on("disconnect", () => {
    for (let id in onlineDrivers) {
      if (onlineDrivers[id] === socket.id) delete onlineDrivers[id];
    }
    console.log("🔴 Socket disconnected:", socket.id);
  });
});

// ==========================
// 🔔 THÔNG BÁO CHO DRIVER
// ==========================
export const sendNotificationToDriver = async (
  driverId,
  shipmentId,
  message
) => {
  try {
    await pool.query(
      "INSERT INTO notifications (driver_id, shipment_id, message) VALUES (?, ?, ?)",
      [driverId, shipmentId, message]
    );
    const socketId = onlineDrivers[driverId];
    if (socketId) {
      io.to(socketId).emit("newNotification", { shipmentId, message });
    }
  } catch (err) {
    console.error("❌ Lỗi khi gửi thông báo:", err);
  }
};

// ==========================
// 🚀 API ROUTES
// ==========================
app.use("/api/auth", authRoutes);
app.use("/api/driver", driverRoutes);
app.use("/api/drivers", driverAdminRoutes);
app.use("/api/drivers", driverLocationRoutes);
app.use("/api/shipments", shipmentRoutes);
app.use("/api/users", userRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/dispatcher", dispatcherRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/feedbacks", feedbackRoutes);
app.use("/api/notifications", notificationRoutes);

// ==========================
// 🧪 Test route
// ==========================
app.get("/", (_req, res) =>
  res.send("🚀 SpeedyShip API running with realtime chat & notifications")
);

// ==========================
// ✅ START SERVER
// ==========================
const PORT = process.env.PORT || 5000;
server.listen(PORT, () =>
  console.log(`✅ Server đang chạy tại: http://localhost:${PORT}`)
);
