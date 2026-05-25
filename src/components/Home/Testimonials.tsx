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
              "{reviews[active].text}"
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
      <style jsx>{`
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

// 'use client'

// import React, { useEffect, useState } from 'react'
// import { Star, ChevronLeft, ChevronRight } from 'lucide-react'

// const reviews = [
//   {
//     name: 'Ahmed Hassan',
//     text: 'Excellent service and very smooth delivery process. My shipment arrived safely and on time.',
//     company: 'Business Customer',
//   },
//   {
//     name: 'Fatima Noor',
//     text: 'Very professional team with clear communication throughout the shipment.',
//     company: 'Retail Customer',
//   },
//   {
//     name: 'Mohamed Ali',
//     text: 'Reliable cargo company in Dubai. Highly recommended for international shipping.',
//     company: 'Commercial Client',
//   },
// ]
// const logos = [
//   {
//     name: 'Amazon',
//     hoverColor: 'hover:text-[#FF9900]',
//     svg: (
//       <svg role="img" viewBox="0 0 24 24" className="h-7 fill-current transition-colors duration-300" xmlns="http://www.w3.org/2000/svg">
//         <title>Amazon</title>
//         <path d="M.045 18.02c.072-.116.187-.124.348-.022 3.636 2.11 7.594 3.166 11.87 3.166 2.852 0 5.668-.533 8.447-1.595l.315-.14c.138-.06.234-.1.293-.13.226-.088.39-.046.525.13.12.174.09.336-.12.48-.256.19-.6.41-1.006.654-1.244.743-2.64 1.316-4.185 1.726a17.617 17.617 0 01-10.951-.577 17.88 17.88 0 01-5.43-3.35c-.1-.074-.151-.15-.151-.22 0-.047.021-.09.051-.13zm6.565-6.218c0-1.005.247-1.863.743-2.577.495-.71 1.17-1.25 2.04-1.615.796-.335 1.756-.575 2.912-.72.39-.046 1.033-.103 1.92-.174v-.37c0-.93-.105-1.558-.3-1.875-.302-.43-.78-.65-1.44-.65h-.182c-.48.046-.896.196-1.246.46-.35.27-.575.63-.675 1.096-.06.3-.206.465-.435.51l-2.52-.315c-.248-.06-.372-.18-.372-.39 0-.046.007-.09.022-.15.247-1.29.855-2.25 1.82-2.88.976-.616 2.1-.975 3.39-1.05h.54c1.65 0 2.957.434 3.888 1.29.135.15.27.3.405.48.12.165.224.314.283.45.075.134.15.33.195.57.06.254.105.42.135.51.03.104.062.3.076.615.01.313.02.493.02.553v5.28c0 .376.06.72.165 1.036.105.313.21.54.315.674l.51.674c.09.136.136.256.136.36 0 .12-.06.226-.18.314-1.2 1.05-1.86 1.62-1.963 1.71-.165.135-.375.15-.63.045a6.062 6.062 0 01-.526-.496l-.31-.347a9.391 9.391 0 01-.317-.42l-.3-.435c-.81.886-1.603 1.44-2.4 1.665-.494.15-1.093.227-1.83.227-1.11 0-2.04-.343-2.76-1.034-.72-.69-1.08-1.665-1.08-2.94l-.05-.076zm3.753-.438c0 .566.14 1.02.425 1.364.285.34.675.512 1.155.512.045 0 .106-.007.195-.02.09-.016.134-.023.166-.023.614-.16 1.08-.553 1.424-1.178.165-.28.285-.58.36-.91.09-.32.12-.59.135-.8.015-.195.015-.54.015-1.005v-.54c-.84 0-1.484.06-1.92.18-1.275.36-1.92 1.17-1.92 2.43l-.035-.02zm9.162 7.027c.03-.06.075-.11.132-.17.362-.243.714-.41 1.05-.5a8.094 8.094 0 011.612-.24c.14-.012.28 0 .41.03.65.06 1.05.168 1.172.33.063.09.099.228.099.39v.15c0 .51-.149 1.11-.424 1.8-.278.69-.664 1.248-1.156 1.68-.073.06-.14.09-.197.09-.03 0-.06 0-.09-.012-.09-.044-.107-.12-.064-.24.54-1.26.806-2.143.806-2.64 0-.15-.03-.27-.087-.344-.145-.166-.55-.257-1.224-.257-.243 0-.533.016-.87.046-.363.045-.7.09-1 .135-.09 0-.148-.014-.18-.044-.03-.03-.036-.047-.02-.077 0-.017.006-.03.02-.063v-.06z" />
//       </svg>
//     )
//   },
//   {
//     name: 'DHL',
//     hoverColor: 'hover:text-[#D40511]',
//     svg: (
//       <svg role="img" viewBox="0 0 24 24" className="h-6 fill-current transition-colors duration-300" xmlns="http://www.w3.org/2000/svg">
//         <title>DHL</title>
//         <path d="M4.22 10.303l-.767 1.043h4.18c.21 0 .208.078.105.218-.105.142-.28.39-.386.534-.054.073-.154.207.171.207h1.71l.505-.69c.314-.426.028-1.312-1.095-1.312H4.22zm7.204 0l-1.475 2.002h5.39l1.473-2.002H14.61l-.843 1.146h-.985l.846-1.146h-2.203zm6.105 0l-1.474 2.002h2.334l1.472-2.002H17.53zm-12.845 1.3l-1.54 2.094h3.754c1.24 0 1.932-.844 2.145-1.136h-2.56c-.326 0-.226-.133-.172-.207.107-.143.283-.388.388-.53.104-.14.107-.22-.105-.22h-1.91zM0 12.562v.242h3.398l.176-.242H0zm9.762 0l-.836 1.136h2.203l.836-1.136H9.762zm3.185 0l-.836 1.136h2.203l.836-1.136h-2.203zm2.918 0s-.159.22-.238.326c-.276.374-.033.81.87.81h3.538l.834-1.136h-5.004zm5.408 0l-.177.242H24v-.242h-2.727zM0 13.01v.24h3.068l.178-.24H0zm20.943 0l-.175.24H24v-.24h-3.057zM0 13.457v.24h2.74l.176-.24H0zm20.615 0l-.177.24H24v-.24h-3.385z" />
//       </svg>
//     )
//   },
//   {
//     name: 'FedEx',
//     hoverColor: 'hover:text-[#4D148C]',
//     svg: (
//       <svg role="img" viewBox="0 0 24 24" className="h-7 fill-current transition-colors duration-300" xmlns="http://www.w3.org/2000/svg">
//         <title>FedEx</title>
//         <path d="M22.498 14.298c-.016-.414.345-.751.75-.755a.745.745 0 0 1 .752.755.755.755 0 0 1-.751.745c-.395.002-.759-.346-.751-.745zm.759-.083c.067-.02.164-.042.162-.13.007-.09-.086-.133-.162-.134h-.163v.263c0 .001.165-.002.163.001zm-.163.107v.418h-.14v-.91h.327c.156-.021.294.092.286.253a.218.218 0 0 1-.156.19c.162.083.108.322.173.467h-.156a2.355 2.355 0 0 1-.04-.205c-.018-.093-.047-.229-.17-.213h-.124zm.76-.024a.603.603 0 0 0-.605-.632c-.338-.012-.62.302-.605.632a.619.619 0 0 0 .605.622.61.61 0 0 0 .605-.622zm-5.052-.579l-.878 1.008h-1.306l1.559-1.745-1.56-1.75h1.355l.902.997.878-.998h1.306l-1.543 1.743 1.559 1.753h-1.371l-.901-1.008zm-4.703-.352v-.827h1.904v-1.506l1.724 1.948-1.724 1.941v-1.556h-1.904zm1.56 1.36h-3.2V9.044h3.224v1.024H13.77v1.163h1.888v.958h-1.904v1.522h1.904v1.016zm-5.705-.655c-.54.017-.878-.552-.877-1.04-.01-.507.307-1.123.878-1.105.579-.025.871.6.845 1.103.023.501-.29 1.062-.846 1.042zM4.743 12.41c.076-.358.403-.67.78-.663a.788.788 0 0 1 .803.663H4.743zm15.182.564l1.815-2.047h-2.125l-.74.844-.763-.844h-4.037v-.548h1.912V8.741H10.84v2.58c-.362-.448-.981-.559-1.526-.492-.782.123-1.427.762-1.634 1.514-.254-.958-1.179-1.588-2.157-1.554-.781.009-1.6.365-1.987 1.071v-.818h-1.87v-.9h2.043v-1.4H0v6.287h1.666v-2.644h1.666a7.59 7.59 0 0 0-.082.622c-.013 1.232 1.042 2.27 2.274 2.236a2.204 2.204 0 0 0 2.157-1.432H6.254c-.14.268-.441.38-.73.36-.457.009-.83-.417-.829-.86h2.914c.083 1.027.988 1.966 2.043 1.947a1.53 1.53 0 0 0 1.19-.639v.41h7.215l.754-.86.754.86h2.192l-1.832-2.055z" />
//       </svg>
//     )
//   },
//   {
//     name: 'Aramex',
//     hoverColor: 'hover:text-[#E31B23]',
//     svg: (
//       <div className="flex items-center select-none font-black text-2xl tracking-tighter transition-colors duration-300 font-sans leading-none">
//         aramex
//       </div>
//     )
//   },
//   {
//     name: 'Uber',
//     hoverColor: 'hover:text-black',
//     svg: (
//       <svg role="img" viewBox="0 0 24 24" className="h-6 fill-current transition-colors duration-300" xmlns="http://www.w3.org/2000/svg">
//         <title>Uber</title>
//         <path d="M0 7.97v4.958c0 1.867 1.302 3.101 3 3.101.826 0 1.562-.316 2.094-.87v.736H6.27V7.97H5.082v4.888c0 1.257-.85 2.106-1.947 2.106-1.11 0-1.946-.827-1.946-2.106V7.971H0zm7.44 0v7.925h1.13v-.725c.521.532 1.257.86 2.06.86a3.006 3.006 0 0 0 3.034-3.01 3.01 3.01 0 0 0-3.033-3.024 2.86 2.86 0 0 0-2.049.861V7.971H7.439zm9.869 2.038c-1.687 0-2.965 1.37-2.965 3 0 1.72 1.334 3.01 3.066 3.01 1.053 0 1.913-.463 2.49-1.233l-.826-.611c-.43.577-.996.847-1.664.847-.973 0-1.753-.7-1.912-1.64h4.697v-.373c0-1.72-1.222-3-2.886-3zm6.295.068c-.634 0-1.098.294-1.381.758v-.713h-1.131v5.774h1.142V12.61c0-.894.544-1.47 1.291-1.47H24v-1.065h-.396zm-6.319.928c.85 0 1.564.588 1.756 1.47H15.52c.203-.882.916-1.47 1.765-1.47zm-6.732.012c1.086 0 1.98.883 1.98 2.004a1.993 1.993 0 0 1-1.98 2.001A1.989 1.989 0 0 1 8.56 13.02a1.99 1.99 0 0 1 1.992-2.004z" />
//       </svg>
//     )
//   }
// ];
// export default function Testimonials() {
//   const [active, setActive] = useState(0)

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setActive((prev) =>
//         prev === reviews.length - 1 ? 0 : prev + 1
//       )
//     }, 5000)

//     return () => clearInterval(timer)
//   }, [])

//   const nextReview = () => {
//     setActive((prev) =>
//       prev === reviews.length - 1 ? 0 : prev + 1
//     )
//   }

//   const prevReview = () => {
//     setActive((prev) =>
//       prev === 0 ? reviews.length - 1 : prev - 1
//     )
//   }

//   return (
//     <section className="py-12 bg-[#f8fafc]">
//       <div className="max-w-[1240px] mx-auto px-5">

//         <div className="w-20 h-[3px] bg-[#1F2288] rounded-full mb-4"></div>
//         <p className="text-[#1F2288] font-semibold uppercase tracking-[3px] text-sm mb-3">
//           Our Customers
//         </p>

//         <h2 className="text-4xl md:text-5xl font-bold text-[#110713] mb-12">
//           Trusted By Our Customers
//         </h2>

//         <div className="grid lg:grid-cols-2 gap-8">

//           {/* LEFT SIDE */}
//           <div className="bg-white rounded-3xl p-8 shadow-sm">

//             <p className="text-gray-500 text-sm mb-2">
//               Google Business Profile
//             </p>

//             <h3 className="text-xl font-bold text-[#110713] mb-4">
//               MANAR AL KHAIR CARGO
//             </h3>

//             <div className="flex items-center gap-3 mb-3">
//               <h3 className="text-4xl font-bold text-[#110713]">
//                 New
//               </h3>

//               <div className="flex text-yellow-400">
//                 <Star fill="currentColor" />
//                 <Star fill="currentColor" />
//                 <Star fill="currentColor" />
//                 <Star fill="currentColor" />
//                 <Star fill="currentColor" />
//               </div>
//             </div>

//             <p className="text-gray-600 mb-8">
//               Be among the first to leave your review.
//             </p>

//             {/* Customer logos */}
//             <div className="overflow-hidden border-t border-gray-100 pt-6">
//               <div className="flex gap-12 items-center animate-marquee">
//                 {[...logos, ...logos].map((logo, i) => (
//                   <div
//                     key={i}
//                     className={`inline-flex items-center justify-center text-slate-400 opacity-60 hover:opacity-100 transition-all duration-300 ${logo.hoverColor}`}
//                     title={logo.name}
//                   >
//                     {logo.svg}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* RIGHT SIDE */}
//           <div className="bg-white rounded-3xl p-8 shadow-sm">

//             <p className="text-xl italic text-[#110713] min-h-[120px] leading-relaxed">
//               "{reviews[active].text}"
//             </p>

//             <div className="mt-8">
//               <h4 className="font-bold text-[#110713]">
//                 {reviews[active].name}
//               </h4>

//               <p className="text-sm text-gray-500">
//                 {reviews[active].company}
//               </p>

//               <div className="flex text-yellow-400 mt-2">
//                 {[...Array(5)].map((_, i) => (
//                   <Star key={i} fill="currentColor" size={16} />
//                 ))}
//               </div>
//             </div>

//             {/* arrows stay */}
//             <div className="flex gap-3 mt-8">
//               <button
//                 onClick={prevReview}
//                 className="p-3 rounded-full bg-gray-100 hover:bg-gray-200"
//               >
//                 <ChevronLeft />
//               </button>

//               <button
//                 onClick={nextReview}
//                 className="p-3 rounded-full bg-gray-100 hover:bg-gray-200"
//               >
//                 <ChevronRight />
//               </button>
//             </div>
//           </div>

//         </div>
//       </div>

//       <style jsx>{`
//         .animate-marquee {
//           animation: marquee 18s linear infinite;
//         }

//         @keyframes marquee {
//           from {
//             transform: translateX(0);
//           }
//           to {
//             transform: translateX(-50%);
//           }
//         }
//       `}</style>
//     </section>
//   )
// }