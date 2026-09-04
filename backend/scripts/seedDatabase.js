import mongoose from "mongoose";
import dotenv from "dotenv";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load .env file from parent directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../.env') });

import Service from "../models/Service.js";
import Office from "../models/Office.js";
import SiteContent from "../models/SiteContent.js";
import Video from "../models/Video.js";
import AboutPage from "../models/AboutPage.js";

// Use default if not set
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/cargo_db';

const seedData = {
  services: [
    { title: "Domestic Cargo", description: "Reliable cargo delivery across the UAE with safe and timely handling.", imageUrl: "/homepageimage/services1.jfif", order: 1 },
    { title: "International Cargo", description: "Worldwide shipping solutions with smooth customs and tracking.", imageUrl: "/servicesabout.jfif", order: 2 },
    { title: "Air Freight", description: "Fast air cargo services for urgent international deliveries.", imageUrl: "/homepageimage/services3.jfif", order: 3 },
    { title: "Sea Freight", description: "Affordable sea freight for large and commercial shipments.", imageUrl: "/homepageimage/services4.jfif", order: 4 },
    { title: "Door to Door Delivery", description: "Complete pickup and delivery service from sender to receiver.", imageUrl: "/homepageimage/services5.jfif", order: 5 },
    { title: "Customs Clearance", description: "Quick documentation and customs support for hassle-free shipping.", imageUrl: "/homepageimage/services.jfif", order: 6 },
  ],

  offices: [
    { name: "Dubai Office", email: "sales@manaralkhair.com", phone: "+971 52 397 9396, +971 45 476 860", address: "Dubai, UAE", imageUrl: "/officesimage/Gemini_Generated_Image_r5vo6sr5vo6sr5vo.png", order: 1 },
    { name: "Hargeisa Office", email: "sales@manaralkhair.com", phone: "+252 63 7448552, +252 63 8880742", address: "Hargeisa, Somaliland", imageUrl: "/officesimage/Gemini_Generated_Image_x4kj19x4kj19x4kj.png", order: 2 },
    { name: "Wajaale Office", email: "sales@manaralkhair.com", phone: "+252 63 7448552, +252 63 4426732", address: "Wajaale, Somaliland", imageUrl: "/officesimage/Gemini_Generated_Image_cijc7pcijc7pcijc.png", order: 3 },
    { name: "Mogadishu Office", email: "sales@manaralkhair.com", phone: "+252 614431212, +252 610881212", address: "Mogadishu, Somalia", imageUrl: "/officesimage/Gemini_Generated_Image_kmjn2qkmjn2qkmjn.png", order: 4 },
    { name: "Bosaso Office", email: "sales@manaralkhair.com", phone: "+252 904000029, +252 904000036", address: "Bosaso, Somalia", imageUrl: "/officesimage/Gemini_Generated_Image_55i1jg55i1jg55i1.png", order: 5 },
    { name: "Jigjiga Office", email: "sales@manaralkhair.com", phone: "+251 907940777, +251 966553166", address: "Jigjiga, Ethiopia", imageUrl: "/officesimage/Gemini_Generated_Image_yhe5jtyhe5jtyhe5.png", order: 6 },
    { name: "Tanzania Office", email: "sales@manaralkhair.com", phone: "+971 58 8627018, +971 52 8652516", address: "Dar es Salaam, Tanzania", imageUrl: "/officesimage/Tanzania.jfif", order: 7 },
    { name: "South Sudan Office", email: "sales@manaralkhair.com", phone: "+971 52 8652516, +971 58 8627018", address: "South Sudan", imageUrl: "/officesimage/SouthSudan.png", order: 8 },
    { name: "Kenya Office", email: "sales@manaralkhair.com", phone: "+971 58 8627018, +971 52 8652516", address: "Kenya", imageUrl: "/officesimage/Kenya.png", order: 9 },
    { name: "Kinshasa Office", email: "sales@manaralkhair.com", phone: "+971 58 8627018, +971 52 8652516", address: "Kinshasa, DRC", imageUrl: "/officesimage/Kinshasa.png", order: 10 },
    { name: "Lusaka Office", email: "sales@manaralkhair.com", phone: "+971 58 8627018, +971 52 8652516", address: "Lusaka, Zambia", imageUrl: "/officesimage/Lusaka.png", order: 11 },
    { name: "Zanzibar Office", email: "sales@manaralkhair.com", phone: "+971 58 8627018, +971 52 8652516", address: "Zanzibar, Tanzania", imageUrl: "/officesimage/zaniaber.png", order: 12 },
    { name: "Juba Office", email: "sales@manaralkhair.com", phone: "+971 58 8627018, +971 52 8652516, +971 58 6647298", address: "Juba, South Sudan", imageUrl: "/officesimage/juba.png", order: 13 },
    { name: "Sharjah Office", email: "sales@manaralkhair.com", phone: "+971 58 8627018, +971 52 8652516, +971 58 6647298", address: "Sharjah, UAE", imageUrl: "/officesimage/Sharjah.png", order: 14 },
  ],

  siteContent: [
    // Homepage
    { section: "home", key: "hero_title", value: "MANAR ALKHAIR CARGO", type: "text", description: "Main headline on homepage" },
    { section: "home", key: "hero_subtitle", value: "Fast & Reliable\nShipping Services", type: "text", description: "Subtitle on homepage hero section" },
    { section: "home", key: "hero_cta", value: "Call Us", type: "text", description: "Call to action button text" },
    { section: "home", key: "services_title", value: "Our Services", type: "text", description: "Services section title" },
    { section: "home", key: "services_description", value: "Comprehensive Shipping Solution At Your Fingertips", type: "text", description: "Services section description" },

    // About
    { section: "about", key: "about_title", value: "Learn More About Manar Cargo", type: "text", description: "About page title" },
    { section: "about", key: "about_description", value: "Manar Cargo is dedicated to providing innovative shipping solutions tailored to meet the diverse needs of our customers across the globe.", type: "text", description: "About page main description" },
    { section: "about", key: "about_image", value: "/aboutsectionhome.png", type: "image", description: "About section image" },
  ],

  videos: [
    { title: "Banner Video 1", description: "Main Banner Video", cloudinaryId: "banner1", url: "/banner1.mp4", order: 1 },
    { title: "Banner Video 2", description: "Secondary Banner Video", cloudinaryId: "banner2", url: "/banner2.mp4", order: 2 },
    { title: "Banner Video 3", description: "Tertiary Banner Video", cloudinaryId: "banner3", url: "/banner3.mp4", order: 3 },
  ],

  aboutPage: {
    title: "About Manar Cargo",
    content: "Manar Cargo is dedicated to providing innovative shipping solutions tailored to meet the diverse needs of our customers across the globe.",
    imageUrl: "/aboutsectionhome.png",
  },
};

async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✓ Connected to MongoDB");
  } catch (err) {
    console.error("✗ Failed to connect to MongoDB:", err.message);
    process.exit(1);
  }
}

async function clearCollections() {
  try {
    console.log("\n📋 Clearing existing data...");
    await Service.deleteMany({});
    await Office.deleteMany({});
    await SiteContent.deleteMany({});
    await Video.deleteMany({});
    await AboutPage.deleteMany({});
    console.log("✓ Cleared all collections");
  } catch (err) {
    console.error("✗ Failed to clear collections:", err.message);
  }
}

async function seedServices() {
  try {
    console.log("\n🚀 Seeding Services...");
    const services = await Service.insertMany(seedData.services);
    console.log(`✓ Created ${services.length} services`);
    services.forEach((service) => {
      console.log(`  - ${service.title}`);
    });
  } catch (err) {
    console.error("✗ Failed to seed services:", err.message);
  }
}

async function seedOffices() {
  try {
    console.log("\n🏢 Seeding Offices...");
    const offices = await Office.insertMany(seedData.offices);
    console.log(`✓ Created ${offices.length} offices`);
    offices.forEach((office) => {
      console.log(`  - ${office.name}`);
    });
  } catch (err) {
    console.error("✗ Failed to seed offices:", err.message);
  }
}

async function seedSiteContent() {
  try {
    console.log("\n📝 Seeding Site Content...");
    
    // Use upsert to avoid duplicate key errors on the 'key' field
    const results = await Promise.all(
      seedData.siteContent.map((item) =>
        SiteContent.findOneAndUpdate(
          { key: item.key },
          item,
          { upsert: true, new: true }
        )
      )
    );
    
    console.log(`✓ Created/Updated ${results.length} content items`);
    const sections = {};
    results.forEach((item) => {
      if (!sections[item.section]) {
        sections[item.section] = [];
      }
      sections[item.section].push(item.key);
    });
    Object.entries(sections).forEach(([section, keys]) => {
      console.log(`  - ${section}: ${keys.length} items`);
    });
  } catch (err) {
    console.error("✗ Failed to seed site content:", err.message);
  }
}

async function seedVideos() {
  try {
    console.log("\n🎬 Seeding Videos...");
    const videos = await Video.insertMany(seedData.videos);
    console.log(`✓ Created ${videos.length} videos`);
    videos.forEach((video) => {
      console.log(`  - ${video.title}`);
    });
  } catch (err) {
    console.error("✗ Failed to seed videos:", err.message);
  }
}

async function seedAboutPage() {
  try {
    console.log("\n📖 Seeding About Page...");
    const aboutPage = await AboutPage.create(seedData.aboutPage);
    console.log("✓ Created About Page");
    console.log(`  - Title: ${aboutPage.title}`);
    console.log(`  - Content: ${aboutPage.content.substring(0, 50)}...`);
  } catch (err) {
    console.error("✗ Failed to seed about page:", err.message);
  }
}

async function main() {
  console.log("🌱 Starting Database Seeding...\n");
  console.log("=====================================");

  try {
    await connectDB();
    await clearCollections();
    await seedServices();
    await seedOffices();
    await seedSiteContent();
    await seedVideos();
    await seedAboutPage();

    console.log("\n=====================================");
    console.log("✅ Database seeding completed successfully!");
    console.log("\n📊 Summary:");
    console.log(`  - Services: ${seedData.services.length}`);
    console.log(`  - Offices: ${seedData.offices.length}`);
    console.log(`  - Site Content: ${seedData.siteContent.length}`);
    console.log(`  - Videos: ${seedData.videos.length}`);
    console.log(`  - About Pages: 1`);
    console.log("\n🎯 Next steps:");
    console.log("  1. Start the servers (npm run dev)");
    console.log("  2. Visit admin panel (http://localhost:3001/admin)");
    console.log("  3. Edit content, services, offices, and videos");
    console.log("  4. All changes will be saved to the database");
    console.log("\n=====================================\n");
  } catch (err) {
    console.error("✗ Seeding failed:", err.message);
  } finally {
    await mongoose.disconnect();
    console.log("✓ Disconnected from MongoDB");
    process.exit(0);
  }
}

main();
