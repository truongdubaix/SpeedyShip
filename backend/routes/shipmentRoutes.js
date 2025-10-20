import express from "express";
import {
  getAllShipments,
  createShipment,
  updateShipment,
  updateShipmentStatus,
  deleteShipment,
} from "../controllers/shipmentController.js";

const router = express.Router();

// Định nghĩa các route CRUD
router.get("/", getAllShipments);
router.post("/", createShipment);
router.put("/:id", updateShipment);
router.patch("/:id/status", updateShipmentStatus);
router.delete("/:id", deleteShipment);

export default router;
