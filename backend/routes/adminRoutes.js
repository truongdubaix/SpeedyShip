import express from "express";
import { getAdminStats } from "../controllers/adminController.js";
import {
  getAllCustomers,
  updateCustomerStatus,
  deleteCustomer,
} from "../controllers/adminCustomerController.js";

const router = express.Router();

// 📊 Dashboard thống kê
router.get("/stats", getAdminStats);

// 👥 Quản lý khách hàng
router.get("/customers", getAllCustomers);
router.put("/customers/:id", updateCustomerStatus);
router.delete("/customers/:id", deleteCustomer);

export default router;
