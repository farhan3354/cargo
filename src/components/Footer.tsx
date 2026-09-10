import React from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Linkedin, Youtube } from "lucide-react";
import { getSiteContentMap } from "@/app/actions/admin";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

const services = [
  "Domestic Cargo",
  "International Cargo",
  "Air Freight",
  "Sea Freight",
];

export default async function Footer() {
  const content = await getSiteContentMap();
  
  const footerDescription = content.footer_description || "Trusted cargo and logistics solutions delivering your shipments safely and efficiently worldwide.";
  const footerPhone = content.footer_phone || "+971 52 397 9396";
  const footerEmail = content.footer_email || "info@manarcargo.com";
  const footerAddress = content.footer_address || "Dubai, United Arab Emirates";
  const footerMapUrl = content.footer_map_url || "";

  const socialLinks = {
    facebook: content.contact_facebook || "",
    instagram: content.contact_instagram || "",
    twitter: content.contact_twitter || "",
    linkedin: content.contact_linkedin || "",
    youtube: content.contact_youtube || "",
  };

  const footerCopyright = "© 2026 MANAR ALKHAIR CARGO L.L.C. Powered by BIS TECHNOLOGY. All rights reserved.";

  const socialIcons = [
    { key: "facebook", icon: Facebook, label: "Facebook", color: "hover:text-[#1877F2]" },
    { key: "instagram", icon: Instagram, label: "Instagram", color: "hover:text-[#E4405F]" },
    { key: "twitter", icon: Twitter, label: "Twitter", color: "hover:text-[#000000]" },
    { key: "linkedin", icon: Linkedin, label: "LinkedIn", color: "hover:text-[#0A66C2]" },
    { key: "youtube", icon: Youtube, label: "YouTube", color: "hover:text-[#FF0000]" },
  ];

  const getEmbeddableMapUrl = (url: string) => {
    if (!url) return "";
    if (url.includes("embed")) return url;
    if (url.includes("google.com/maps")) {
      const match = url.match(/!1s([^!]+)/);
      if (match) {
        return `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(match[1])}`;
      }
      return url;
    }
    return url;
  };

  return (
    <footer className="bg-[#0f172a] text-white pt-8 pb-4">
      <div className="max-w-[1240px] mx-auto px-5">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Column 1: Logo & Description */}
                    <div>
            <Link href="/" className="inline-flex items-center gap-3 mb-5">
              <img
                src="/finallogo.jpeg"
                alt="Manar Cargo Logo"
                loading="lazy"
                decoding="async"
                className="h-12 w-auto"
              />
              <div className="flex flex-col text-justify w-full">
                {/* Increased MANAR ALKHAIR size */}
                <h3 className="text-[24px] font-bold leading-tight text-justify">
                  MANAR
                </h3><h3 className="text-[24px] font-bold leading-tight text-justify">
                  AL KHAIR
                </h3>
                <p className="text-[12px] tracking-[4px] text-blue-300 uppercase text-justify">
                  Cargo L.L.C
                </p>
              </div>
            </Link>

            <p className="text-white/70 leading-relaxed text-sm text-justify">
              {footerDescription}
            </p>
          </div>
          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-5 text-justify">Quick Links</h4>

            <ul className="space-y-3">
              {navItems.map((item, i) => (
                <li key={i}>
                  <Link
                    href={item.href}
                    className="text-white/70 hover:text-white transition text-justify block"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Our Services */}
          <div>
            <h4 className="text-lg font-semibold mb-5 text-justify">Our Services</h4>

            <ul className="space-y-3 text-white/70">
              {services.map((service, i) => (
                <li key={i} className="text-justify">{service}</li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div>
            <h4 className="text-lg font-semibold mb-5 text-justify">Contact Us</h4>

            <div className="space-y-4 text-white/70 text-sm">
              <div className="flex gap-3 text-justify">
                <Phone className="w-4 h-4 mt-1 text-blue-300 flex-shrink-0" />
                <span className="text-justify">{footerPhone}</span>
              </div>

              <div className="flex gap-3 text-justify">
                <Mail className="w-4 h-4 mt-1 text-blue-300 flex-shrink-0" />
                <span className="text-justify">{footerEmail}</span>
              </div>

              <div className="flex gap-3 text-justify">
                <MapPin className="w-4 h-4 mt-1 text-blue-300 flex-shrink-0" />
                <span className="text-justify">{footerAddress}</span>
              </div>
            </div>

            {footerMapUrl && (
              <div className="mt-4 w-full h-[150px] rounded-lg overflow-hidden border border-white/10">
                <iframe
                  src={getEmbeddableMapUrl(footerMapUrl)}
                  className="w-full h-full"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Office Location Map"
                />
              </div>
            )}
          </div>
        </div>

        {/* CENTERED SOCIAL ICONS */}
        <div className="flex justify-center gap-6 pt-8">
          {socialIcons.map(({ key, icon: Icon, label, color }) => {
            const url = socialLinks[key as keyof typeof socialLinks];
            if (!url) return null;
            return (
              <a
                key={key}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-white/50 hover:text-white transition-colors ${color}`}
                aria-label={label}
              >
                <Icon className="w-6 h-6" />
              </a>
            );
          })}
        </div>

        <div className="pt-6 text-center text-sm text-white/50">
          <p className="text-justify text-center">{footerCopyright}</p>
        </div>
      </div>
    </footer>
  );
}
// import React from "react";
// import Link from "next/link";
// import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Linkedin, Youtube } from "lucide-react";
// import { getSiteContentMap } from "@/app/actions/admin";

// const navItems = [
//   { label: "Home", href: "/" },
//   { label: "About", href: "/about" },
//   { label: "Services", href: "/services" },
//   { label: "Contact", href: "/contact" },
// ];

// const services = [
//   "Domestic Cargo",
//   "International Cargo",
//   "Air Freight",
//   "Sea Freight",
// ];

// export default async function Footer() {
//   const content = await getSiteContentMap();
  
//   const footerDescription = content.footer_description || "Trusted cargo and logistics solutions delivering your shipments safely and efficiently worldwide.";
//   const footerPhone = content.footer_phone || "+971 52 397 9396";
//   const footerEmail = content.footer_email || "info@manarcargo.com";
//   const footerAddress = content.footer_address || "Dubai, United Arab Emirates";
//   const footerMapUrl = content.footer_map_url || "";

//   const socialLinks = {
//     facebook: content.contact_facebook || "",
//     instagram: content.contact_instagram || "",
//     twitter: content.contact_twitter || "",
//     linkedin: content.contact_linkedin || "",
//     youtube: content.contact_youtube || "",
//   };

//   const footerCopyright = "© 2026 MANAR ALKHAIR CARGO L.L.C. Powered by BIS TECHNOLOGY. All rights reserved.";

//   const socialIcons = [
//     { key: "facebook", icon: Facebook, label: "Facebook", color: "hover:text-[#1877F2]" },
//     { key: "instagram", icon: Instagram, label: "Instagram", color: "hover:text-[#E4405F]" },
//     { key: "twitter", icon: Twitter, label: "Twitter", color: "hover:text-[#000000]" },
//     { key: "linkedin", icon: Linkedin, label: "LinkedIn", color: "hover:text-[#0A66C2]" },
//     { key: "youtube", icon: Youtube, label: "YouTube", color: "hover:text-[#FF0000]" },
//   ];

//   const getEmbeddableMapUrl = (url: string) => {
//     if (!url) return "";
//     if (url.includes("embed")) return url;
//     if (url.includes("google.com/maps")) {
//       const match = url.match(/!1s([^!]+)/);
//       if (match) {
//         return `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(match[1])}`;
//       }
//       return url;
//     }
//     return url;
//   };

//   return (
//     <footer className="bg-[#0f172a] text-white pt-8 pb-4">
//       <div className="max-w-[1240px] mx-auto px-5">
//         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
//           <div>
//             <Link href="/" className="inline-flex items-center gap-3 mb-5">
//               <img
//                 src="/finallogo.jpeg"
//                 alt="Manar Cargo Logo"
//                 loading="lazy"
//                 decoding="async"
//                 className="h-12 w-auto"
//               />
//               <div>
//                 <h3 className="text-lg font-bold">MANAR ALKHAIR</h3>
//                 <p className="text-[10px] tracking-[4px] text-blue-300 uppercase">
//                   Cargo L.L.C
//                 </p>
//               </div>
//             </Link>

//             <p className="text-white/70 leading-relaxed text-sm text-justify">
//               {footerDescription}
//             </p>

//             <div className="flex gap-3 mt-4">
//               {socialIcons.map(({ key, icon: Icon, label, color }) => {
//                 const url = socialLinks[key as keyof typeof socialLinks];
//                 if (!url) return null;
//                 return (
//                   <a
//                     key={key}
//                     href={url}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className={`text-white/50 hover:text-white transition-colors ${color}`}
//                     aria-label={label}
//                   >
//                     <Icon className="w-5 h-5" />
//                   </a>
//                 );
//               })}
//             </div>
//           </div>

//           <div>
//             <h4 className="text-lg font-semibold mb-5 text-justify">Quick Links</h4>

//             <ul className="space-y-3">
//               {navItems.map((item, i) => (
//                 <li key={i}>
//                   <Link
//                     href={item.href}
//                     className="text-white/70 hover:text-white transition text-justify block"
//                   >
//                     {item.label}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <div>
//             <h4 className="text-lg font-semibold mb-5 text-justify">Our Services</h4>

//             <ul className="space-y-3 text-white/70">
//               {services.map((service, i) => (
//                 <li key={i} className="text-justify">{service}</li>
//               ))}
//             </ul>
//           </div>

//           <div>
//             <h4 className="text-lg font-semibold mb-5 text-justify">Contact Us</h4>

//             <div className="space-y-4 text-white/70 text-sm">
//               <div className="flex gap-3 text-justify">
//                 <Phone className="w-4 h-4 mt-1 text-blue-300 flex-shrink-0" />
//                 <span className="text-justify">{footerPhone}</span>
//               </div>

//               <div className="flex gap-3 text-justify">
//                 <Mail className="w-4 h-4 mt-1 text-blue-300 flex-shrink-0" />
//                 <span className="text-justify">{footerEmail}</span>
//               </div>

//               <div className="flex gap-3 text-justify">
//                 <MapPin className="w-4 h-4 mt-1 text-blue-300 flex-shrink-0" />
//                 <span className="text-justify">{footerAddress}</span>
//               </div>
//             </div>

//             {footerMapUrl && (
//               <div className="mt-4 w-full h-[150px] rounded-lg overflow-hidden border border-white/10">
//                 <iframe
//                   src={getEmbeddableMapUrl(footerMapUrl)}
//                   className="w-full h-full"
//                   style={{ border: 0 }}
//                   allowFullScreen
//                   loading="lazy"
//                   referrerPolicy="no-referrer-when-downgrade"
//                   title="Office Location Map"
//                 />
//               </div>
//             )}
//           </div>
//         </div>

//         <div className="pt-6 text-center text-sm text-white/50">
//           <p className="text-justify text-center">{footerCopyright}</p>
//         </div>
//       </div>
//     </footer>
//   );
// }