import express from "express";
import {
  getSmtpAccounts,
  createSmtpAccount,
  deleteSmtpAccount,
} from "../controllers/smtpController.js";
import { requireAdmin } from "../middleware/auth.js";

const router = express.Router();

router.get("/", requireAdmin, getSmtpAccounts);
router.post("/", requireAdmin, createSmtpAccount);
router.delete("/:id", requireAdmin, deleteSmtpAccount);

export default router;
