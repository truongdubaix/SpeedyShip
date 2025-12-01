import { Router } from "express";
import {
  getAllPayments,
  createPayment,
  updatePaymentStatus,
  createMomoPayment,
  momoIPN,
  deletePayment,
} from "../controllers/paymentController.js";

const router = Router();

// Lấy danh sách thanh toán
router.get("/", getAllPayments);

// Tạo thanh toán thường
router.post("/", createPayment);

// Cập nhật trạng thái thanh toán
router.put("/:id", updatePaymentStatus);

// Thanh toán MoMo
router.post("/momo", createMomoPayment);

// Callback IPN từ MoMo
router.post("/momo/callback", momoIPN);

// Xóa thanh toán
router.delete("/:id", deletePayment);

export default router;
