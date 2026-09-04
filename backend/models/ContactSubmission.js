import mongoose from "mongoose";

const contactSubmissionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: String,
    message: { type: String, required: true },
    recipient: String,
    status: { type: String, default: "pending" },
  },
  { timestamps: true },
);

export default mongoose.model("ContactSubmission", contactSubmissionSchema);
