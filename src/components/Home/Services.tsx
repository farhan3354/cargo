"use client"
import React from 'react'
import Link from 'next/link'

// const services = [
//   {
//     title: 'Domestic Shipping',
//     desc: 'Fast and reliable shipping services across the country.',
//     img: 'https://manarcargo.com/wp-content/uploads/2026/05/WhatsApp-Image-2026-05-13-at-4.09.51-PM-3.jpeg',
//   },
//   {
//     title: 'International Shipping',
//     desc: 'Efficient shipping solutions for global destinations.',
//     img: 'https://manarcargo.com/wp-content/uploads/2026/05/WhatsApp-Image-2026-05-13-at-4.09.48-PM-1.jpeg',
//   },
//   {
//     title: 'Express Delivery',
//     desc: 'Swift delivery options for urgent shipments.',
//     img: 'https://manarcargo.com/wp-content/uploads/2026/05/pexels-photo-34406344.jpeg',
//   },
//   {
//     title: 'Air Freight',
//     desc: 'Rapid air cargo services for time-sensitive international shipments.',
//     img: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05',
//   },
//   {
//     title: 'Sea Freight',
//     desc: 'Cost-effective ocean freight solutions for large-scale cargo.',
//     img: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec',
//   },
//   {
//     title: 'Warehousing',
//     desc: 'Secure storage and inventory management for your goods.',
//     img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d',
//   },
//   {
//     title: 'Customs Clearance',
//     desc: 'Smooth customs processing and documentation support.',
//     img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40',
//   },
//   {
//     title: 'Door to Door Delivery',
//     desc: 'Complete pickup and delivery service from sender to recipient.',
//     img: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7',
//   },
//   {
//     title: 'Package Tracking',
//     desc: 'Real-time shipment tracking and delivery updates.',
//     img: 'https://images.unsplash.com/photo-1556740749-887f6717d7e4',
//   },
// ]
const services = [
  {
    title: 'Domestic Cargo',
    desc: 'Reliable cargo delivery across the UAE with safe and timely handling.',
    img: '/homepageimage/services1.jfif',
  },
  {
    title: 'International Cargo',
    desc: 'Worldwide shipping solutions with smooth customs and tracking.',
   img: '/servicesabout.jfif' },
  {
    title: 'Air Freight',
    desc: 'Fast air cargo services for urgent international deliveries.',
    img: '/homepageimage/services3.jfif',
  },
  {
    title: 'Sea Freight',
    desc: 'Affordable sea freight for large and commercial shipments.',
    img: '/homepageimage/services4.jfif',
  },
  {
    title: 'Door to Door Delivery',
    desc: 'Complete pickup and delivery service from sender to receiver.',
    img: '/homepageimage/services5.jfif',
  },
  {
    title: 'Customs Clearance',
    desc: 'Quick documentation and customs support for hassle-free shipping.',
    img: '/homepageimage/services.jfif',
  },
]

export default function Services() {
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
          {services.map((service, i) => (
            <div
              key={i}
              className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition duration-300"
            >
              {/* Image */}
              <div className="overflow-hidden h-[240px]">
                <img
                  src={service.img}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-7">
                <span className="text-3xl font-bold text-[#1F2288]">
                </span>

                <h4 className="text-2xl font-semibold text-[#110713] mt-3 mb-3">
                  {service.title}
                </h4>

                <p className="text-gray-600 leading-relaxed mb-5">
                  {service.desc}
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
  )
}
