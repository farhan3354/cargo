import express from "express";
import multer from "multer";
import {
  uploadMedia,
  deleteMedia,
  getCloudinaryConfig,
} from "../controllers/uploadController.js";
import { requireAdmin } from "../middleware/auth.js";

const router = express.Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 },
});

router.get("/config", getCloudinaryConfig);
router.post("/", requireAdmin, upload.single("file"), uploadMedia);
router.delete("/", requireAdmin, deleteMedia);

export default router;
