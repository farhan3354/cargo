import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Admin from "../models/Admin.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/cargo";

async function createAdmin() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    const email = "admin@manarcargo.com";
    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      console.log(`Admin ${email} already exists.`);
    } else {
      const newAdmin = new Admin({
        email,
        password: "cargo123", // Will be hashed by pre-save hook
        fullName: "Super Admin",
        role: "superadmin"
      });
      await newAdmin.save();
      console.log(`Created admin user: ${email} / cargo123`);
    }
  } catch (err) {
    console.error("Error creating admin:", err);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

createAdmin();
