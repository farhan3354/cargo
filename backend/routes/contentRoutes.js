import express from "express";
import {
  getContent,
  getContentMap,
  upsertContent,
  bulkUpsertContent,
  deleteContent,
} from "../controllers/contentController.js";
import { requireAdmin } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getContent);
router.get("/map", getContentMap);
router.post("/", requireAdmin, upsertContent);
router.post("/bulk", requireAdmin, bulkUpsertContent);
router.delete("/:key", requireAdmin, deleteContent);

export default router;
