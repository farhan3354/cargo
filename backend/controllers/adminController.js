import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";


const JWT_EXPIRE = "24h";

/**
 * Admin Login
 * POST /api/admin/login
 */
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: "Email and password are required",
      });
    }

    // Find admin by email
    const admin = await Admin.findOne({ email: email.toLowerCase() });

    if (!admin) {
      return res.status(401).json({
        success: false,
        error: "Invalid email or password",
      });
    }

    if (!admin.isActive) {
      return res.status(403).json({
        success: false,
        error: "Admin account is disabled",
      });
    }

    // Compare passwords
    const passwordMatch = await admin.comparePassword(password);

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        error: "Invalid email or password",
      });
    }

    // Update lastLogin
    admin.lastLogin = new Date();
    await admin.save();

    // Generate JWT token
    const token = jwt.sign(
      {
        id: admin._id,
        email: admin.email,
        role: admin.role,
        fullName: admin.fullName,
      },
      process.env.JWT_SECRET || "your-secret-key-change-in-production",
      { expiresIn: JWT_EXPIRE }
    );

    res.json({
      success: true,
      token,
      admin: {
        id: admin._id,
        email: admin.email,
        fullName: admin.fullName,
        role: admin.role,
      },
      message: "Login successful",
    });
  } catch (error) {
    console.error("[admin] login error:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

/**
 * Get Current Admin Profile
 * GET /api/admin/profile
 */
export const getAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id).select("-password");
    if (!admin) {
      return res.status(404).json({ success: false, error: "Admin not found" });
    }
    res.json({ success: true, data: admin });
  } catch (error) {
    console.error("[admin] getAdminProfile error:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

/**
 * Get All Admins (superadmin only)
 * GET /api/admin/list
 */
export const getAllAdmins = async (req, res) => {
  try {
    // Check if user is superadmin
    if (req.admin.role !== "superadmin") {
      return res.status(403).json({
        success: false,
        error: "Only superadmin can view all admins",
      });
    }

    const admins = await Admin.find({}).select("-password");
    res.json({ success: true, data: admins });
  } catch (error) {
    console.error("[admin] getAllAdmins error:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

/**
 * Create New Admin (superadmin only)
 * POST /api/admin/create
 */
export const createAdmin = async (req, res) => {
  try {
    // Check if user is superadmin
    if (req.admin.role !== "superadmin") {
      return res.status(403).json({
        success: false,
        error: "Only superadmin can create admins",
      });
    }

    const { email, password, fullName, role = "admin" } = req.body;

    if (!email || !password || !fullName) {
      return res.status(400).json({
        success: false,
        error: "Email, password, and fullName are required",
      });
    }

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({
      email: email.toLowerCase(),
    });

    if (existingAdmin) {
      return res.status(409).json({
        success: false,
        error: "Admin with this email already exists",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        error: "Password must be at least 8 characters",
      });
    }

    const newAdmin = new Admin({
      email: email.toLowerCase(),
      password,
      fullName,
      role: role === "superadmin" ? "superadmin" : "admin",
    });

    await newAdmin.save();

    res.status(201).json({
      success: true,
      data: newAdmin.toJSON(),
      message: "Admin created successfully",
    });
  } catch (error) {
    console.error("[admin] createAdmin error:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

/**
 * Update Admin (superadmin can update any, admin can update self)
 * PUT /api/admin/update/:id
 */
export const updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullName, role, isActive } = req.body;

    // Check permissions
    if (req.admin.id !== id && req.admin.role !== "superadmin") {
      return res.status(403).json({
        success: false,
        error: "Cannot update other admins",
      });
    }

    const updateData = {};
    if (fullName) updateData.fullName = fullName;
    if (isActive !== undefined && req.admin.role === "superadmin") {
      updateData.isActive = isActive;
    }
    if (role && req.admin.role === "superadmin") {
      updateData.role = role === "superadmin" ? "superadmin" : "admin";
    }

    const admin = await Admin.findByIdAndUpdate(id, updateData, {
      new: true,
    }).select("-password");

    if (!admin) {
      return res.status(404).json({ success: false, error: "Admin not found" });
    }

    res.json({
      success: true,
      data: admin,
      message: "Admin updated successfully",
    });
  } catch (error) {
    console.error("[admin] updateAdmin error:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

/**
 * Change Admin Password
 * POST /api/admin/change-password
 */
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        error: "Current password and new password are required",
      });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        error: "New password must be at least 8 characters",
      });
    }

    const admin = await Admin.findById(req.admin.id);

    if (!admin) {
      return res.status(404).json({ success: false, error: "Admin not found" });
    }

    // Verify current password
    const passwordMatch = await admin.comparePassword(currentPassword);

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        error: "Current password is incorrect",
      });
    }

    admin.password = newPassword;
    await admin.save();

    res.json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error("[admin] changePassword error:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

/**
 * Delete Admin (superadmin only)
 * DELETE /api/admin/delete/:id
 */
export const deleteAdmin = async (req, res) => {
  try {
    if (req.admin.role !== "superadmin") {
      return res.status(403).json({
        success: false,
        error: "Only superadmin can delete admins",
      });
    }

    // Prevent deleting self
    if (req.admin.id === req.params.id) {
      return res.status(400).json({
        success: false,
        error: "Cannot delete your own account",
      });
    }

    const admin = await Admin.findByIdAndDelete(req.params.id);

    if (!admin) {
      return res.status(404).json({ success: false, error: "Admin not found" });
    }

    res.json({
      success: true,
      message: "Admin deleted successfully",
    });
  } catch (error) {
    console.error("[admin] deleteAdmin error:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
