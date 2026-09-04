import express from "express";
import {
  adminLogin,
  getAdminProfile,
  getAllAdmins,
  createAdmin,
  updateAdmin,
  changePassword,
  deleteAdmin,
} from "../controllers/adminController.js";
import { requireAdmin } from "../middleware/auth.js";

const router = express.Router();

// Public route - login (no auth required)
router.post("/login", adminLogin);

// Protected routes - auth required
router.get("/profile", requireAdmin, getAdminProfile);
router.get("/list", requireAdmin, getAllAdmins);
router.post("/create", requireAdmin, createAdmin);
router.put("/update/:id", requireAdmin, updateAdmin);
router.post("/change-password", requireAdmin, changePassword);
router.delete("/delete/:id", requireAdmin, deleteAdmin);

export default router;
