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

// Lấy tất cả đơn hàng
router.get("/", getAllShipments);

// Lấy đơn hàng theo ID
router.get("/:id", getShipmentById);

// Tạo đơn hàng mới
router.post("/", createShipment);

// Cập nhật đơn hàng
router.put("/:id", updateShipment);

// Cập nhật trạng thái đơn hàng
router.patch("/:id/status", updateShipmentStatus);

// Xoá đơn hàng
router.delete("/:id", deleteShipment);

// Gán đơn hàng cho tài xế
router.post("/assign", assignShipment);

// Lấy đơn hàng theo mã vận đơn (tracking_code)
router.get("/code/:code", getShipmentByCode);

export default router;
