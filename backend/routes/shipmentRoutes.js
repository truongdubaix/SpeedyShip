import { Router } from "express";
import { auth } from "../middleware/authMiddleware.js";
import { hasRole } from "../middleware/roleMiddleware.js";
import {
  listShipments,
  createShipment,
  updateShipmentStatus,
  timeline,
  createStatusLog,
} from "../controllers/shipmentController.js";

const router = Router();

// admin, dispatcher xem hết; customer xem của mình; driver xem của mình (ở FE bạn lọc theo vai)
router.get("/", auth, listShipments);
router.post("/", auth, createShipment);
router.patch("/:id/status", auth, updateShipmentStatus);

// timeline
router.get("/:id/timeline", auth, timeline);
router.post("/:id/timeline", auth, createStatusLog);

export default router;
