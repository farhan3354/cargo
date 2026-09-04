import mongoose from "mongoose";

const officeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: String,
    address: String,
    imageUrl: String,
    cloudinaryId: { type: String },
    order: { type: Number, default: 0 },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true },
);

export default mongoose.model("Office", officeSchema);
