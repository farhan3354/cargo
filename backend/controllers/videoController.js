import Video from "../models/Video.js";
import { toJSON, toJSONArray } from "../utils/transform.js";

export const getVideos = async (req, res) => {
  const videos = await Video.find().sort({ order: 1, createdAt: -1 });
  res.json({ success: true, data: toJSONArray(videos) });
};

export const createVideo = async (req, res) => {
  const { title, description, cloudinaryId, url, thumbnail, order } = req.body;
  if (!title || !cloudinaryId || !url) {
    return res.status(400).json({ success: false, error: "Missing required fields" });
  }
  const video = await Video.create({ title, description, cloudinaryId, url, thumbnail, order });
  res.status(201).json({ success: true, data: toJSON(video) });
};

export const updateVideo = async (req, res) => {
  const video = await Video.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!video) {
    return res.status(404).json({ success: false, error: "Video not found" });
  }
  res.json({ success: true, data: toJSON(video) });
};

export const deleteVideo = async (req, res) => {
  const video = await Video.findByIdAndDelete(req.params.id);
  if (!video) {
    return res.status(404).json({ success: false, error: "Video not found" });
  }
  // Delete associated Cloudinary asset if cloudinaryId is present
  if (video.cloudinaryId) {
    try {
      await import('../config/cloudinary.js').then(mod => mod.default.uploader.destroy(video.cloudinaryId, { resource_type: 'video' }));
    } catch (err) {
      console.error('Failed to delete Cloudinary asset for video', err);
    }
  }
  res.json({ success: true, message: "Video deleted" });
};
