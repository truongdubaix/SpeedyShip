import express from "express";
import {
  startChat,
  getMessages,
  endChat,
} from "../controllers/chatController.js";

const router = express.Router();

// Bắt đầu chat
router.post("/start", startChat);

// Lấy danh sách tin nhắn theo chatId
router.get("/:chatId/messages", getMessages);

// Kết thúc chat
router.put("/:chatId/end", endChat);

export default router;
