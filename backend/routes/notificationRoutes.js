import express from "express";
import {
  getDriverNotifications,
  getDispatcherNotifications,
  markNotificationRead,
} from "../controllers/notificationController.js";

const router = express.Router();

// Lấy thông báo cho DRIVER
router.get("/driver/:id", getDriverNotifications);

// Lấy thông báo cho DISPATCHER
router.get("/dispatcher/:id", getDispatcherNotifications);

// Đánh dấu đã đọc
router.put("/:id/read", markNotificationRead);

export default router;
