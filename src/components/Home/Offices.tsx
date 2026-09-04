"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Phone, MapPin, Mail, Globe, Navigation } from "lucide-react";

const offices = [
  {
    city: "Dubai Office",
    desc: "Our main office in Dubai is available for cargo inquiries, shipment bookings, and customer support.",
    img: "/officesimage/Gemini_Generated_Image_r5vo6sr5vo6sr5vo.png",
    phones: ["+971 52 397 9396", "+971 45 476 860"],
    email: "sales@manaralkhair.com",
    location: "Dubai, UAE",
    country: "UAE",
  },
  {
    city: "Hargeisa Office",
    desc: "Our Hargeisa branch supports cargo delivery, customer assistance, and shipment tracking across Somaliland.",
    img: "/officesimage/Gemini_Generated_Image_x4kj19x4kj19x4kj.png",
    phones: ["+252 63 7448552", "+252 63 8880742"],
    email: "sales@manaralkhair.com",
    location: "Hargeisa, Somaliland",
    country: "Somaliland",
  },
  {
    city: "Wajaale Office",
    desc: "Serving customers with reliable cargo handling and logistics support in Wajaale.",
    img: "/officesimage/Gemini_Generated_Image_cijc7pcijc7pcijc.png",
    phones: ["+252 63 7448552", "+252 63 4426732"],
    email: "sales@manaralkhair.com",
    location: "Wajaale, Somaliland",
    country: "Somaliland",
  },
  {
    city: "Mogadishu Office",
    desc: "Our Mogadishu office provides fast cargo coordination and shipment support for Somalia customers.",
    img: "/officesimage/Gemini_Generated_Image_kmjn2qkmjn2qkmjn.png",
    phones: ["+252 614431212", "+252 610881212"],
    email: "sales@manaralkhair.com",
    location: "Mogadishu, Somalia",
    country: "Somalia",
  },
  {
    city: "Bosaso Office",
    desc: "Reliable cargo services and customer support for shipments through our Bosaso branch.",
    img: "/officesimage/Gemini_Generated_Image_55i1jg55i1jg55i1.png",
    phones: ["+252 904000029", "+252 904000036"],
    email: "sales@manaralkhair.com",
    location: "Bosaso",
    country: "Somalia",
  },
  {
    city: "Jigjiga Office",
    desc: "Our Ethiopia branch helps customers with shipment processing, support, and logistics coordination.",
    img: "/officesimage/Gemini_Generated_Image_yhe5jtyhe5jtyhe5.png",
    phones: ["+251 907940777", "+251 966553166"],
    email: "sales@manaralkhair.com",
    location: "Jigjiga",
    country: "Ethiopia",
  },
  {
    city: "Tanzania Office",
    desc: "Dedicated cargo route from Sharjah to Dar es Salaam, Tanzania, ensuring efficient shipping and customs clearance.",
    img: "/officesimage/Tanzania.jfif",
    phones: ["+971 58 8627018", "+971 52 8652516"],
    email: "sales@manaralkhair.com",
    location: "Dar es Salaam, Tanzania",
    country: "Tanzania",
  },
  {
    city: "South Sudan Office",
    desc: "Reliable logistics link from Sharjah to Juba, South Sudan, providing secure handling and timely deliveries.",
    img: "/officesimage/SouthSudan.png",
    phones: ["+971 52 8652516", "+971 58 8627018"],
    email: "sales@manaralkhair.com",
    location: "South Sudan",
    country: "South Sudan",
  },
  {
    city: "Kenya Office",
    desc: "Seamless shipping services from Sharjah to Nairobi, Kenya, offering end-to-end cargo solutions for your business.",
    img: "/officesimage/Kenya.png",
    phones: ["+971 58 8627018", "+971 52 8652516"],
    email: "sales@manaralkhair.com",
    location: "Kenya",
    country: "Kenya",
  },
  {
    city: "Kinshasa Office",
    desc: "Direct cargo route from Sharjah to Kinshasa, DRC, with reliable clearance and door-to-door delivery services.",
    img: "/officesimage/Kinshasa.png",
    phones: ["+971 58 8627018", "+971 52 8652516"],
    email: "sales@manaralkhair.com",
    location: "Kinshasa",
    country: "DRC",
  },
  {
    city: "Lusaka Office",
    desc: "Efficient cargo shipping from Sharjah to Lusaka, Zambia, ensuring safe and timely freight delivery.",
    img: "/officesimage/Lusaka.png",
    phones: ["+971 58 8627018", "+971 52 8652516"],
    email: "sales@manaralkhair.com",
    location: "Lusaka",
    country: "Zambia",
  },
  {
    city: "Zanzibar Office",
    desc: "Dedicated shipping route from Sharjah to Zanzibar, Tanzania, with reliable handling and island-specific logistics.",
    img: "/officesimage/zaniaber.png",
    phones: ["+971 58 8627018", "+971 52 8652516"],
    email: "sales@manaralkhair.com",
    location: "Zanzibar",
    country: "Tanzania",
  },
  {
    city: "Juba Office",
    desc: "Dedicated shipping route from Dubai to Juba, South Sudan, with reliable handling and logistics support.",
    img: "/officesimage/juba.png",
    phones: ["+971 58 8627018", "+971 52 8652516", "+971 58 6647298"],
    email: "sales@manaralkhair.com",
    location: "Juba, South Sudan",
    country: "UAE/South Sudan",
  },
  {
    city: "Sharjah Office",
    desc: "Our Sharjah office provides comprehensive cargo services and logistics support for customers in the region.",
    img: "/officesimage/Sharjah.png",
    phones: ["+971 58 8627018", "+971 52 8652516", "+971 58 6647298"],
    email: "sales@manaralkhair.com",
    location: "Sharjah",
    country: "UAE",
  },
];

import { Office } from "@prisma/client";

const globalEmails = ["sales@manaralkhair.com"];

export default function Offices({
  onContactClick,
  dbOffices,
}: { onContactClick?: (officeTag: string) => void; dbOffices?: Office[] } = {}) {
  const router = useRouter();

  const displayOffices = dbOffices && dbOffices.length > 0
    ? dbOffices.map(o => ({
        city: o.name,
        desc: o.address || "",
        img: o.imageUrl || "/placeholder.jpg",
        phones: o.phone ? o.phone.split(",") : [],
        email: o.email,
        location: o.name, // using name as location if no country field
        country: "",
      }))
    : offices; // fallback to hardcoded if none in DB

  return (
    <section className="py-8 md:py-14 bg-gradient-to-br from-[#F9F7FA] via-white to-[#F9F7FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 bg-[#E5E7EB] px-4 py-2 rounded-full mb-6">
            <Globe className="w-4 h-4 text-[#110713]" />
            <span className="text-sm font-medium text-[#110713]">
              Our Global Presence
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#110713] mb-4">
            Our Global Offices &amp;{" "}
            <span className="text-[#1F2288]">Contact Information</span>
          </h2>
          <p className="text-base sm:text-lg text-[#66556B] max-w-2xl mx-auto">
            Connect with MANAR Al Khair Cargo L.L.C for cargo bookings, shipment
            tracking, and logistics support across 6 strategic locations.
          </p>
        </div>

        <div className="mb-12 bg-white rounded-2xl shadow-md border border-[#E5E7EB] p-4 md:p-6">
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-[#1F2288]" />
              <span className="text-sm font-semibold text-[#110713]">
                Global Email:
              </span>
            </div>
            {globalEmails.map((email, idx) => (
              <a
                key={idx}
                href={`mailto:${email}`}
                className="text-sm text-[#66556B] hover:text-[#1F2288] transition-colors"
              >
                {email}
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {displayOffices.map((office, i) => (
            <div
              key={i}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-[#E5E7EB]"
            >
              <div className="relative h-48 md:h-62 overflow-hidden bg-gray-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={office.img}
                  alt={office.city}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-lg">
                  <span className="text-white text-xs font-medium">
                    {office.location}
                  </span>
                </div>
              </div>

              <div className="p-4 md:p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#1F2288]" />
                  <h4 className="text-lg md:text-xl font-bold text-[#110713]">
                    {office.city}
                  </h4>
                </div>

                <p className="text-sm text-[#66556B] leading-relaxed min-h-[70px]">
                  {office.desc}
                </p>
                {office.phones && office.phones.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-[#E5E7EB]">
                    <div className="flex items-center justify-between border-b border-[#E8DFEB] pb-2">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-[#1F2288]" />
                        <p className="text-xs font-semibold text-[#1F2288] uppercase tracking-wider">
                          Phone Numbers
                        </p>
                      </div>
                    </div>
                    {office.phones.map((phone, pi) => (
                      <div key={pi} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-[#1F2288]" />
                          <span className="text-sm font-medium text-[#110713]">
                            {phone.trim()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-2 pt-2">
                  <Mail className="w-4 h-4 text-[#1F2288]" />
                  <a
                    href={`mailto:${office.email}`}
                    className="text-sm text-[#66556B] hover:text-[#1F2288] transition-colors"
                  >
                    {office.email}
                  </a>
                </div>

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => {
                      if (onContactClick) onContactClick(office.city);
                      else router.push("/contact");
                    }}
                    className="flex-1 bg-gradient-to-r from-[#1F2288] to-[#323592] text-white font-semibold py-2.5 px-3 rounded-xl hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02] text-sm flex items-center justify-center gap-2"
                  >
                    <Navigation className="w-4 h-4" />
                    Contact Us
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
