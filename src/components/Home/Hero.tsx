'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { MessageCircle } from 'lucide-react'

const defaultBannerVideos = [
  '/banner1.mp4',
  '/banner2.mp4',
  '/banner3.mp4',
]

interface HeroProps {
  heroTitle?: string;
  heroSubtitle?: string;
  dbVideos?: any[];
}

export default function Hero({ heroTitle, heroSubtitle, dbVideos = [] }: HeroProps) {
  const [currentVideoIndex, setCurrentVideoIndex] = React.useState(0)
  
  const videos = dbVideos.length > 0 ? dbVideos.map(v => v.url) : defaultBannerVideos;

  const handleVideoEnded = () => {
    if (videos.length > 1) {
      setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length)
    }
  }

  return (
    <section className="relative min-h-screen w-full overflow-hidden flex items-center pt-0">
      
      <div className="absolute inset-0 z-0 bg-slate-900">
        <video
          key={videos[currentVideoIndex]}
          autoPlay
          muted
          playsInline
          loop={videos.length === 1}
          preload="none"
          onEnded={handleVideoEnded}
          onError={handleVideoEnded}
          className="w-full h-full object-cover hero-fade-in"
        >
          <source src={videos[currentVideoIndex]} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/45"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
        <div className="max-w-3xl hero-content-fade">
          <div className="w-20 h-1 bg-white rounded-full mb-6"></div>
          <h1 className="text-white font-bold leading-tight text-2xl sm:text-3xl md:text-5xl lg:text-5xl">
           {heroTitle || "MANAR ALKHAIR CARGO"}
          </h1>
          <h1 className="text-white font-bold leading-tight text-2xl sm:text-3xl md:text-4xl lg:text-5xl whitespace-pre-line">
            {heroSubtitle || "Fast & Reliable\nShipping Services"}
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
        </div>
      </div>

      <style>{`
        .hero-fade-in {
          animation: heroFadeIn 1s ease-in-out;
        }
        .hero-content-fade {
          animation: heroContentFade 0.8s ease-out both;
        }
        @keyframes heroFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes heroContentFade {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  )
}