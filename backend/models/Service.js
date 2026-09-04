import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    imageUrl: String,
    cloudinaryId: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Service", serviceSchema);
