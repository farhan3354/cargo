"use client";
import React from "react";
import Link from "next/link";

const defaultServices = [
  {
    title: "Domestic Cargo",
    desc: "Reliable cargo delivery across the UAE with safe and timely handling.",
    img: "/homepageimage/services1.jfif",
  },
  {
    title: "International Cargo",
    desc: "Worldwide shipping solutions with smooth customs and tracking.",
    img: "/servicesabout.jfif",
  },
  {
    title: "Air Freight",
    desc: "Fast air cargo services for urgent international deliveries.",
    img: "/homepageimage/services3.jfif",
  },
  {
    title: "Sea Freight",
    desc: "Affordable sea freight for large and commercial shipments.",
    img: "/homepageimage/services4.jfif",
  },
  {
    title: "Door to Door Delivery",
    desc: "Complete pickup and delivery service from sender to receiver.",
    img: "/homepageimage/services5.jfif",
  },
  {
    title: "Customs Clearance",
    desc: "Quick documentation and customs support for hassle-free shipping.",
    img: "/homepageimage/services.jfif",
  },
];

export default function Services({ dbServices = [] }: { dbServices?: any[] }) {
  const displayServices = dbServices.length > 0 ? dbServices : defaultServices.map(s => ({ ...s, desc: s.desc || s.description, img: s.img || s.imageUrl }));
  return (
    <section className="py-4 bg-white">
      <div className="max-w-[1240px] mx-auto px-5">
        <div className="w-20 h-[3px] bg-[#1F2288] rounded-full mb-5"></div>
        <p className="text-[#1F2288] font-semibold uppercase tracking-[3px] text-sm mb-3">
          Our Services
        </p>

        <h2 className="text-3xl md:text-4xl font-normal text-[#110713] max-w-3xl leading-tight mb-14">
          Comprehensive Shipping Solution At Your Fingertips
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {displayServices.map((service, i) => (
            <div
              key={i}
              className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition duration-300"
            >
              {/* Image */}
              <div className="overflow-hidden h-[240px]">
                <img
                  src={service.img || service.imageUrl}
                  alt={service.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-7">
                <span className="text-3xl font-bold text-[#1F2288]"></span>

                <h4 className="text-2xl font-semibold text-[#110713] mt-3 mb-3">
                  {service.title}
                </h4>

                <p className="text-gray-600 leading-relaxed mb-5">
                  {service.desc || service.description}
                </p>

                <Link
                  href="/services"
                  className="inline-flex items-center text-[#1F2288] font-bold uppercase tracking-widest text-sm hover:translate-x-1 transition"
                >
                  Read More →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
