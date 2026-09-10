'use client'

import React, { useEffect, useState } from 'react'
import { Star, ChevronLeft, ChevronRight, User } from 'lucide-react'

interface Testimonial {
  id: string
  name: string
  text: string
  company: string
  logoUrl?: string
  hoverColor?: string
  order?: number
}

// Fallback static reviews shown if no DB entries yet
const fallbackReviews: Testimonial[] = [
  {
    id: 'f1',
    name: 'Ahmed Hassan',
    text: 'Excellent service and very smooth delivery process. My shipment arrived safely and on time.',
    company: 'Business Customer',
  },
  {
    id: 'f2',
    name: 'Fatima Noor',
    text: 'Very professional team with clear communication throughout the shipment.',
    company: 'Retail Customer',
  },
  {
    id: 'f3',
    name: 'Mohamed Ali',
    text: 'Reliable cargo company in Dubai. Highly recommended for international shipping.',
    company: 'Commercial Client',
  },
]

export default function Testimonials() {
  const [reviews, setReviews] = useState<Testimonial[]>([])
  const [logos, setLogos] = useState<Testimonial[]>([])
  const [active, setActive] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const backendUrl =
          process.env.NEXT_PUBLIC_BACKEND_URL?.replace(/\/+$/, '').replace(/\/api$/, '') ||
          'http://127.0.0.1:4000'
        const res = await fetch(`${backendUrl}/api/testimonials`, {
          next: { revalidate: 60 },
        })
        if (!res.ok) throw new Error('Failed to fetch')
        const json = await res.json()
        const data: Testimonial[] = json.data || []
        if (data.length > 0) {
          setReviews(data)
          setLogos(data.filter((t) => t.logoUrl))
        } else {
          setReviews(fallbackReviews)
          setLogos([])
        }
      } catch {
        setReviews(fallbackReviews)
        setLogos([])
      } finally {
        setLoading(false)
      }
    }
    fetchTestimonials()
  }, [])

  useEffect(() => {
    if (reviews.length === 0) return
    const timer = setInterval(() => {
      setActive((prev) => (prev === reviews.length - 1 ? 0 : prev + 1))
    }, 5000)
    return () => clearInterval(timer)
  }, [reviews.length])

  const nextReview = () =>
    setActive((prev) => (prev === reviews.length - 1 ? 0 : prev + 1))

  const prevReview = () =>
    setActive((prev) => (prev === 0 ? reviews.length - 1 : prev - 1))

  const displayLogos = logos.length > 0 ? logos : []

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

          {/* LEFT SIDE – Logo carousel or placeholder */}
          <div className="bg-white rounded-3xl p-8 shadow-sm">

            <p className="text-gray-500 text-sm mb-2">Google Business Profile</p>

            <h3 className="text-xl font-bold text-[#110713] mb-4">
              MANAR AL KHAIR CARGO
            </h3>

            <div className="flex items-center gap-3 mb-3">
              <h3 className="text-4xl font-bold text-[#110713]">New</h3>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" className="w-5 h-5" />)}
              </div>
            </div>

            <p className="text-gray-600 mb-8">Be among the first to leave your review.</p>

            {/* Logo Marquee */}
            <div className="overflow-hidden border-t border-gray-100 pt-8">
              {displayLogos.length > 0 ? (
                <div className="flex gap-16 items-center animate-marquee whitespace-nowrap">
                  {[...displayLogos, ...displayLogos].map((t, i) => (
                    <div
                      key={`${t.id}-${i}`}
                      className={`inline-flex items-center justify-center opacity-70 hover:opacity-100 hover:scale-110 transition-all duration-300 cursor-pointer ${t.hoverColor || ''}`}
                      title={t.name}
                    >
                      <img src={t.logoUrl} alt={t.name} className="h-8 w-auto object-contain" />
                    </div>
                  ))}
                </div>
              ) : (
                /* Default static logos when no DB logos yet */
                <div className="flex gap-12 items-center animate-marquee whitespace-nowrap">
                  {[
                    { name: 'DHL', label: 'DHL', color: 'hover:text-[#D40511]' },
                    { name: 'FedEx', label: 'FedEx', color: 'hover:text-[#4D148C]' },
                    { name: 'Aramex', label: 'aramex', color: 'hover:text-[#E31B23]' },
                    { name: 'Uber', label: 'Uber', color: 'hover:text-black' },
                    { name: 'DHL', label: 'DHL', color: 'hover:text-[#D40511]' },
                    { name: 'FedEx', label: 'FedEx', color: 'hover:text-[#4D148C]' },
                    { name: 'Aramex', label: 'aramex', color: 'hover:text-[#E31B23]' },
                    { name: 'Uber', label: 'Uber', color: 'hover:text-black' },
                  ].map((logo, i) => (
                    <div
                      key={i}
                      className={`inline-flex items-center justify-center text-gray-700 opacity-70 hover:opacity-100 hover:scale-110 transition-all duration-300 cursor-pointer ${logo.color}`}
                      title={logo.name}
                    >
                      <span className="text-2xl font-black tracking-tight">{logo.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT SIDE – Review carousel */}
          <div className="bg-white rounded-3xl p-8 shadow-sm">
            {loading ? (
              <div className="animate-pulse space-y-4">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            ) : reviews.length > 0 ? (
              <>
                {/* Logo / Avatar of active reviewer */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-full overflow-hidden bg-[#EEF0FF] flex items-center justify-center border-2 border-[#1F2288]/20 flex-shrink-0">
                    {reviews[active]?.logoUrl ? (
                      <img
                        src={reviews[active].logoUrl}
                        alt={reviews[active].name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-6 h-6 text-[#1F2288]" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-[#110713]">{reviews[active]?.name}</h4>
                    <p className="text-sm text-gray-500">{reviews[active]?.company}</p>
                  </div>
                </div>

                <p className="text-xl italic text-[#110713] min-h-[120px] leading-relaxed">
                  &ldquo;{reviews[active]?.text}&rdquo;
                </p>

                <div className="flex text-yellow-400 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} fill="currentColor" size={16} />
                  ))}
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center gap-3 mt-8">
                  <button
                    onClick={prevReview}
                    className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition"
                    aria-label="Previous review"
                  >
                    <ChevronLeft />
                  </button>
                  <button
                    onClick={nextReview}
                    className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition"
                    aria-label="Next review"
                  >
                    <ChevronRight />
                  </button>
                  <span className="text-sm text-gray-400 ml-2">
                    {active + 1} / {reviews.length}
                  </span>
                </div>
              </>
            ) : (
              <div className="text-center py-12 text-gray-400">
                <Star className="w-10 h-10 mx-auto mb-3 text-yellow-300" fill="currentColor" />
                <p className="text-lg font-medium text-gray-600">No reviews yet</p>
                <p className="text-sm">Add testimonials from the admin panel.</p>
              </div>
            )}
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
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  )
}