'use client'

import React, { useState } from 'react'
import { X, ChevronLeft, ChevronRight, Play } from 'lucide-react'

const gallery = [
  {
    type: 'video',
    src: '/banner1.mp4',
    poster: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070',
    title: 'Air Cargo Operations (Video)',
  },
  {
    type: 'video',
    src: '/banner2.mp4',
    poster: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=2070',
    title: 'Logistics Center Hub (Video)',
  },
  {
    type: 'video',
    src: '/banner3.mp4',
    poster: 'https://images.unsplash.com/photo-1616432043562-3671ea2e5242?q=80&w=2070',
    title: 'Fast Cargo Delivery (Video)',
  },
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1616432043562-3671ea2e5242?q=80&w=2070',
    title: 'Domestic Cargo Routing',
  },
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=2070',
    title: 'Sea Freight Vessel',
  },
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2070',
    title: 'Air Freight Cargo',
  },
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070',
    title: 'Warehouse & Storage',
  },
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=2070',
    title: 'Secure Door-to-Door Delivery',
  },
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?q=80&w=2070',
    title: 'Custom Clearance Process',
  },
]

export default function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState(null)

  const nextImage = () => {
    setSelectedIndex((prev) =>
      prev === null ? 0 : prev === gallery.length - 1 ? 0 : prev + 1
    )
  }

  const prevImage = () => {
    setSelectedIndex((prev) =>
      prev === null ? 0 : prev === 0 ? gallery.length - 1 : prev - 1
    )
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1240px] mx-auto px-5">

        {/* Heading */}
        <div className="w-20 h-[3px] bg-[#1F2288] rounded-full mb-4"></div>
        <p className="text-[#1F2288] font-semibold uppercase tracking-[3px] text-sm mb-3">
          Gallery
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-[#110713] mb-12">
          Our Cargo Operations
        </h2>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {gallery.map((item, i) => (
            <div
              key={i}
              onClick={() => setSelectedIndex(i)}
              className="cursor-pointer rounded-3xl overflow-hidden group relative h-[300px]"
            >
              <img
                src={item.type === 'video' ? item.poster : item.src}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
              />

              {item.type === 'video' && (
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 z-10">
                  <Play size={12} fill="currentColor" />
                  Video
                </div>
              )}

              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition flex flex-col items-center justify-center">
                {item.type === 'video' && (
                  <div className="w-14 h-14 rounded-full bg-white/30 backdrop-blur-md border border-white/40 flex items-center justify-center mb-3 group-hover:scale-110 transition duration-300">
                    <Play className="text-white ml-1" size={24} fill="currentColor" />
                  </div>
                )}
                <span className="text-white opacity-0 group-hover:opacity-100 transition text-lg font-semibold px-4 text-center">
                  {item.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedIndex !== null && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center">

          {/* Close */}
          <button
            onClick={() => setSelectedIndex(null)}
            className="absolute top-6 right-6 text-white z-50"
          >
            <X size={34} />
          </button>

          {/* Left Arrow */}
          <button
            onClick={prevImage}
            className="absolute left-6 text-white bg-white/10 hover:bg-white/20 p-3 rounded-full"
          >
            <ChevronLeft size={34} />
          </button>

          {/* Media Content */}
          <div className="max-w-5xl px-6 w-full flex flex-col items-center">
            {gallery[selectedIndex].type === 'video' ? (
              <video
                src={gallery[selectedIndex].src}
                controls
                autoPlay
                className="w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl"
              />
            ) : (
              <img
                src={gallery[selectedIndex].src}
                alt={gallery[selectedIndex].title}
                className="w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl"
              />
            )}

            <p className="text-center text-white mt-6 text-xl font-semibold">
              {gallery[selectedIndex].title}
            </p>
          </div>

          {/* Right Arrow */}
          <button
            onClick={nextImage}
            className="absolute right-6 text-white bg-white/10 hover:bg-white/20 p-3 rounded-full"
          >
            <ChevronRight size={34} />
          </button>
        </div>
      )}
    </section>
  )
}
