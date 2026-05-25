"use client"
import React from 'react'

const services = [
  {
    title: 'Domestic Cargo',
    desc: 'Reliable cargo delivery across the UAE with safe and timely handling. We ensure fast pickups, secure transportation, and on-time delivery for personal and business shipments.',
    img: '/homepageimage/services1.jfif',
  },
  {
    title: 'International Cargo',
    desc: 'Worldwide shipping solutions with smooth customs handling and full shipment tracking. We connect your cargo to destinations across the globe.',
    img: '/servicesabout.jfif',
  },
  {
    title: 'Air Freight',
    desc: 'Fast air cargo services for urgent international deliveries, ideal for time-sensitive packages and commercial shipments.',
    img: '/homepageimage/services3.jfif',
  },
  {
    title: 'Sea Freight',
    desc: 'Affordable sea freight solutions for large, heavy, and commercial shipments with reliable global port coverage.',
    img: '/homepageimage/services4.jfif',
  },
  {
    title: 'Door to Door Delivery',
    desc: 'Complete pickup and final delivery service from sender to receiver with full convenience and peace of mind.',
    img: '/homepageimage/services5.jfif',
  },
  {
    title: 'Customs Clearance',
    desc: 'Quick documentation and customs support for hassle-free shipping through UAE and international borders.',
    img: '/homepageimage/services.jfif',
  },
]

export default function ServicesDetails() {
  return (
    <section className="py-8 md:py-16 bg-white">
      <div className="max-w-[1240px] mx-auto px-5">

        <div className="w-20 h-[3px] bg-[#1F2288] rounded-full mb-5"></div>

        <p className="text-[#1F2288] text-xl md:text-2xl font-semibold uppercase tracking-[3px] text-sm mb-3">
          What We Offer
        </p>

        <h2 className="text-3xl md:text-4xl text-[#110713] mb-16 max-w-3xl">
          Reliable Cargo Services Tailored To Your Needs
        </h2>

        <div className="space-y-24">
          {services.map((service, i) => (
            <div
              key={i}
              className={`grid md:grid-cols-2 gap-12 items-center ${
                i % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''
              }`}
            >
              {/* Image */}
              <div className="rounded-3xl overflow-hidden shadow-lg h-[350px]">
                <img
                  src={service.img}
                  alt={service.title}
                  className="w-full h-full object-cover hover:scale-105 transition duration-700"
                />
              </div>

              {/* Text */}
              <div>
                <span className="text-[#1F2288] text-sm font-bold tracking-[3px] uppercase">
                  Service {String(i + 1).padStart(2, '0')}
                </span>

                <h3 className="text-3xl md:text-4xl font-semibold text-[#110713] mt-3 mb-5">
                  {service.title}
                </h3>

                <p className="text-gray-600 leading-relaxed text-lg">
                  {service.desc}
                </p>

                <div className="mt-6 flex gap-3 flex-wrap">
                  <span className="px-4 py-2 bg-[#F3F4F6] rounded-full text-sm">
                    Fast Delivery
                  </span>
                  <span className="px-4 py-2 bg-[#F3F4F6] rounded-full text-sm">
                    Secure Handling
                  </span>
                  <span className="px-4 py-2 bg-[#F3F4F6] rounded-full text-sm">
                    Live Tracking
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}