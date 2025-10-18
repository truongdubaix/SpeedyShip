import express from "express";
import {
  listVehicles,
  getVehicle,
  createVehicle,
  updateVehicle,
  deleteVehicle,
  assignDriverToVehicle,
  listAvailableVehicles,
} from "../controllers/vehiclesController.js";
import { verifyToken, requireRole } from "../middleware/authMiddleware.js";

const router = express.Router();

// Xem danh sách / chi tiết
router.get("/", verifyToken, requireRole("admin", "dispatcher"), listVehicles);
router.get(
  "/available",
  verifyToken,
  requireRole("admin", "dispatcher"),
  listAvailableVehicles
);
router.get("/:id", verifyToken, requireRole("admin", "dispatcher"), getVehicle);

// Tạo / cập nhật / xóa (Admin)
router.post("/", verifyToken, requireRole("admin"), createVehicle);
router.put("/:id", verifyToken, requireRole("admin"), updateVehicle);
router.delete("/:id", verifyToken, requireRole("admin"), deleteVehicle);

// Gán/bỏ gán tài xế (Admin/Dispatcher)
router.put(
  "/:id/assign-driver",
  verifyToken,
  requireRole("admin", "dispatcher"),
  assignDriverToVehicle
);

export default router;
