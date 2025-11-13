import express from "express";
import {
  getAllVehicles,
  getAvailableVehicles,
} from "../controllers/vehicleController.js";

const router = express.Router();

// Lấy tất cả xe
router.get("/", getAllVehicles);

//  Lấy các xe còn trống (chưa gán cho tài xế)
router.get("/available", getAvailableVehicles);

export default router;
