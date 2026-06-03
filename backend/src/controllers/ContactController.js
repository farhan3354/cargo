import ContactServices from "../models/Contact.js";
import smtpAccounts from "../config/smtpAccounts.js";
import { createTransporter } from "../config/nodemailer.js";
import { verifyCaptcha } from "../utils/captcha.js";

export const sendContact = async (req, res) => {
  try {
    const { name, email, subject, message, to, captchaInput, captchaHash } =
      req.body;

    // validation
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: "Missing fields" });
    }

    // captcha check
    if (!verifyCaptcha(captchaInput, captchaHash)) {
      return res.status(400).json({ success: false, error: "Invalid CAPTCHA" });
    }

    const recipient = to || smtpAccounts.default.user;
    const smtp = smtpAccounts[recipient] || smtpAccounts.default;

    // save to DB
    await ContactServices.create({
      name,
      email,
      subject,
      message,
      recipient,
    });

    const transporter = createTransporter(smtp);

    const mail = {
      from: `"Mango Cargo" <${smtp.user}>`,
      to: recipient,
      replyTo: email,
      subject: subject || "New Inquiry",
      text: `
Name: ${name}
Email: ${email}
Message: ${message}
      `,
    };

    await transporter.sendMail(mail);

    return res.json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};
