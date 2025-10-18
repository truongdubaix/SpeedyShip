import express from "express";
import {
  createShipment,
  getAllShipments,
  getShipmentById,
  assignDriver,
  updateStatus,
} from "../controllers/shipmentsController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", verifyToken, createShipment);
router.get("/", verifyToken, getAllShipments);
router.get("/:id", verifyToken, getShipmentById);
router.post("/assign", verifyToken, assignDriver);
router.post("/status", verifyToken, updateStatus);

export default router;
