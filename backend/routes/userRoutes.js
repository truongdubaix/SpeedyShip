import express from "express";
import {
  getAllUsers,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

// Lấy danh sách tất cả user
router.get("/", getAllUsers);

// Cập nhật role hoặc trạng thái
router.put("/:id", updateUser);

// Xóa người dùng
router.delete("/:id", deleteUser);

export default router;
