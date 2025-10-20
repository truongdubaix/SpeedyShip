import express from "express";
import {
  getAllDrivers,
  createDriver,
  updateDriver,
  deleteDriver,
  updateDriverStatus,
} from "../controllers/driverController.js";

const router = express.Router();

router.get("/", getAllDrivers);
router.post("/", createDriver);
router.put("/:id", updateDriver);
router.delete("/:id", deleteDriver);
router.patch("/:id/status", updateDriverStatus);

export default router;
