import { Router } from "express";
import { auth } from "../middleware/authMiddleware.js";
import { hasRole } from "../middleware/roleMiddleware.js";
import {
  listPayments,
  getPaymentById,
  createPayment,
  updatePaymentStatus,
} from "../controllers/paymentController.js";

const router = Router();

// Lấy danh sách tất cả thanh toán (admin)
router.get("/", auth, hasRole("admin"), listPayments);

// Lấy chi tiết 1 thanh toán
router.get("/:id", auth, getPaymentById);

// Tạo thanh toán (customer hoặc hệ thống tạo khi thanh toán đơn hàng)
router.post("/", auth, createPayment);

// Cập nhật trạng thái thanh toán
router.patch("/:id/status", auth, hasRole("admin"), updatePaymentStatus);

export default router;
