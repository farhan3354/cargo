"use client"
import React from 'react'

export default function ContactHero() {
  return (
    <section className="relative h-[55vh] mt-20 flex items-center overflow-hidden">
      <img
        src="/homepageimage/services4.jfif"
        alt="About Manar Cargo"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-[#110713]/70"></div>

      <div className="max-w-[1240px] mx-auto px-5 relative z-10">
        <p className="text-white/70 uppercase tracking-[4px] text-sm mb-3">
          Contact Us
        </p>

        <h1 className="text-3xl md:text-5xl font-bold text-white mb-5">
          <span className="block text-[#d8d9ff]">
            Manar Cargo
          </span>
        </h1>

        <p className="text-white/80 max-w-2xl text-lg">
          Get in touch with our team for shipping, logistics,
              cargo tracking, and support services.
        </p>
      </div>
    </section>
  )
}

// import React from 'react'

// export default function AboutHero() {
//   return (
//     <section className="pt-48 pb-32 bg-white">
//       <div className="max-w-[1240px] mx-auto px-5">
//         <div className="grid lg:grid-cols-2 gap-16 items-center">
//           <div>
//             <div className="w-12 h-1 bg-[#1F2288] mb-6"></div>
//             <h1 className="text-5xl lg:text-[64px] font-bold text-[#110713] mb-8 leading-tight">
//               About Manar Alkhair Cargo
//             </h1>
//             <p className="text-xl text-[#66556B] leading-relaxed">
//               Connecting the world through reliable, fast, and secure logistics solutions. We bridge distances and empower businesses with our state-of-the-art shipping infrastructure.
//             </p>
//           </div>
          
//           <div className="rounded-[3rem] overflow-hidden shadow-2xl h-[500px] relative group">
//             {/* Replace with your 'working' video */}
//             <video 
//               autoPlay 
//               loop 
//               muted 
//               playsInline
//               className="w-full h-full object-cover"
//             >
//               <source src="/homepageimage/working.mp4" type="video/mp4" />
//               Your browser does not support the video tag.
//             </video>
//             <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }


