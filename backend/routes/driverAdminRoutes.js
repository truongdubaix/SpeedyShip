import express from "express";
import {
  getAllDrivers,
  getDriverById,
  createDriver,
  updateDriver,
  deleteDriver,
  updateDriverStatus,
} from "../controllers/driverAdminController.js";

import {
  applyDriver,
  getApplications,
  approveApplication,
  rejectApplication,
} from "../controllers/driverApplicationController.js";

const router = express.Router();

// ===========================
// ✅ PUBLIC: Ứng viên tự nộp đơn
// ===========================
router.post("/apply", applyDriver);

// ===========================
// ✅ ADMIN: Duyệt hồ sơ tài xế
// ===========================

// Lấy danh sách ứng viên
router.get("/applications", getApplications);

// Duyệt hồ sơ → tạo tài xế thật
router.post("/applications/:id/approve", approveApplication);

// Từ chối hồ sơ
router.post("/applications/:id/reject", rejectApplication);

// ===========================
// ✅ ADMIN: Quản lý tài xế như cũ
// ===========================

// Lấy danh sách tất cả tài xế
router.get("/", getAllDrivers);

// Lấy chi tiết 1 tài xế
router.get("/:id", getDriverById);

// Thêm tài xế mới
router.post("/", createDriver);

// Sửa thông tin tài xế
router.put("/:id", updateDriver);

// Xóa tài xế
router.delete("/:id", deleteDriver);

// Cập nhật trạng thái tài xế
router.patch("/:id/status", updateDriverStatus);

export default router;
