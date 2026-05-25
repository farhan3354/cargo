"use client"
import React from 'react'

export default function ServicesHero() {
  return (
    <section className="relative h-[55vh] flex items-center overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070"
        alt="Cargo Services"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-[#110713]/70"></div>

      <div className="max-w-[1240px] mx-auto px-5 relative z-10">
        <p className="text-white/70 uppercase tracking-[4px] text-sm mb-3">
          Our Services
        </p>

        <h1 className="text-5xl md:text-7xl font-bold text-white mb-5">
          Shipping Solutions
          <span className="block text-[#d8d9ff]">
            Built For You
          </span>
        </h1>

        <p className="text-white/80 max-w-2xl text-lg">
          Reliable cargo services tailored for businesses
          and individuals worldwide.
        </p>
      </div>
    </section>
  )
}
// import React from 'react'

// export default function ServicesHero() {
//   return (
//     <section className="relative pt-32 md:pt-40 pb-20 overflow-hidden group">
//       {/* Background Video */}
//       <div className="absolute inset-0 z-0">
//         <video 
//           autoPlay 
//           loop 
//           muted 
//           playsInline
//           className="w-full h-full object-cover"
//         >
//           {/* Replace with your aeroplane loading video */}
//           <source src="/homepageimage/second.mp4" type="video/mp4" />
//           Your browser does not support the video tag.
//         </video>
//         <div className="absolute inset-0 bg-[#110713]/80 backdrop-blur-[2px]"></div>
//       </div>

//       <div className="max-w-[1240px] mx-auto px-5 relative z-10">
//         <h1 className="text-5xl lg:text-[72px] font-bold text-white mb-8 leading-tight">
//           Our Cargo Services
//         </h1>
//         <p className="text-xl text-white/80 max-w-2xl leading-relaxed">
//           Comprehensive logistics and shipping solutions tailored to your unique requirements. From local delivery to global supply chains.
//         </p>
//       </div>
//     </section>
//   )
// }
