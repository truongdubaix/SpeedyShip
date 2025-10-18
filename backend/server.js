import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { db } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import shipmentRoutes from "./routes/shipmentsRoutes.js";
import driversRoutes from "./routes/driversRoutes.js";
import vehiclesRoutes from "./routes/vehiclesRoutes.js";
import paymentsRoutes from "./routes/paymentsRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import notifyRoutes from "./routes/notifyRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/shipments", shipmentRoutes);
app.use("/api/drivers", driversRoutes);
app.use("/api/vehicles", vehiclesRoutes);
app.use("/api/payments", paymentsRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/notifications", notifyRoutes);

app.get("/", (req, res) => res.send("🚚 SpeedyShip API đang hoạt động"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server chạy tại cổng ${PORT}`));
