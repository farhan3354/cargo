import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import connectDB from "./config/db.js";
import { seedDatabase } from "./utils/seed.js";
import {
  parseAllowedOrigins,
  resolveCorsOrigin,
  createCorsHeaders,
} from "./middleware/cors.js";
import { errorHandler } from "./middleware/errorHandler.js";

import adminRoutes from "./routes/adminRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import officeRoutes from "./routes/officeRoutes.js";
import contentRoutes from "./routes/contentRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import smtpRoutes from "./routes/smtpRoutes.js";
import emailTemplateRoutes from "./routes/emailTemplateRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import aboutRoute from "./routes/aboutRoute.js";
import videoRoutes from "./routes/videoRoutes.js";

const app = express();
const allowedOrigins = parseAllowedOrigins(process.env.ALLOW_ORIGIN || "*");

app.use(
  cors({
    origin(origin, callback) {
      callback(null, resolveCorsOrigin(origin, allowedOrigins));
    },
  }),
);
app.use(express.json({ limit: "10mb" }));

connectDB().then(() => seedDatabase());

app.get("/health", (req, res) => {
  res.json({
    ok: true,
    service: "cargo-backend",
    time: new Date().toISOString(),
  });
});

app.get("/api/ping", (req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

app.use("/api/admin", adminRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/offices", officeRoutes);
app.use("/api/content", contentRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/smtp-accounts", smtpRoutes);
app.use("/api/email-templates", emailTemplateRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/about", aboutRoute);
app.use("/api/videos", videoRoutes);

app.use((req, res) => {
  res.status(404).json({ success: false, error: "Not found" });
});

app.use(errorHandler);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Cargo backend running on http://localhost:${PORT}`);
});
