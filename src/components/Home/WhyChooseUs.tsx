"use client"
import React, { useRef, useEffect } from 'react'
import { CheckCircle2 } from 'lucide-react'

const features = [
  {
    title: 'Timely Delivery',
    desc: 'We guarantee punctual deliveries to ensure your shipments arrive when you need them, every time.',
  },
  {
    title: 'Customer Focused',
    desc: 'Our team is committed to providing exceptional service with support available whenever you need assistance.',
  },
  {
    title: 'Global Reach',
    desc: 'With a strong international network, we deliver your goods efficiently no matter the destination.',
  },
]

export default function WhyChooseUs() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {})
          } else {
            video.pause()
          }
        })
      },
      { threshold: 0.25 }
    )

    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="py-10 md:py-12 bg-[#f8fafc]">
      <div className="max-w-[1240px] mx-auto px-5">
        <div className="grid lg:grid-cols-12 gap-12 items-start">

          <div className="lg:col-span-6">

            <div className="w-20 h-[3px] bg-[#1F2288] rounded-full mb-4"></div>
            <p className="text-[#1F2288] font-semibold uppercase tracking-[3px] text-sm mb-3 text-justify">
              Why Choose Us
            </p>

            <h2 className="text-3xl md:text-5xl font-bold text-[#110713] leading-tight mb-8 text-justify">
              Trusted Cargo Solutions
              <span className="block text-[#1F2288] text-justify">
                Built Around Your Needs
              </span>
            </h2>

            <div className="space-y-6">
              {features.map((item, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-2 shadow-sm hover:shadow-md transition"
                >
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-[#1F2288] mt-1 flex-shrink-0" />

                    <div>
                      <h4 className="text-xl font-semibold text-[#110713] mb-2 text-justify">
                        {item.title}
                      </h4>
                      <p className="text-gray-600 leading-relaxed text-justify">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-xl overflow-hidden h-[550px] shadow-xl relative group">
              <video
                ref={videoRef}
                loop
                muted
                playsInline
                preload="none"
                className="w-full h-[650px] object-cover group-hover:scale-110 transition duration-700"
              >
                <source src="/homepageimage/custom.mp4" type="video/mp4" />
              </video>

              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition"></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
// "use client"
// import React, { useRef, useEffect } from 'react'
// import { CheckCircle2 } from 'lucide-react'

// const features = [
//   {
//     title: 'Timely Delivery',
//     desc: 'We guarantee punctual deliveries to ensure your shipments arrive when you need them, every time.',
//   },
//   {
//     title: 'Customer Focused',
//     desc: 'Our team is committed to providing exceptional service with support available whenever you need assistance.',
//   },
//   {
//     title: 'Global Reach',
//     desc: 'With a strong international network, we deliver your goods efficiently no matter the destination.',
//   },
// ]

// export default function WhyChooseUs() {
//   const videoRef = useRef<HTMLVideoElement>(null)

//   useEffect(() => {
//     const video = videoRef.current
//     if (!video) return

//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             video.play().catch(() => {})
//           } else {
//             video.pause()
//           }
//         })
//       },
//       { threshold: 0.25 }
//     )

//     observer.observe(video)
//     return () => observer.disconnect()
//   }, [])

//   return (
//     <section className="py-10 md:py-12 bg-[#f8fafc]">
//       <div className="max-w-[1240px] mx-auto px-5">
//         <div className="grid lg:grid-cols-12 gap-12 items-start">

//           <div className="lg:col-span-6">

//             <div className="w-20 h-[3px] bg-[#1F2288] rounded-full mb-4"></div>
//             <p className="text-[#1F2288] font-semibold uppercase tracking-[3px] text-sm mb-3">
//               Why Choose Us
//             </p>

//             <h2 className="text-3xl md:text-5xl font-bold text-[#110713] leading-tight mb-8">
//               Trusted Cargo Solutions
//               <span className="block text-[#1F2288]">
//                 Built Around Your Needs
//               </span>
//             </h2>

//             <div className="space-y-6">
//               {features.map((item, i) => (
//                 <div
//                   key={i}
//                   className="bg-white rounded-2xl p-2 shadow-sm hover:shadow-md transition"
//                 >
//                   <div className="flex items-start gap-4">
//                     <CheckCircle2 className="w-6 h-6 text-[#1F2288] mt-1 flex-shrink-0" />

//                     <div>
//                       <h4 className="text-xl font-semibold text-[#110713] mb-2">
//                         {item.title}
//                       </h4>
//                       <p className="text-gray-600 leading-relaxed">
//                         {item.desc}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="lg:col-span-6">
//             <div className="rounded-xl overflow-hidden h-[550px] shadow-xl relative group">
//               <video
//                 ref={videoRef}
//                 loop
//                 muted
//                 playsInline
//                 preload="none"
//                 className="w-full h-[650px] object-cover group-hover:scale-110 transition duration-700"
//               >
//                 <source src="/homepageimage/custom.mp4" type="video/mp4" />
//               </video>

//               <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition"></div>
//             </div>
//           </div>

//         </div>
//       </div>
//     </section>
//   )
// }
