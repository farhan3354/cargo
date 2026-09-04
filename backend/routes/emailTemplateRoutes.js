import express from "express";
import {
  getTemplates,
  upsertTemplate,
  deleteTemplate,
} from "../controllers/emailTemplateController.js";
import { requireAdmin } from "../middleware/auth.js";

const router = express.Router();

router.get("/", requireAdmin, getTemplates);
router.post("/", requireAdmin, upsertTemplate);
router.delete("/:templateId", requireAdmin, deleteTemplate);

export default router;
