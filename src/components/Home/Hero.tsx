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
  const [isVideoReady, setIsVideoReady] = React.useState(false);
  const [videoError, setVideoError] = React.useState(false);

  // Normalize videos to strings (handles DB objects or fallback array)
  const videos = React.useMemo(() => {
    if (dbVideos.length > 0) {
      return dbVideos.map(v => {
        if (typeof v === 'string') return v;
        return v?.url || v?.videoUrl || '';
      }).filter(v => v !== '');
    }
    return defaultBannerVideos;
  }, [dbVideos]);

  // Reset error flag when video source changes
  React.useEffect(() => {
    setVideoError(false);
  }, [videos, currentVideoIndex]);

  const handleVideoEnded = () => {
    if (videos.length > 1) {
      setIsVideoReady(false);
      setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
    }
  }

  return (
    <section className="relative min-h-screen w-full overflow-hidden flex items-center pt-0">
      
      <div className="absolute inset-0 z-0 bg-slate-900">
        {/* Placeholder image – always visible while video is loading or on error */}
        <img
          src="/hero-placeholder.jpg"
          alt="Hero background"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${!isVideoReady || videoError ? 'opacity-100' : 'opacity-0'}`}
        />

        {/* Loading spinner (shown only while video is buffering) */}
        {!isVideoReady && !videoError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="animate-spin h-12 w-12 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
            </svg>
          </div>
        )}

        {/* Video element – hidden if not ready or if an error occurs */}
        <video
          key={videos[currentVideoIndex]}
          autoPlay
          muted
          playsInline
          loop={videos.length === 1}
          preload="metadata"
          onCanPlay={() => setIsVideoReady(true)}
          onEnded={handleVideoEnded}
          onError={() => setVideoError(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${isVideoReady && !videoError ? 'opacity-100' : 'opacity-0'}`}
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

// 'use client'

// import React from 'react'
// import Link from 'next/link'
// import { Button } from '@/components/ui/button'
// import { MessageCircle } from 'lucide-react'

// const defaultBannerVideos = [
//   '/banner1.mp4',
//   '/banner2.mp4',
//   '/banner3.mp4',
// ]

// interface HeroProps {
//   heroTitle?: string;
//   heroSubtitle?: string;
//   dbVideos?: any[];
// }

// export default function Hero({ heroTitle, heroSubtitle, dbVideos = [] }: HeroProps) {
//   const [currentVideoIndex, setCurrentVideoIndex] = React.useState(0)
  
//   const videos = dbVideos.length > 0 ? dbVideos.map(v => v.url) : defaultBannerVideos;

//   const handleVideoEnded = () => {
//     if (videos.length > 1) {
//       setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length)
//     }
//   }

//   return (
//     <section className="relative min-h-screen w-full overflow-hidden flex items-center pt-0">
      
//       <div className="absolute inset-0 z-0 bg-slate-900">
//         <video
//           key={videos[currentVideoIndex]}
//           autoPlay
//           muted
//           playsInline
//           loop={videos.length === 1}
//           preload="auto"
//           onEnded={handleVideoEnded}
//           onError={handleVideoEnded}
//           className="w-full h-full object-cover hero-fade-in"
//         >
//           <source src={videos[currentVideoIndex]} type="video/mp4" />
//         </video>
//         <div className="absolute inset-0 bg-black/45"></div>
//       </div>

//       <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
//         <div className="max-w-3xl hero-content-fade">
//           <div className="w-20 h-1 bg-white rounded-full mb-6"></div>
//           <h1 className="text-white font-bold leading-tight text-2xl sm:text-3xl md:text-5xl lg:text-5xl">
//            {heroTitle || "MANAR ALKHAIR CARGO"}
//           </h1>
//           <h1 className="text-white font-bold leading-tight text-2xl sm:text-3xl md:text-4xl lg:text-5xl whitespace-pre-line">
//             {heroSubtitle || "Fast & Reliable\nShipping Services"}
//           </h1>

//           <p className="mt-6 text-lg md:text-xl text-gray-200 max-w-2xl leading-relaxed">
//             Experience modern shipping and logistics solutions designed
//             to streamline your delivery process worldwide.
//           </p>

//           <div className="mt-8 flex flex-wrap gap-4">
//             <Link href="tel:+971523979396">
//               <Button
//                 variant="outline"
//                 className="border-white text-white bg-transparent hover:bg-white/10 px-7 py-6 rounded-lg font-semibold text-sm"
//               >
//                 Call Us
//               </Button>
//             </Link>

//             <Link
//               href="https://wa.me/971523979396"
//               target="_blank"
//             >
//               <Button className="bg-green-500 hover:bg-green-600 text-white px-7 py-6 rounded-lg font-semibold text-sm flex items-center gap-2">
//                 <MessageCircle size={18} />
//                 WhatsApp
//               </Button>
//             </Link>
//           </div>
//         </div>
//       </div>

//       <style>{`
//         .hero-fade-in {
//           animation: heroFadeIn 1s ease-in-out;
//         }
//         .hero-content-fade {
//           animation: heroContentFade 0.8s ease-out both;
//         }
//         @keyframes heroFadeIn {
//           from { opacity: 0; }
//           to { opacity: 1; }
//         }
//         @keyframes heroContentFade {
//           from { opacity: 0; transform: translateY(40px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//       `}</style>
//     </section>
//   )
// }