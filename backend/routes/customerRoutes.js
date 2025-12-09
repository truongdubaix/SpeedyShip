import express from "express";
import {
  getCustomerProfile,
  updateCustomerProfile,
  createShipment,
  getShipmentsByCustomer,
  createFeedback,
  trackShipment,
  getShipmentDetail,
} from "../controllers/customerController.js";

const router = express.Router();

// ===============================
//  HỒ SƠ KHÁCH HÀNG
// ===============================
router.get("/profile/:id", getCustomerProfile);
router.put("/profile/:id", updateCustomerProfile);

// ===============================
//  ĐƠN HÀNG
// ===============================

// Tạo đơn hàng
router.post("/shipments", createShipment);

// Lấy danh sách đơn theo customer
router.get("/shipments/customer/:customer_id", getShipmentsByCustomer);

// Lấy chi tiết một đơn
router.get("/shipment/:id", getShipmentDetail);

// Tra cứu theo tracking code
router.get("/track/:code", trackShipment);

// ===============================
//  FEEDBACK
// ===============================
router.post("/feedback", createFeedback);

export default router;
