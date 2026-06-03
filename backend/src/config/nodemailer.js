import nodemailer from "nodemailer";

export const createTransporter = (smtp) => {
  return nodemailer.createTransport({
    host: smtp.host,
    port: smtp.port || 465,
    secure: smtp.secure ?? true,
    auth: {
      user: smtp.user,
      pass: smtp.pass,
    },
  });
};
