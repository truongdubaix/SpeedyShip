import { Router } from "express";
import { auth } from "../middleware/authMiddleware.js";
import {
  listFeedbacks,
  createFeedback,
} from "../controllers/feedbackController.js";

const router = Router();

router.get("/", auth, listFeedbacks);
router.post("/", auth, createFeedback);

export default router;
