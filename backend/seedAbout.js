import mongoose from "mongoose";
import dotenv from "dotenv";
import AboutPage from "./models/AboutPage.js";

dotenv.config();

const run = async () => {
  await mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/cargo");
  
  const payload = {
    title: "About Us",
    content: "Manar Cargo is dedicated to providing innovative shipping solutions tailored to meet the diverse needs of our customers across the globe.",
    heroTitle: "Your Trusted",
    heroTitleHighlight: "Cargo Partner",
    heroSubtitle: "Delivering reliable cargo and logistics solutions across the UAE and worldwide.",
    storyLabel: "Our Story",
    storyHeading: "Moving Cargo With Confidence",
    storyContent: "Manar Al Khair Cargo was founded with a strong commitment to provide dependable cargo and logistics services for businesses, traders, and individuals across local and international markets. Our experienced team specializes in handling air, sea, and land freight solutions while ensuring every shipment is transported safely, efficiently, and delivered on schedule without unnecessary delays. We offer complete logistics support including cargo handling, customs clearance, warehousing, packaging, and secure door-to-door delivery services designed to meet the unique needs of every customer. Through advanced tracking systems, professional operations, and a reliable global network, we are dedicated to delivering smooth, secure, and trusted shipping experiences for clients around the world.",
    mission: "To provide efficient, secure, and affordable cargo solutions that exceed customer expectations.",
    vision: "To become a globally trusted logistics partner known for reliability and excellence.",
    stat1Value: "5000+",
    stat1Label: "Shipments Delivered",
    stat2Value: "20+",
    stat2Label: "Countries Served",
    stat3Value: "24/7",
    stat3Label: "Customer Support",
    stat4Value: "99%",
    stat4Label: "On-Time Delivery",
    imageUrl: "/aboutsectionhome.png",
    heroImageUrl: "/homepageimage/services4.jfif",
    storyImageUrl: "/servicesabout.jfif"
  };

  let about = await AboutPage.findOne();
  if (about) {
    Object.assign(about, payload);
    await about.save();
    console.log("Updated existing AboutPage data.");
  } else {
    await AboutPage.create(payload);
    console.log("Created new AboutPage data.");
  }

  mongoose.disconnect();
};

run().catch(console.error);
