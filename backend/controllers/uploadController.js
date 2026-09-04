import cloudinary from "../config/cloudinary.js";
import { Readable } from "stream";

function bufferToStream(buffer) {
  const stream = new Readable();
  stream.push(buffer);
  stream.push(null);
  return stream;
}

export const uploadMedia = async (req, res) => {
  try {
      if (!req.file) {
        return res.status(400).json({ success: false, error: "No file uploaded" });
      }

      // Validate file size (e.g., 5MB for images, 50MB for videos)
      const maxSize = req.file.mimetype.startsWith("video/") ? 50 * 1024 * 1024 : 5 * 1024 * 1024;
      if (req.file.size > maxSize) {
        return res.status(400).json({ success: false, error: `File too large. Max size is ${maxSize / (1024 * 1024)}MB` });
      }

    const resourceType = req.file.mimetype.startsWith("video/") ? "video" : "image";

    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "manar-cargo",
          resource_type: resourceType,
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        },
      );
      bufferToStream(req.file.buffer).pipe(uploadStream);
    });

    res.json({
      success: true,
      data: {
        url: result.secure_url,
        publicId: result.public_id,
        resourceType: result.resource_type,
      },
    });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ success: false, error: "Upload failed" });
  }
};

export const deleteMedia = async (req, res) => {
  try {
    const { publicId, resourceType } = req.body;
    if (!publicId) {
      return res.status(400).json({ success: false, error: "publicId is required" });
    }
    await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType || "image",
    });
    res.json({ success: true, message: "Media deleted" });
  } catch (err) {
    console.error("Delete media error:", err);
    res.status(500).json({ success: false, error: "Delete failed" });
  }
};

export const getCloudinaryConfig = async (req, res) => {
  res.json({
    success: true,
    data: {
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
      uploadPreset: process.env.CLOUDINARY_UPLOAD_PRESET || "cargo_preset",
    },
  });
};
