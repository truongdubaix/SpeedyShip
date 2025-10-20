import { Router } from "express";
import { auth } from "../middleware/authMiddleware.js";
import { hasRole } from "../middleware/roleMiddleware.js";
import {
  listDrivers,
  createDriver,
  updateDriver,
  removeDriver,
} from "../controllers/driverController.js";

const router = Router();

router.get("/", auth, hasRole("admin", "dispatcher"), listDrivers);
router.post("/", auth, hasRole("admin"), createDriver);
router.patch("/:id", auth, hasRole("admin"), updateDriver);
router.delete("/:id", auth, hasRole("admin"), removeDriver);

export default router;
