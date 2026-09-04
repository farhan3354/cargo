'use client'

import React, { useEffect, useState } from 'react'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'

const reviews = [
  {
    name: 'Ahmed Hassan',
    text: 'Excellent service and very smooth delivery process. My shipment arrived safely and on time.',
    company: 'Business Customer',
  },
  {
    name: 'Fatima Noor',
    text: 'Very professional team with clear communication throughout the shipment.',
    company: 'Retail Customer',
  },
  {
    name: 'Mohamed Ali',
    text: 'Reliable cargo company in Dubai. Highly recommended for international shipping.',
    company: 'Commercial Client',
  },
]

const logos = [
  {
    name: 'Amazon',
    hoverColor: 'hover:text-[#FF9900]',
    svg: (
      <svg
        role="img"
        viewBox="0 0 24 24"
        className="h-8 fill-current transition-colors duration-300"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Amazon</title>
        <path d="M.045 18.02c.072-.116.187-.124.348-.022 3.636 2.11 7.594 3.166 11.87 3.166 2.852 0 5.668-.533 8.447-1.595l.315-.14c.138-.06.234-.1.293-.13.226-.088.39-.046.525.13.12.174.09.336-.12.48-.256.19-.6.41-1.006.654-1.244.743-2.64 1.316-4.185 1.726a17.617 17.617 0 01-10.951-.577 17.88 17.88 0 01-5.43-3.35c-.1-.074-.151-.15-.151-.22 0-.047.021-.09.051-.13z" />
      </svg>
    )
  },
  {
    name: 'DHL',
    hoverColor: 'hover:text-[#D40511]',
    svg: (
      <div className="text-3xl font-black tracking-widest">
        DHL
      </div>
    )
  },
  {
    name: 'FedEx',
    hoverColor: 'hover:text-[#4D148C]',
    svg: (
      <div className="text-3xl font-extrabold">
        Fed<span className="text-orange-500">Ex</span>
      </div>
    )
  },
  {
    name: 'Aramex',
    hoverColor: 'hover:text-[#E31B23]',
    svg: (
      <div className="text-3xl font-black tracking-tight lowercase">
        aramex
      </div>
    )
  },
  {
    name: 'Uber',
    hoverColor: 'hover:text-black',
    svg: (
      <div className="text-3xl font-bold">
        Uber
      </div>
    )
  },
]

export default function Testimonials() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) =>
        prev === reviews.length - 1 ? 0 : prev + 1
      )
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  const nextReview = () => {
    setActive((prev) =>
      prev === reviews.length - 1 ? 0 : prev + 1
    )
  }

  const prevReview = () => {
    setActive((prev) =>
      prev === 0 ? reviews.length - 1 : prev - 1
    )
  }

  return (
    <section className="py-8 bg-[#f8fafc] overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-5">

        {/* Heading */}
        <div className="w-20 h-[3px] bg-[#1F2288] rounded-full mb-4"></div>

        <p className="text-[#1F2288] font-semibold uppercase tracking-[3px] text-sm mb-3">
          Our Customers
        </p>

        <h2 className="text-4xl md:text-5xl font-bold text-[#110713] mb-12">
          Trusted By Our Customers
        </h2>

        <div className="grid lg:grid-cols-2 gap-8">

          {/* LEFT SIDE */}
          <div className="bg-white rounded-3xl p-8 shadow-sm">

            <p className="text-gray-500 text-sm mb-2">
              Google Business Profile
            </p>

            <h3 className="text-xl font-bold text-[#110713] mb-4">
              MANAR AL KHAIR CARGO
            </h3>

            <div className="flex items-center gap-3 mb-3">
              <h3 className="text-4xl font-bold text-[#110713]">
                New
              </h3>

              <div className="flex text-yellow-400">
                <Star fill="currentColor" />
                <Star fill="currentColor" />
                <Star fill="currentColor" />
                <Star fill="currentColor" />
                <Star fill="currentColor" />
              </div>
            </div>

            <p className="text-gray-600 mb-8">
              Be among the first to leave your review.
            </p>

            {/* Customer Logos */}
            <div className="overflow-hidden border-t border-gray-100 pt-8">

              <div className="flex gap-16 items-center animate-marquee whitespace-nowrap">

                {[...logos, ...logos].map((logo, i) => (

                  <div
                    key={i}
                    className={`inline-flex items-center justify-center text-gray-700 opacity-70 hover:opacity-100 hover:scale-110 transition-all duration-300 cursor-pointer ${logo.hoverColor}`}
                    title={logo.name}
                  >
                    {logo.svg}
                  </div>

                ))}

              </div>

            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="bg-white rounded-3xl p-8 shadow-sm">

            <p className="text-xl italic text-[#110713] min-h-[120px] leading-relaxed">
              &ldquo;{reviews[active].text}&rdquo;
            </p>

            <div className="mt-8">

              <h4 className="font-bold text-[#110713]">
                {reviews[active].name}
              </h4>

              <p className="text-sm text-gray-500">
                {reviews[active].company}
              </p>

              <div className="flex text-yellow-400 mt-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} fill="currentColor" size={16} />
                ))}
              </div>

            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-8">

              <button
                onClick={prevReview}
                className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition"
              >
                <ChevronLeft />
              </button>

              <button
                onClick={nextReview}
                className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition"
              >
                <ChevronRight />
              </button>

            </div>

          </div>

        </div>
      </div>

      {/* Marquee Animation */}
      <style>{`
        .animate-marquee {
          width: max-content;
          animation: marquee 18s linear infinite;
        }

        @keyframes marquee {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  )
}