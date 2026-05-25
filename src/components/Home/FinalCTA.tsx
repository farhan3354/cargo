'use client'

import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const faqs = [
  {
    question: 'How long does shipping usually take?',
    answer:
      'Delivery times vary depending on destination and service type. Domestic shipments are usually delivered within 1–3 days, while international shipments depend on customs and destination country.',
  },
  {
    question: 'Do you offer door-to-door delivery?',
    answer:
      'Yes, we provide complete door-to-door cargo services for both local and international shipments.',
  },
  {
    question: 'Can I track my shipment?',
    answer:
      'Absolutely. Once your shipment is booked, you will receive tracking details to monitor your cargo in real time.',
  },
  {
    question: 'Which countries do you ship to?',
    answer:
      'We provide worldwide shipping services with reliable logistics partners across multiple countries.',
  },
]

export default function FAQSection() {
  const [open, setOpen] = useState(0)

  return (
    <section className="py-10 bg-[#f8fafc]">
      <div className="max-w-4xl mx-auto px-5 text-center">

        <div className="w-20 h-[3px] bg-[#1F2288] rounded-full mx-auto mb-4"></div>

        <p className="text-[#1F2288] font-semibold uppercase tracking-[3px] text-sm mb-3">
          FAQs
        </p>

        <h2 className="text-4xl md:text-5xl font-bold text-[#110713] mb-12">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4 text-left">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-sm border overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? -1 : i)}
                className="w-full px-6 py-5 flex justify-between items-center text-left"
              >
                <span className="font-semibold text-[#110713]">
                  {faq.question}
                </span>

                <ChevronDown
                  className={`transition ${
                    open === i ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {open === i && (
                <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10">
          <Link href="#quote">
            <Button className="bg-[#1F2288] hover:bg-[#161966] text-white px-8 py-6 rounded-lg">
              Get A Quote
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

// import React from 'react'
// import Link from 'next/link'
// import { Button } from '@/components/ui/button'
// import { ArrowRight, Ship, Package, Clock } from 'lucide-react'

// export default function FinalCTA() {
//   return (
//     <section className="relative py-6 md:py-12 lg:py-12 overflow-hidden group">
//       <div className="absolute inset-0 z-0">
//         <img 
//           src="https://manarcargo.com/wp-content/uploads/2026/05/pexels-photo-34406344.jpeg" 
//           alt="Cargo Ship Background" 
//           className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
//         />
//         <div className="absolute inset-0 bg-gradient-to-r from-[#110713]/90 via-[#110713]/85 to-[#110713]/90 backdrop-blur-[1px]"></div>
//       </div>

//       <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
//         <div className="absolute -top-20 -right-20 w-96 h-96 bg-[#1F2288]/20 rounded-full blur-3xl"></div>
//         <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-[#1F2288]/20 rounded-full blur-3xl"></div>
//       </div>

//       <div className="max-w-[1240px] mx-auto px-5 relative z-10 text-center">
//         <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-8 border border-white/20">
//           <Ship className="w-4 h-4 text-white" />
//           <span className="text-sm font-medium text-white/90 tracking-wide">Global Logistics Partner</span>
//         </div>

//         <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
//           Experience Fast and Reliable
//           <span className="block text-white mt-2">
//             Shipping Today
//           </span>
//         </h2>

//         <p className="text-base md:text-lg lg:text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
//           Get in touch with us to find out how we can simplify your shipping needs 
//           and provide you with an accurate quote.
//         </p>

//         <div className="flex flex-wrap justify-center items-center gap-4">
//           <Link href="#quote">
//             <Button className="bg-white hover:bg-gray-200 text-[#110713] px-8 md:px-12 h-14 md:h-16 rounded-xl font-bold uppercase tracking-wider text-sm md:text-base shadow-lg transition-all duration-300 hover:-translate-y-1">
//               Get A Quote
//             </Button>
//           </Link>
//           <Link href="tel:+971523979396">
//             <Button className="bg-[#1F2288] hover:bg-[#161966] border border-white/20 text-white px-8 md:px-12 h-14 md:h-16 rounded-xl font-bold uppercase tracking-wider text-sm md:text-base shadow-lg transition-all duration-300 hover:-translate-y-1">
//               Call Us
//             </Button>
//           </Link>
//           <Link href="https://wa.me/971523979396" target="_blank">
//             <Button className="bg-[#25D366] hover:bg-[#128C7E] text-white px-8 md:px-12 h-14 md:h-16 rounded-xl font-bold uppercase tracking-wider text-sm md:text-base shadow-lg transition-all duration-300 hover:-translate-y-1 flex items-center gap-2">
//               WhatsApp
//             </Button>
//           </Link>
//         </div>

//         <div className="flex flex-wrap justify-center gap-6 md:gap-10 mt-12 pt-8 border-t border-white/10">
//           <div className="flex items-center gap-2 text-white/60 text-sm">
//             <Package className="w-4 h-4 text-white" />
//             <span>100% Secure Delivery</span>
//           </div>
//           <div className="flex items-center gap-2 text-white/60 text-sm">
//             <Clock className="w-4 h-4 text-white" />
//             <span>24/7 Customer Support</span>
//           </div>
//           <div className="flex items-center gap-2 text-white/60 text-sm">
//             <Ship className="w-4 h-4 text-white" />
//             <span>Global Coverage</span>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }
