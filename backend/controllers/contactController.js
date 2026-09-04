import nodemailer from "nodemailer";
import ContactSubmission from "../models/ContactSubmission.js";
import { verifyCaptcha } from "../utils/captcha.js";
import { toJSON, toJSONArray } from "../utils/transform.js";

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function isValidEmail(value) {
  return Boolean(value && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
}

function buildMailHtml({ name, email, subject, message }) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
      <h2 style="color: #1F2288; border-bottom: 2px solid #1F2288; padding-bottom: 10px; margin-top: 0;">New Website Inquiry</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
      <p><strong>Subject:</strong> ${escapeHtml(subject || "")}</p>
      <div style="background-color: #f8fafc; padding: 15px; border-left: 4px solid #1F2288; margin-top: 20px; border-radius: 4px;">
        <p style="margin: 0; font-weight: bold; color: #475569; margin-bottom: 8px;">Message:</p>
        <p style="margin: 0; white-space: pre-wrap; line-height: 1.6; color: #1e293b;">${escapeHtml(message)}</p>
      </div>
    </div>
  `;
}

async function sendContactEmail({ name, email, subject, message, to }) {
  const receiverEmail = isValidEmail(to)
    ? to
    : isValidEmail(process.env.CONTACT_RECEIVER_EMAIL)
      ? process.env.CONTACT_RECEIVER_EMAIL
      : "dubai@manarcargo.com";

  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (!smtpHost || !smtpUser || !smtpPass) {
    console.log("[contact] SMTP not configured, submission saved without email:", {
      name,
      email,
      receiverEmail,
    });
    return { simulated: true };
  }

  const smtpPort = parseInt(process.env.SMTP_PORT || "587", 10);
  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: process.env.SMTP_SECURE === "true" || smtpPort === 465,
    auth: { user: smtpUser, pass: smtpPass },
  });

  const webFrom =
    process.env.WEB_FROM_EMAIL || process.env.SMTP_FROM || "noreply@manarcargo.com";

  await transporter.sendMail({
    from: `"Manar Cargo Website" <${webFrom}>`,
    to: receiverEmail,
    replyTo: email,
    subject: `[Manar Cargo Inquiry] ${subject || "Website Inquiry"}`,
    text:
      `New inquiry from the website contact form:\n\n` +
      `Name: ${name}\nEmail: ${email}\nSubject: ${subject || ""}\n\nMessage:\n${message}\n`,
    html: buildMailHtml({ name, email, subject, message }),
  });

  return { simulated: false };
}

export const sendContact = async (req, res) => {
  try {
    const { name, email, subject, message, captchaInput, captchaHash, to, officeTag } =
      req.body || {};

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: "All fields are required." });
    }

    if (!verifyCaptcha(captchaInput, captchaHash)) {
      return res.status(400).json({
        success: false,
        error: "Invalid CAPTCHA code. Please try again.",
      });
    }

    const recipient = isValidEmail(to) ? to : process.env.CONTACT_RECEIVER_EMAIL;

    const submission = await ContactSubmission.create({
      name,
      email,
      subject: subject || officeTag || "Website Inquiry",
      message,
      recipient,
      status: "pending",
    });

    let simulated = false;
    try {
      const result = await sendContactEmail({
        name,
        email,
        subject: submission.subject,
        message,
        to: recipient,
      });
      simulated = result.simulated;
    } catch (mailError) {
      console.error("[contact] email send failed:", mailError);
    }

    res.status(201).json({
      success: true,
      data: toJSON(submission),
      message: simulated
        ? "Your message has been received. Email delivery is simulated until SMTP is configured."
        : "Your message has been sent successfully!",
      simulated,
    });
  } catch (error) {
    console.error("[contact] sendContact error:", error);
    res.status(500).json({ success: false, error: "Internal server error." });
  }
};

export const getSubmissions = async (req, res) => {
  const { status } = req.query;
  const filter = status ? { status } : {};
  const submissions = await ContactSubmission.find(filter).sort({ createdAt: -1 });
  res.json({ success: true, data: toJSONArray(submissions) });
};

export const updateSubmissionStatus = async (req, res) => {
  const { status } = req.body;
  if (!status) {
    return res.status(400).json({ success: false, error: "Status is required" });
  }

  const submission = await ContactSubmission.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true, runValidators: true },
  );

  if (!submission) {
    return res.status(404).json({ success: false, error: "Submission not found" });
  }

  res.json({ success: true, data: toJSON(submission) });
};

export const deleteSubmission = async (req, res) => {
  const submission = await ContactSubmission.findByIdAndDelete(req.params.id);
  if (!submission) {
    return res.status(404).json({ success: false, error: "Submission not found" });
  }
  res.json({ success: true, message: "Submission deleted" });
};
