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
// ⚡ Socket.io real-time setup
// ==========================
const server = createServer(app);
const io = new Server(server, {
  cors: { origin: process.env.CLIENT_URL || "*", methods: ["GET", "POST"] },
});

// 🔹 Danh sách tài xế online
let onlineDrivers = {}; // { driverId: socketId }

io.on("connection", (socket) => {
  // 🔕 Tắt log để gọn terminal
  // console.log("⚡ New socket connected:", socket.id);

  socket.on("registerDriver", (driverId) => {
    onlineDrivers[driverId] = socket.id;
    // console.log(`🟢 Driver ${driverId} connected`);
  });

  socket.on("disconnect", () => {
    for (let id in onlineDrivers) {
      if (onlineDrivers[id] === socket.id) {
        delete onlineDrivers[id];
        // console.log(`🔴 Driver ${id} disconnected`);
      }
    }
  });
});

// ==========================
// 🔔 Hàm gửi thông báo tới tài xế
// ==========================
export const sendNotificationToDriver = async (
  driverId,
  shipmentId,
  message
) => {
  try {
    // 1️⃣ Lưu thông báo vào DB
    await pool.query(
      "INSERT INTO notifications (driver_id, shipment_id, message) VALUES (?, ?, ?)",
      [driverId, shipmentId, message]
    );

    // 2️⃣ Gửi real-time nếu tài xế đang online
    const socketId = onlineDrivers[driverId];
    if (socketId) {
      io.to(socketId).emit("newNotification", { shipmentId, message });
      // console.log(`📢 Gửi thông báo tới driver ${driverId}: ${message}`);
    }
  } catch (err) {
    console.error("❌ Lỗi khi gửi thông báo:", err);
  }
};

// ==========================
// 🚀 Routes
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
app.use("/api/drivers", driverRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/feedbacks", feedbackRoutes);
app.use("/api/notifications", notificationRoutes);

// ==========================
// 🧪 Test route
// ==========================
app.get("/", (_req, res) =>
  res.send("🚀 SpeedyShip API running with real-time notifications")
);

// ==========================
// ✅ Start server
// ==========================
const PORT = process.env.PORT || 5000;
server.listen(PORT, () =>
  console.log(`✅ Server đang chạy tại: http://localhost:${PORT}`)
);
