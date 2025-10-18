import express from "express";
import {
  createFeedback,
  listFeedback,
  myFeedback,
  deleteFeedback,
} from "../controllers/feedbackController.js";
import { verifyToken, requireRole } from "../middleware/authMiddleware.js";

const router = express.Router();

// Customer gửi hoặc xem phản hồi
router.post("/", verifyToken, requireRole("customer"), createFeedback);
router.get("/my", verifyToken, requireRole("customer"), myFeedback);

// Admin xem hoặc xóa
router.get("/", verifyToken, requireRole("admin"), listFeedback);
router.delete("/:id", verifyToken, requireRole("admin"), deleteFeedback);

export default router;
