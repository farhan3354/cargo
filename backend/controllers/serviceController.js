import Service from "../models/Service.js";
import { toJSON, toJSONArray } from "../utils/transform.js";

export const getServices = async (req, res) => {
  const services = await Service.find().sort({ order: 1, createdAt: -1 });
  res.json({ success: true, data: toJSONArray(services) });
};

export const createService = async (req, res) => {
  const { title, description, imageUrl, cloudinaryId, order } = req.body;
  if (!title) {
    return res.status(400).json({ success: false, error: "Title is required" });
  }
  const service = await Service.create({ title, description, imageUrl, cloudinaryId, order });
  res.status(201).json({ success: true, data: toJSON(service) });
};

export const updateService = async (req, res) => {
  const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!service) {
    return res.status(404).json({ success: false, error: "Service not found" });
  }
  res.json({ success: true, data: toJSON(service) });
};

export const deleteService = async (req, res) => {
  const service = await Service.findByIdAndDelete(req.params.id);
  if (!service) {
    return res.status(404).json({ success: false, error: "Service not found" });
  }
  // Delete associated Cloudinary asset if cloudinaryId is present
  if (service.cloudinaryId) {
    try {
      await import('../config/cloudinary.js').then(mod => mod.default.uploader.destroy(service.cloudinaryId, { resource_type: 'image' }));
    } catch (err) {
      console.error('Failed to delete Cloudinary asset for service', err);
    }
  }
  res.json({ success: true, message: "Service deleted" });
};
