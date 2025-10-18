import express from "express";
import {
  sendNotification,
  getNotifications,
  markAsRead,
  updateDriverLocation,
  getAllDriverLocations,
} from "../controllers/notifyController.js";
import { verifyToken, requireRole } from "../middleware/authMiddleware.js";

const router = express.Router();

// Notifications
router.post(
  "/",
  verifyToken,
  requireRole("admin", "dispatcher"),
  sendNotification
);
router.get("/", verifyToken, getNotifications);
router.put("/read/:id", verifyToken, markAsRead);

// Tracking
router.post(
  "/tracking/update",
  verifyToken,
  requireRole("driver"),
  updateDriverLocation
);
router.get(
  "/tracking/drivers",
  verifyToken,
  requireRole("admin", "dispatcher"),
  getAllDriverLocations
);

export default router;
