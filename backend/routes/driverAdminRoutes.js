import express from "express";
import {
  getAllDrivers,
  getDriverById,
  createDriver,
  updateDriver,
  deleteDriver,
  updateDriverStatus,
} from "../controllers/driverAdminController.js";

const router = express.Router();

// 📋 Lấy danh sách tất cả tài xế
router.get("/", getAllDrivers);

// 🔍 Lấy chi tiết 1 tài xế
router.get("/:id", getDriverById);

// ➕ Thêm tài xế mới
router.post("/", createDriver);

// ✏️ Sửa thông tin tài xế
router.put("/:id", updateDriver);

// ❌ Xóa tài xế
router.delete("/:id", deleteDriver);

// 🔄 Cập nhật trạng thái tài xế (available / delivering / inactive)
router.patch("/:id/status", updateDriverStatus);

export default router;
