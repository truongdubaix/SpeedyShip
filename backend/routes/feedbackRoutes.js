import express from "express";
import {
  createFeedback,
  getAllFeedbacks,
  deleteFeedback,
} from "../controllers/feedbackController.js";

const router = express.Router();

//Tạo Feedback
router.post("/", createFeedback);

//Lấy tất cả đánh giá
router.get("/", getAllFeedbacks);

//Xóa đánh giá
router.delete("/:id", deleteFeedback);

export default router;
