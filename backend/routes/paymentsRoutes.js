import express from "express";
import {
  payCOD,
  payVNPay,
  payMomo,
  getPaymentHistory,
  getPaymentByShipment,
} from "../controllers/paymentsController.js";
import { verifyToken, requireRole } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/cod", verifyToken, requireRole("customer", "admin"), payCOD);
router.post("/vnpay", verifyToken, requireRole("customer", "admin"), payVNPay);
router.post("/momo", verifyToken, requireRole("customer", "admin"), payMomo);

router.get(
  "/history",
  verifyToken,
  requireRole("customer", "admin"),
  getPaymentHistory
);
router.get(
  "/:shipment_id",
  verifyToken,
  requireRole("admin", "customer"),
  getPaymentByShipment
);

export default router;
