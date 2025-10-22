import express from "express";
import {
  getDriverDashboard,
  getDriverAssignments,
  getDriverHistory,
  updateDriverShipmentStatus,
  getDriverProfile,
} from "../controllers/driverController.js";
import { changeDriverPassword } from "../controllers/driverController.js";

const router = express.Router();

// 📊 Dashboard tài xế
router.get("/dashboard/:id", getDriverDashboard);

// 🚚 Danh sách đơn hàng theo tài xế
router.get("/assignments/:id", getDriverAssignments);

// 🧾 Lịch sử giao hànga
router.get("/history/:id", getDriverHistory);

// 👤 Hồ sơ tài xế
router.get("/profile/:id", getDriverProfile);

// 🔄 Cập nhật trạng thái đơn hàng
router.patch("/shipments/:shipment_id/status", updateDriverShipmentStatus);
// Đổi mật khẩu tài xế
router.patch("/password/:id", changeDriverPassword);
export default router;
