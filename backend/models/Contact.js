import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    subject: String,
    message: String,
    recipient: String,
  },
  { timestamps: true },
);

export default mongoose.model("ContactServices", contactSchema);
