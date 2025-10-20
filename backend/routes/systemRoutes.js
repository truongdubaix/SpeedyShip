import { Router } from "express";
import { auth } from "../middleware/authMiddleware.js";
import { hasRole } from "../middleware/roleMiddleware.js";
import { getConfigs, setConfig } from "../controllers/systemController.js";

const router = Router();

router.get("/", auth, hasRole("admin"), getConfigs);
router.post("/", auth, hasRole("admin"), setConfig);

export default router;
