import express from "express";
import { getShipmentStats } from "../controllers/statsController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// 🧠 chỉ admin mới được xem thống kê
router.get("/shipments", verifyToken, getShipmentStats);

export default router;
