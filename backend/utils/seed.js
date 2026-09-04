import SiteContent from "../models/SiteContent.js";
import EmailTemplate from "../models/EmailTemplate.js";
import Service from "../models/Service.js";
import AboutPage from "../models/AboutPage.js";

const defaultContent = [
  { section: "hero", key: "hero_title", value: "MANAR ALKHAIR CARGO", type: "text", description: "Hero Title" },
  { section: "hero", key: "hero_subtitle", value: "Fast & Reliable\nShipping Services", type: "text", description: "Hero Subtitle" },
  { section: "hero", key: "hero_cta_text", value: "Get Started", type: "text", description: "Hero CTA Button Text" },
  { section: "hero", key: "hero_video_url", value: "", type: "video", description: "Hero Background Video URL" },
  { section: "about", key: "about_title", value: "About Us", type: "text", description: "About Section Title" },
  { section: "about", key: "about_text", value: "Manar Alkhair Cargo provides fast and reliable shipping services worldwide.", type: "text", description: "About Section Text" },
  { section: "about", key: "about_image_1", value: "", type: "image", description: "About Image 1" },
  { section: "about", key: "about_image_2", value: "", type: "image", description: "About Image 2" },
  { section: "about", key: "about_image_3", value: "", type: "image", description: "About Image 3" },
  { section: "services", key: "services_title", value: "Our Services", type: "text", description: "Services Section Title" },
  { section: "services", key: "services_subtitle", value: "Comprehensive logistics solutions for your business", type: "text", description: "Services Subtitle" },
  { section: "services", key: "services_image_1", value: "", type: "image", description: "Service 1 Image" },
  { section: "services", key: "services_image_2", value: "", type: "image", description: "Service 2 Image" },
  { section: "services", key: "services_image_3", value: "", type: "image", description: "Service 3 Image" },
  { section: "pricing", key: "pricing_title", value: "Pricing", type: "text", description: "Pricing Section Title" },
  { section: "pricing", key: "pricing_subtitle", value: "Competitive rates for all shipping needs", type: "text", description: "Pricing Subtitle" },
  { section: "pricing", key: "pricing_image", value: "", type: "image", description: "Pricing Section Image" },
  { section: "track", key: "track_title", value: "Track Your Shipment", type: "text", description: "Track Section Title" },
  { section: "track", key: "track_subtitle", value: "Real-time tracking for peace of mind", type: "text", description: "Track Subtitle" },
  { section: "footer", key: "footer_description", value: "Your trusted partner in global logistics and cargo services.", type: "text", description: "Footer Description" },
  { section: "footer", key: "footer_address", value: "Dubai, UAE", type: "text", description: "Footer Address" },
];

const defaultTemplates = [
  {
    templateId: "contact-confirmation",
    name: "Contact Confirmation",
    subject: "Thank you for contacting Manar Cargo",
    htmlContent: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;"><h2>Thank you {{name}}!</h2><p>We have received your message and will get back to you shortly.</p><p><strong>Your Message:</strong></p><p>{{message}}</p></div>`,
    plainTextContent: "Thank you {{name}}! We have received your message and will get back to you shortly.",
    variables: ["name", "message"],
  },
  {
    templateId: "admin-notification",
    name: "Admin Notification",
    subject: "New Contact Submission from {{name}}",
    htmlContent: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;"><h2>New Website Inquiry</h2><p><strong>Name:</strong> {{name}}</p><p><strong>Email:</strong> {{email}}</p><p><strong>Subject:</strong> {{subject}}</p><p><strong>Message:</strong></p><p>{{message}}</p></div>`,
    plainTextContent: "New inquiry from {{name}} ({{email}}): {{message}}",
    variables: ["name", "email", "subject", "message"],
  },
];

const defaultServices = [
  {
    title: "Domestic Cargo",
    description: "Reliable cargo delivery across the UAE with safe and timely handling.",
    imageUrl: "/homepageimage/services1.jfif",
    order: 1,
  },
  {
    title: "International Cargo",
    description: "Worldwide shipping solutions with smooth customs and tracking.",
    imageUrl: "/servicesabout.jfif",
    order: 2,
  },
  {
    title: "Air Freight",
    description: "Fast air cargo services for urgent international deliveries.",
    imageUrl: "/homepageimage/services3.jfif",
    order: 3,
  },
  {
    title: "Sea Freight",
    description: "Affordable sea freight for large and commercial shipments.",
    imageUrl: "/homepageimage/services4.jfif",
    order: 4,
  },
  {
    title: "Door to Door Delivery",
    description: "Complete pickup and delivery service from sender to receiver.",
    imageUrl: "/homepageimage/services5.jfif",
    order: 5,
  },
  {
    title: "Customs Clearance",
    description: "Quick documentation and customs support for hassle-free shipping.",
    imageUrl: "/homepageimage/services.jfif",
    order: 6,
  },
];

const defaultAbout = {
  title: "About Us",
  content: "Manar Alkhair Cargo provides fast and reliable shipping services worldwide.",
  imageUrl: ""
};

export async function seedDatabase() {
  const contentCount = await SiteContent.countDocuments();
  if (contentCount === 0) {
    await SiteContent.insertMany(defaultContent);
    console.log("Seeded default site content");
  }

  const templateCount = await EmailTemplate.countDocuments();
  if (templateCount === 0) {
    await EmailTemplate.insertMany(defaultTemplates);
    console.log("Seeded default email templates");
  }

  const serviceCount = await Service.countDocuments();
  if (serviceCount === 0) {
    await Service.insertMany(defaultServices);
    console.log("Seeded default services");
  }

  const aboutCount = await AboutPage.countDocuments();
  if (aboutCount === 0) {
    await AboutPage.create(defaultAbout);
    console.log("Seeded default about page");
  }

  const Admin = (await import("../models/Admin.js")).default;
  const adminCount = await Admin.countDocuments();
  if (adminCount === 0) {
    await Admin.create({
      email: "admin@manarcargo.com",
      password: "cargo123",
      fullName: "Super Admin",
      role: "superadmin",
    });
    console.log("Seeded default admin user: admin@manarcargo.com / cargo123");
  }
}
