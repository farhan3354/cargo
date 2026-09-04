import SiteContent from "../models/SiteContent.js";
import { toJSON, toJSONArray } from "../utils/transform.js";

export const getContent = async (req, res) => {
  const filter = req.query.section ? { section: req.query.section } : {};
  const items = await SiteContent.find(filter).sort({ section: 1, key: 1 });
  res.json({ success: true, data: toJSONArray(items) });
};

export const getContentMap = async (req, res) => {
  const items = await SiteContent.find();
  const map = {};
  for (const item of items) {
    map[item.key] = item.value;
  }
  res.json({ success: true, data: map });
};

export const upsertContent = async (req, res) => {
  const { key, value, section, type, description } = req.body;
  if (!key || !section) {
    return res.status(400).json({ success: false, error: "Key and section are required" });
  }
  const item = await SiteContent.findOneAndUpdate(
    { key },
    { key, value: value ?? "", section, type: type || "text", description },
    { upsert: true, new: true, runValidators: true },
  );
  res.json({ success: true, data: toJSON(item) });
};

export const bulkUpsertContent = async (req, res) => {
  const { items } = req.body;
  if (!Array.isArray(items)) {
    return res.status(400).json({ success: false, error: "Items array is required" });
  }
  const results = await Promise.all(
    items.map(({ key, value, section, type, description }) =>
      SiteContent.findOneAndUpdate(
        { key },
        { key, value: value ?? "", section, type: type || "text", description },
        { upsert: true, new: true, runValidators: true },
      ),
    ),
  );
  res.json({ success: true, data: toJSONArray(results) });
};

export const deleteContent = async (req, res) => {
  const item = await SiteContent.findOneAndDelete({ key: req.params.key });
  if (!item) {
    return res.status(404).json({ success: false, error: "Content not found" });
  }
  res.json({ success: true, message: "Content deleted" });
};
