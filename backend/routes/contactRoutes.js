import express from "express";
import {
  createContact,
  getAllContacts,
  assignDispatcher,
  updateContactStatus,
  getContactsByDispatcher,
} from "../controllers/contactController.js";

const router = express.Router();

//  Khách hàng gửi liên hệ
router.post("/", createContact);

//  Admin xem tất cả
router.get("/", getAllContacts);

//  Admin giao điều phối viên
router.patch("/:id/assign", assignDispatcher);

//  Dispatcher xem các liên hệ được giao
router.get("/dispatcher/:dispatcher_id", getContactsByDispatcher);

// Dispatcher cập nhật trạng thái
router.patch("/:id/status", updateContactStatus);

export default router;
