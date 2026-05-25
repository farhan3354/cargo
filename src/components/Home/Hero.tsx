'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'

const bannerVideos = [
  '/banner1.mp4',
  '/banner2.mp4',
  '/banner3.mp4',
]

export default function Hero() {
  const [currentVideoIndex, setCurrentVideoIndex] = React.useState(0)

  const handleVideoEnded = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % bannerVideos.length)
  }

  return (
    <section className="relative min-h-screen w-full overflow-hidden flex items-center pt-0">
      
      <div className="absolute inset-0 z-0">
        <video
          key={currentVideoIndex}
          autoPlay
          muted
          playsInline
          onEnded={handleVideoEnded}
          className="w-full h-full object-cover"
        >
          <source src={bannerVideos[currentVideoIndex]} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/45"></div>
        {/* <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a]/80 via-[#0f172a]/50 to-transparent"></div> */}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <div className="w-20 h-1 bg-white rounded-full mb-6"></div>
          <h1 className="text-white font-bold leading-tight text-2xl sm:text-3xl md:text-5xl lg:text-5xl">
           MANAR ALKHAIR CARGO
          </h1>
          <h1 className="text-white font-bold leading-tight text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
            Fast & Reliable
            <span className="block text-blue-300">
              Shipping Services
            </span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-gray-200 max-w-2xl leading-relaxed">
            Experience modern shipping and logistics solutions designed
            to streamline your delivery process worldwide.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
           

            <Link href="tel:+971523979396">
              <Button
                variant="outline"
                className="border-white text-white bg-transparent hover:bg-white/10 px-7 py-6 rounded-lg font-semibold text-sm"
              >
                Call Us
              </Button>
            </Link>

            <Link
              href="https://wa.me/971523979396"
              target="_blank"
            >
              <Button className="bg-green-500 hover:bg-green-600 text-white px-7 py-6 rounded-lg font-semibold text-sm flex items-center gap-2">
                <MessageCircle size={18} />
                WhatsApp
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}