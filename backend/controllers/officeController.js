import Office from "../models/Office.js";
import { toJSON, toJSONArray } from "../utils/transform.js";

export const getOffices = async (req, res) => {
  // Only return non-deleted offices
  const offices = await Office.find({ deletedAt: null }).sort({ order: 1, createdAt: 1 });
  res.json({ success: true, data: toJSONArray(offices) });
};

export const createOffice = async (req, res) => {
  const { name, email, phone, address, imageUrl, order } = req.body;
  if (!name || !email) {
    return res.status(400).json({ success: false, error: "Name and email are required" });
  }
  const office = await Office.create({ name, email, phone, address, imageUrl, order });
  res.status(201).json({ success: true, data: toJSON(office) });
};

export const updateOffice = async (req, res) => {
  const office = await Office.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!office) {
    return res.status(404).json({ success: false, error: "Office not found" });
  }
  res.json({ success: true, data: toJSON(office) });
};

// Soft delete — sets deletedAt timestamp, record stays in DB
export const deleteOffice = async (req, res) => {
  const office = await Office.findByIdAndUpdate(
    req.params.id,
    { deletedAt: new Date() },
    { new: true }
  );
  if (!office) {
    return res.status(404).json({ success: false, error: "Office not found" });
  }
  res.json({ success: true, message: "Office soft-deleted" });
};

// Hard delete — permanently removes record and Cloudinary asset
export const hardDeleteOffice = async (req, res) => {
  const office = await Office.findByIdAndDelete(req.params.id);
  if (!office) {
    return res.status(404).json({ success: false, error: "Office not found" });
  }
  if (office.cloudinaryId) {
    try {
      await import('../config/cloudinary.js').then(mod =>
        mod.default.uploader.destroy(office.cloudinaryId, { resource_type: 'image' })
      );
    } catch (err) {
      console.error('Failed to delete Cloudinary asset for office', err);
    }
  }
  res.json({ success: true, message: "Office permanently deleted" });
};

