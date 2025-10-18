import express from "express";
import {
  listDrivers,
  getDriver,
  createDriver,
  updateDriver,
  deleteDriver,
  listDriverShipments,
} from "../controllers/driversController.js";
import { verifyToken, requireRole } from "../middleware/authMiddleware.js";

const router = express.Router();

// Admin/Dispatcher xem danh sách & chi tiết
router.get("/", verifyToken, requireRole("admin", "dispatcher"), listDrivers);
router.get("/:id", verifyToken, requireRole("admin", "dispatcher"), getDriver);
router.get(
  "/:id/shipments",
  verifyToken,
  requireRole("admin", "dispatcher"),
  listDriverShipments
);

// Admin tạo/sửa/xóa tài xế
router.post("/", verifyToken, requireRole("admin"), createDriver);
router.put("/:id", verifyToken, requireRole("admin"), updateDriver);
router.delete("/:id", verifyToken, requireRole("admin"), deleteDriver);

export default router;
