import mongoose from "mongoose";

const aboutPageSchema = new mongoose.Schema(
  {
    // ── Home page about section ──
    title: { type: String, required: true },
    content: { type: String, required: true },
    imageUrl: String,

    // ── About Page Hero Section ──
    heroTitle: { type: String, default: "Your Trusted" },
    heroTitleHighlight: { type: String, default: "Cargo Partner" },
    heroSubtitle: { type: String, default: "Delivering reliable cargo and logistics solutions across the UAE and worldwide." },
    heroImageUrl: String,

    // ── Company Story Section ──
    storyLabel: { type: String, default: "Our Story" },
    storyHeading: { type: String, default: "Moving Cargo With Confidence" },
    storyContent: { type: String, default: "" },
    storyImageUrl: String,

    // ── Mission & Vision ──
    mission: { type: String, default: "" },
    vision: { type: String, default: "" },

    // ── Stats Section ──
    stat1Value: { type: String, default: "5000+" },
    stat1Label: { type: String, default: "Shipments Delivered" },
    stat2Value: { type: String, default: "20+" },
    stat2Label: { type: String, default: "Countries Served" },
    stat3Value: { type: String, default: "24/7" },
    stat3Label: { type: String, default: "Customer Support" },
    stat4Value: { type: String, default: "99%" },
    stat4Label: { type: String, default: "On-Time Delivery" },

    // ── Extra / Why Choose Us ──
    subtitle: String,
    extraContent: String,
    extraImageUrl: String,
  },
  { timestamps: true }
);

export default mongoose.model("AboutPage", aboutPageSchema);
