import express from "express";
import {
  getAllShipments,
  getShipmentById,
  createShipment,
  updateShipment,
  updateShipmentStatus,
  deleteShipment,
  assignShipment,
  getShipmentByCode,
} from "../controllers/shipmentController.js";

const router = express.Router();

router.get("/", getAllShipments);
router.get("/:id", getShipmentById);
router.post("/", createShipment);
router.put("/:id", updateShipment);
router.patch("/:id/status", updateShipmentStatus);
router.delete("/:id", deleteShipment);
router.post("/assign", assignShipment);
router.get("/code/:code", getShipmentByCode);

export default router;
