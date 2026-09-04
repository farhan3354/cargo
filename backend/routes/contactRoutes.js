import express from "express";
import {
  sendContact,
  getSubmissions,
  updateSubmissionStatus,
  deleteSubmission,
} from "../controllers/contactController.js";
import { requireAdmin } from "../middleware/auth.js";

const router = express.Router();

router.post("/", sendContact);
router.post("/form", sendContact);

router.get("/submissions", requireAdmin, getSubmissions);
router.patch("/submissions/:id", requireAdmin, updateSubmissionStatus);
router.delete("/submissions/:id", requireAdmin, deleteSubmission);

export default router;
