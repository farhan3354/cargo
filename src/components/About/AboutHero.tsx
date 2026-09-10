import React from 'react'

export default function AboutHero({ data }: { data?: any }) {
  const bgImage = data?.heroImageUrl || "/homepageimage/services4.jfif";
  const title = data?.heroTitle || "Your Trusted";
  const titleHighlight = data?.heroTitleHighlight || "Cargo Partner";
  const subtitle = data?.heroSubtitle || "Delivering reliable cargo and logistics solutions across the UAE and worldwide.";

  return (
    <section className="relative h-[55vh] mt-20 flex items-center overflow-hidden">
      <img
        src={bgImage}
        alt="About Manar Cargo"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-[#110713]/70"></div>

      <div className="relative z-10 text-left max-w-[1240px] w-full mx-auto px-5">
        <p className="text-white/70 uppercase tracking-[4px] text-sm mb-3">
          About Us
        </p>

        <h1 className="text-3xl md:text-5xl font-bold text-white mb-5">
          <span className="block text-[#d8d9ff]">
            {title}
          </span>
          <span className="block text-[#d8d9ff]">
            {titleHighlight}
          </span>
        </h1>

        <p className="text-white/80 max-w-2xl text-lg whitespace-pre-wrap">
          {subtitle}
        </p>
      </div>
    </section>
  )
}

// import React from 'react'

// export default function AboutHero({ data }: { data?: any }) {
//   const bgImage = data?.heroImageUrl || "/homepageimage/services4.jfif";
//   const title = data?.heroTitle || "Your Trusted";
//   const titleHighlight = data?.heroTitleHighlight || "Cargo Partner";
//   const subtitle = data?.heroSubtitle || "Delivering reliable cargo and logistics solutions across the UAE and worldwide.";

//   return (
//     <section className="relative h-[55vh] mt-20 flex items-center overflow-hidden">
//       <img
//         src={bgImage}
//         alt="About Manar Cargo"
//         className="absolute inset-0 w-full h-full object-cover"
//       />

//       <div className="absolute inset-0 bg-[#110713]/70"></div>

//       <div className="max-w-[1240px] mx-auto px-5 relative z-10 text-left">
//         <p className="text-white/70 uppercase tracking-[4px] text-sm mb-3">
//           About Us
//         </p>

//         <h1 className="text-5xl md:text-7xl font-bold text-white mb-5">
//           {title}
//           <span className="block text-[#d8d9ff]">
//             {titleHighlight}
//           </span>
//         </h1>

//         <p className="text-white/80 max-w-2xl text-lg">
//           {subtitle}
//         </p>
//       </div>
//     </section>
//   )
// }
