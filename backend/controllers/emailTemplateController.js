import EmailTemplate from "../models/EmailTemplate.js";
import { toJSON, toJSONArray } from "../utils/transform.js";

export const getTemplates = async (req, res) => {
  const templates = await EmailTemplate.find().sort({ name: 1 });
  res.json({ success: true, data: toJSONArray(templates) });
};

export const upsertTemplate = async (req, res) => {
  const { templateId, name, subject, htmlContent, plainTextContent, variables } = req.body;
  if (!templateId || !name) {
    return res.status(400).json({ success: false, error: "templateId and name are required" });
  }
  const template = await EmailTemplate.findOneAndUpdate(
    { templateId },
    { templateId, name, subject, htmlContent, plainTextContent, variables },
    { upsert: true, new: true },
  );
  res.json({ success: true, data: toJSON(template) });
};

export const deleteTemplate = async (req, res) => {
  const template = await EmailTemplate.findOneAndDelete({ templateId: req.params.templateId });
  if (!template) {
    return res.status(404).json({ success: false, error: "Template not found" });
  }
  res.json({ success: true, message: "Template deleted" });
};
