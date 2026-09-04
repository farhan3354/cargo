import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import EmailTemplate from "./models/EmailTemplate.js";

dotenv.config();

const templates = [
  {
    templateId: "contact_confirmation",
    name: "Contact Form - Customer Confirmation",
    subject: "We received your message – Manar Al Khair Cargo",
    htmlContent: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#f9f9f9;padding:30px;border-radius:8px;">
  <div style="background:#1F2288;padding:20px;border-radius:8px 8px 0 0;text-align:center;">
    <h1 style="color:#fff;margin:0;font-size:22px;">MANAR ALKHAIR CARGO L.L.C</h1>
  </div>
  <div style="background:#fff;padding:30px;border-radius:0 0 8px 8px;">
    <p style="color:#333;font-size:15px;">Dear <strong>{{name}}</strong>,</p>
    <p style="color:#555;font-size:14px;line-height:1.6;">
      Thank you for contacting us. We have received your message and our team will get back to you within <strong>1-2 business days</strong>.
    </p>
    <p style="color:#555;font-size:14px;line-height:1.6;"><strong>Your message:</strong><br/>{{message}}</p>
    <hr style="border:none;border-top:1px solid #eee;margin:20px 0;"/>
    <p style="color:#888;font-size:12px;">
      Manar Al Khair Cargo L.L.C · Dubai, United Arab Emirates<br/>
      Phone: +971 52 397 9396 · Email: info@manarcargo.com
    </p>
  </div>
</div>`,
    plainTextContent: `Dear {{name}},\n\nThank you for contacting us. We have received your message and our team will get back to you within 1-2 business days.\n\nYour message:\n{{message}}\n\nBest regards,\nManar Al Khair Cargo L.L.C\nDubai, UAE\nPhone: +971 52 397 9396`,
    variables: ["name", "message", "email"],
  },
  {
    templateId: "contact_admin_notification",
    name: "Contact Form - Admin Notification",
    subject: "New contact form submission – {{name}}",
    htmlContent: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#f9f9f9;padding:30px;border-radius:8px;">
  <div style="background:#110713;padding:20px;border-radius:8px 8px 0 0;">
    <h1 style="color:#fff;margin:0;font-size:20px;">📬 New Contact Submission</h1>
  </div>
  <div style="background:#fff;padding:30px;border-radius:0 0 8px 8px;">
    <table style="width:100%;border-collapse:collapse;font-size:14px;">
      <tr><td style="padding:8px;color:#666;width:120px;"><strong>Name</strong></td><td style="padding:8px;color:#333;">{{name}}</td></tr>
      <tr style="background:#f9f9f9;"><td style="padding:8px;color:#666;"><strong>Email</strong></td><td style="padding:8px;color:#333;">{{email}}</td></tr>
      <tr><td style="padding:8px;color:#666;"><strong>Phone</strong></td><td style="padding:8px;color:#333;">{{phone}}</td></tr>
      <tr style="background:#f9f9f9;"><td style="padding:8px;color:#666;"><strong>Subject</strong></td><td style="padding:8px;color:#333;">{{subject}}</td></tr>
      <tr><td style="padding:8px;color:#666;vertical-align:top;"><strong>Message</strong></td><td style="padding:8px;color:#333;">{{message}}</td></tr>
    </table>
    <p style="color:#888;font-size:12px;margin-top:20px;">Received at {{timestamp}}</p>
  </div>
</div>`,
    plainTextContent: `New Contact Submission\n\nName: {{name}}\nEmail: {{email}}\nPhone: {{phone}}\nSubject: {{subject}}\nMessage:\n{{message}}\n\nReceived: {{timestamp}}`,
    variables: ["name", "email", "phone", "subject", "message", "timestamp"],
  },
  {
    templateId: "quote_request",
    name: "Quote Request - Customer Confirmation",
    subject: "Your cargo quote request received – Manar Al Khair Cargo",
    htmlContent: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#f9f9f9;padding:30px;border-radius:8px;">
  <div style="background:#1F2288;padding:20px;border-radius:8px 8px 0 0;text-align:center;">
    <h1 style="color:#fff;margin:0;font-size:22px;">MANAR ALKHAIR CARGO L.L.C</h1>
  </div>
  <div style="background:#fff;padding:30px;border-radius:0 0 8px 8px;">
    <p style="color:#333;font-size:15px;">Dear <strong>{{name}}</strong>,</p>
    <p style="color:#555;font-size:14px;line-height:1.6;">
      Thank you for requesting a cargo quote. Our logistics team will review your request and send you a detailed quote within <strong>24 hours</strong>.
    </p>
    <div style="background:#f0f4ff;border-left:4px solid #1F2288;padding:15px;margin:20px 0;border-radius:0 4px 4px 0;">
      <p style="margin:0;color:#1F2288;font-size:14px;font-weight:bold;">Your Quote Reference: {{reference}}</p>
    </div>
    <p style="color:#555;font-size:14px;">For urgent inquiries, please call us at <strong>+971 52 397 9396</strong>.</p>
    <hr style="border:none;border-top:1px solid #eee;margin:20px 0;"/>
    <p style="color:#888;font-size:12px;">Manar Al Khair Cargo L.L.C · Dubai, UAE</p>
  </div>
</div>`,
    plainTextContent: `Dear {{name}},\n\nThank you for requesting a cargo quote. Your reference number is: {{reference}}\n\nOur team will send you a detailed quote within 24 hours.\n\nFor urgent inquiries: +971 52 397 9396\n\nBest regards,\nManar Al Khair Cargo L.L.C`,
    variables: ["name", "email", "reference"],
  },
];

const seedTemplates = async () => {
  try {
    await connectDB();

    for (const tpl of templates) {
      await EmailTemplate.findOneAndUpdate(
        { templateId: tpl.templateId },
        { $setOnInsert: tpl },
        { upsert: true, new: true },
      );
    }

    console.log(`✅ Seeded ${templates.length} email templates successfully!`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding email templates:", error);
    process.exit(1);
  }
};

seedTemplates();
