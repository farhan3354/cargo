const smtpAccounts = {
  receiver: process.env.CONTACT_RECEIVER_EMAIL || "dubai@manarcargo.com",
  default: {
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "587", 10),
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
    secure: process.env.SMTP_SECURE === "true",
    from: process.env.WEB_FROM_EMAIL,
  },
};

export default smtpAccounts;
