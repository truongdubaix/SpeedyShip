import express from "express";
import {
  getSummaryReport,
  getMonthlyReport,
  getTopDrivers,
} from "../controllers/reportController.js";
import { verifyToken, requireRole } from "../middleware/authMiddleware.js";

const router = express.Router();

// Admin / Dispatcher được phép xem báo cáo
router.get(
  "/summary",
  verifyToken,
  requireRole("admin", "dispatcher"),
  getSummaryReport
);
router.get(
  "/monthly",
  verifyToken,
  requireRole("admin", "dispatcher"),
  getMonthlyReport
);
router.get(
  "/top-drivers",
  verifyToken,
  requireRole("admin", "dispatcher"),
  getTopDrivers
);

export default router;
