import SmtpAccount from "../models/SmtpAccount.js";
import { toJSON, toJSONArray } from "../utils/transform.js";

export const getSmtpAccounts = async (req, res) => {
  const accounts = await SmtpAccount.find().sort({ createdAt: 1 });
  res.json({ success: true, data: toJSONArray(accounts) });
};

export const createSmtpAccount = async (req, res) => {
  const { name, email, host, port, user, pass, secure, from } = req.body;
  if (!name || !email || !host || !user || !pass) {
    return res.status(400).json({ success: false, error: "Missing required fields" });
  }
  const account = await SmtpAccount.create({ name, email, host, port, user, pass, secure, from });
  res.status(201).json({ success: true, data: toJSON(account) });
};

export const deleteSmtpAccount = async (req, res) => {
  const account = await SmtpAccount.findByIdAndDelete(req.params.id);
  if (!account) {
    return res.status(404).json({ success: false, error: "Account not found" });
  }
  res.json({ success: true, message: "Account deleted" });
};
