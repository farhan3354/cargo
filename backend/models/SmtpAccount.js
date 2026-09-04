import mongoose from "mongoose";

const smtpAccountSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    host: { type: String, required: true },
    port: { type: Number, default: 587 },
    user: { type: String, required: true },
    pass: { type: String, required: true },
    secure: { type: Boolean, default: false },
    from: String,
  },
  { timestamps: true },
);

export default mongoose.model("SmtpAccount", smtpAccountSchema);
