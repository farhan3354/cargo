import express from "express";
import { getServices, createService, updateService, deleteService } from "../controllers/serviceController.js";
import { requireAdmin } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getServices);
router.post("/", requireAdmin, createService);
router.put("/:id", requireAdmin, updateService);
router.delete("/:id", requireAdmin, deleteService);

export default router;
