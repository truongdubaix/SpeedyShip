import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import pool from "./config/db.js";
import { createServer } from "http";
import { Server } from "socket.io";
import initSocket from "./socket/initSocket.js"; // ⚡ Import module socket riêng

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
// ⚡ Socket.io setup
// ==========================
const server = createServer(app);
const io = new Server(server, {
  cors: { origin: process.env.CLIENT_URL || "*", methods: ["GET", "POST"] },
});

// ✅ Khởi tạo socket và nhận các hàm tiện ích (notification,...)
const socketService = initSocket(io, pool);

// ✅ Export hàm để controller khác gọi được (như shipmentController)
export const { sendNotificationToDriver } = socketService;

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
