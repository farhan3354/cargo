import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import SiteContent from "./models/SiteContent.js";

dotenv.config();

const initialContent = [
  // Footer
  { key: "footer_description", value: "Trusted cargo and logistics solutions delivering your shipments safely and efficiently worldwide.", section: "footer", type: "text" },
  { key: "footer_address", value: "Dubai, United Arab Emirates", section: "footer", type: "text" },
  { key: "footer_phone", value: "+971 52 397 9396", section: "footer", type: "text" },
  { key: "footer_email", value: "info@manarcargo.com", section: "footer", type: "text" },
  { key: "footer_copyright", value: "© 2026 MANAR ALKHAIR CARGO L.L.C. Powered by BIS TECHNOLOGY. All rights reserved.", section: "footer", type: "text" },

  // Contact Page
  { key: "contact_page_title", value: "Manar Cargo", section: "contact", type: "text" },
  { key: "contact_page_subtitle", value: "Get in touch with our team for shipping, logistics, cargo tracking, and support services.", section: "contact", type: "text" },
  { key: "contact_page_address", value: "Dubai, United Arab Emirates", section: "contact", type: "text" },
  { key: "contact_page_phone", value: "+971 52 397 9396", section: "contact", type: "text" },
  { key: "contact_page_email", value: "info@manarcargo.com", section: "contact", type: "text" },
  { key: "contact_page_hours", value: "Mon - Fri: 8:00 AM - 6:00 PM\nSaturday: 9:00 AM - 2:00 PM\nSunday: Closed", section: "contact", type: "text" },
  { key: "contact_page_map_url", value: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.204554804153!2d55.3039773!3d25.2636737!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f433555555555%3A0x1234567890abcdef!2sDeira%20-%20Dubai!5e0!3m2!1sen!2sae!4v1650000000000!5m2!1sen!2sae", section: "contact", type: "text" }
];

const seedContent = async () => {
  try {
    await connectDB();
    
    for (const item of initialContent) {
      await SiteContent.findOneAndUpdate(
        { key: item.key },
        { $setOnInsert: item },
        { upsert: true, new: true }
      );
    }
    
    console.log("Site content seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding content:", error);
    process.exit(1);
  }
};

seedContent();
