import express from "express";
import {
  getAllShipments,
  getShipmentById,
  createShipment,
  updateShipment,
  updateShipmentStatus,
  deleteShipment,
  assignShipment,
} from "../controllers/shipmentController.js";

const router = express.Router();

router.get("/", getAllShipments);
router.get("/:id", getShipmentById); // ✅ route mới để xem chi tiết
router.post("/", createShipment);
router.put("/:id", updateShipment);
router.patch("/:id/status", updateShipmentStatus);
router.delete("/:id", deleteShipment);
router.post("/assign", assignShipment);

export default router;
