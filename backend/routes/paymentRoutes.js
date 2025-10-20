import express from "express";
import {
  getAllPayments,
  createPayment,
  updatePaymentStatus,
  deletePayment,
} from "../controllers/paymentController.js";

const router = express.Router();

router.get("/", getAllPayments);
router.post("/", createPayment);
router.put("/:id", updatePaymentStatus);
router.delete("/:id", deletePayment);

export default router;
