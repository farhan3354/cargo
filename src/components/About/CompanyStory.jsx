"use client";
import React from "react";

export default function CompanyStory() {
  return (
    <section className="py-10 bg-white">
      <div className="max-w-[1240px] mx-auto px-5 grid lg:grid-cols-2 gap-12 items-start">
        <div>
          <div className="w-20 h-[3px] bg-[#1F2288] mb-4"></div>

          <p className="text-[#1F2288] uppercase tracking-[3px] text-sm font-semibold mb-3">
            Our Story
          </p>

          <h2 className="text-4xl font-bold text-[#110713] mb-6">
            Moving Cargo With Confidence
          </h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-gray-600 leading-relaxed mb-4 text-justify">
              Manar Al Khair Cargo was founded with a strong commitment to
              provide dependable cargo and logistics services for businesses,
              traders, and individuals across local and international markets.
              Our experienced team specializes in handling air, sea, and land
              freight solutions while ensuring every shipment is transported
              safely, efficiently, and delivered on schedule without unnecessary
              delays. We offer complete logistics support including cargo
              handling, customs clearance, warehousing, packaging, and secure
              door-to-door delivery services designed to meet the unique needs
              of every customer. Through advanced tracking systems, professional
              operations, and a reliable global network, we are dedicated to
              delivering smooth, secure, and trusted shipping experiences for
              clients around the world.
            </p>
          </div>
        </div>

        <div className="rounded-3xl overflow-hidden h-[450px]">
          <img
            src="/servicesabout.jfif"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
