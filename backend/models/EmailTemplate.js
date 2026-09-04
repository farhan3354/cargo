import mongoose from "mongoose";

const emailTemplateSchema = new mongoose.Schema(
  {
    templateId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    subject: { type: String, required: true },
    htmlContent: { type: String, required: true },
    plainTextContent: { type: String, required: true },
    variables: [String],
  },
  { timestamps: true },
);

export default mongoose.model("EmailTemplate", emailTemplateSchema);
