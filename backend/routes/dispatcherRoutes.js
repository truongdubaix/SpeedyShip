import express from "express";
import {
  getUnassignedShipments,
  getAvailableDrivers,
  assignShipment,
  getAssignments,
  updateAssignmentStatus,
  reassignDriver,
} from "../controllers/dispatcherController.js";

const router = express.Router();

router.get("/shipments/unassigned", getUnassignedShipments);
router.get("/drivers", getAvailableDrivers);
router.post("/assign", assignShipment);
router.get("/assignments", getAssignments);
router.patch("/assignments/:id/status", updateAssignmentStatus);
router.patch("/assignments/:id/reassign", reassignDriver);

export default router;
