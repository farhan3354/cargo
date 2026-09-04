import mongoose from "mongoose";

const siteContentSchema = new mongoose.Schema(
  {
    section: { type: String, required: true },
    key: { type: String, required: true, unique: true },
    value: { type: String, default: "" },
    type: { type: String, default: "text" },
    description: String,
  },
  { timestamps: true },
);

export default mongoose.model("SiteContent", siteContentSchema);
