import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import pool from "./config/db.js";

// Import các routes hiện đang dùng
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
dotenv.config();
const app = express();

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL || "*", credentials: true }));
app.use(express.json());
app.use(cookieParser());

// 🔹 Kiểm tra kết nối MySQL
pool
  .query("SELECT 1")
  .then(() => console.log("✅ MySQL connected"))
  .catch(console.error);

// 🔹 Routes chính đang hoạt động

app.use("/api/auth", authRoutes); // Đăng nhập / Đăng ký
app.use("/api/driver", driverRoutes); // Dashboard, assignments, profile cho tài xế
app.use("/api/drivers", driverAdminRoutes); // Admin quản lý tài xế
app.use("/api/drivers", driverLocationRoutes); // API vị trí tài xế
app.use("/api/shipments", shipmentRoutes); // Quản lý đơn hàng
app.use("/api/users", userRoutes); // Quản lý tài khoản
app.use("/api/payments", paymentRoutes); // Quản lý thanh toán
app.use("/api/admin", adminRoutes); // AdminDashBoard
app.use("/api/dispatcher", dispatcherRoutes); // Điều phối viên
app.use("/api/drivers", driverRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/customers", customerRoutes);

// 📴 Các module chưa làm tới (tắt tạm)
// app.use("/api/users", userRoutes);
// app.use("/api/payments", paymentRoutes);
// app.use("/api/feedbacks", feedbackRoutes);
// app.use("/api/system", systemRoutes);

// Test route
app.get("/", (_req, res) => res.send("🚀 SpeedyShip API running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`✅ Server đang chạy tại: http://localhost:${PORT}`)
);
