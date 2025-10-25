import express from "express";
import {
  getAllPayments,
  createPayment,
  updatePaymentStatus,
  createMomoPayment,
  momoIPN,
  deletePayment,
} from "../controllers/paymentController.js";

const router = express.Router();

// Lấy danh sách thanh toán
router.get("/", getAllPayments);

// Tạo thanh toán thường
router.post("/", createPayment);

// Cập nhật trạng thái
router.put("/:id", updatePaymentStatus);

// Thanh toán bằng MoMo
router.post("/momo", createMomoPayment);

// Nhận callback từ MoMo
router.post("/momo/callback", momoIPN);

// Xóa thanh toán
router.delete("/:id", deletePayment);

export default router;
