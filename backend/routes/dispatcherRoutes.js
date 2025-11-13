import express from "express";
import {
  getUnassignedShipments,
  getAvailableDrivers,
  assignShipment,
  getAssignments,
  updateAssignmentStatus,
  reassignDriver,
  getDispatcherDashboard,
  getShipmentDetail,
} from "../controllers/dispatcherController.js";

const router = express.Router();

//  Đơn hàng chưa phân công
router.get("/shipments/unassigned", getUnassignedShipments);

// Lấy danh sách tài xế khả dụng
router.get("/drivers", getAvailableDrivers);

//  Phân công tài xế cho đơn
router.post("/assign", assignShipment);

//  Danh sách phân công
router.get("/assignments", getAssignments);

//  Cập nhật trạng thái phân công
router.put("/assignments/:id", updateAssignmentStatus);

//  Đổi tài xế
router.put("/assignments/:id/reassign", reassignDriver);

//  Dashboard điều phối viên
router.get("/dashboard", getDispatcherDashboard);

//  Chi tiết đơn hàng
router.get("/shipments/:id", getShipmentDetail);
router.patch("/assignments/:id/status", updateAssignmentStatus);

export default router;
