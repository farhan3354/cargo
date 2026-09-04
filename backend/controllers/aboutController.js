import AboutPage from "../models/AboutPage.js";
import { toJSON } from "../utils/transform.js";

export const getAbout = async (req, res) => {
  const about = await AboutPage.findOne();
  if (!about) {
    return res.json({ success: true, data: null });
  }
  res.json({ success: true, data: toJSON(about) });
};

export const updateAbout = async (req, res) => {
  const {
    title, content, imageUrl,
    // Hero
    heroTitle, heroTitleHighlight, heroSubtitle, heroImageUrl,
    // Story
    storyLabel, storyHeading, storyContent, storyImageUrl,
    // Mission/Vision
    mission, vision,
    // Stats
    stat1Value, stat1Label, stat2Value, stat2Label,
    stat3Value, stat3Label, stat4Value, stat4Label,
    // Extra
    subtitle, extraContent, extraImageUrl,
  } = req.body;

  if (!title || !content) {
    return res.status(400).json({ success: false, error: "Title and content are required" });
  }

  // List of all optional fields
  const optionalFields = {
    imageUrl, heroTitle, heroTitleHighlight, heroSubtitle, heroImageUrl,
    storyLabel, storyHeading, storyContent, storyImageUrl,
    mission, vision,
    stat1Value, stat1Label, stat2Value, stat2Label,
    stat3Value, stat3Label, stat4Value, stat4Label,
    subtitle, extraContent, extraImageUrl,
  };

  let about = await AboutPage.findOne();
  if (about) {
    about.title = title;
    about.content = content;
    // Only update optional fields if they were actually sent
    for (const [key, value] of Object.entries(optionalFields)) {
      if (value !== undefined) {
        about[key] = value;
      }
    }
    await about.save();
  } else {
    about = await AboutPage.create({ title, content, ...optionalFields });
  }

  res.json({ success: true, data: toJSON(about) });
};
