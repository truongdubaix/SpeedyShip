import { Router } from "express";
import { auth } from "../middleware/authMiddleware.js";
import { hasRole } from "../middleware/roleMiddleware.js";
import {
  listUsers,
  getUser,
  updateUserStatus,
  assignRole,
} from "../controllers/userController.js";

const router = Router();

router.get("/", auth, hasRole("admin"), listUsers);
router.get("/:id", auth, hasRole("admin"), getUser);
router.patch("/:id/status", auth, hasRole("admin"), updateUserStatus);
router.post("/:id/role", auth, hasRole("admin"), assignRole);

export default router;
