import express from "express";
import {
  getOffices,
  createOffice,
  updateOffice,
  deleteOffice,
  hardDeleteOffice,
} from "../controllers/officeController.js";
import { requireAdmin } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getOffices);
router.post("/", requireAdmin, createOffice);
router.put("/:id", requireAdmin, updateOffice);
router.delete("/:id", requireAdmin, deleteOffice);
router.delete("/:id/hard", requireAdmin, hardDeleteOffice);

export default router;
