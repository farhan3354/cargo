"use client"
import React from 'react'
import { Truck, Ship, Globe2, Clock, Package, ShieldCheck } from 'lucide-react'

const serviceList = [
  { icon: Truck, title: 'Land Transport', desc: 'Secure and efficient land transport services across regional borders.' },
  { icon: Ship, title: 'Sea Freight', desc: 'Global sea freight solutions for large volume shipments with cost-effective routing.' },
  { icon: Globe2, title: 'Air Cargo', desc: 'Fastest delivery options for urgent international shipments via our air network.' },
  { icon: Clock, title: 'Express Delivery', desc: 'Door-to-door express services with guaranteed delivery times.' },
  { icon: Package, title: 'Warehousing', desc: 'Modern storage facilities with advanced inventory management systems.' },
  { icon: ShieldCheck, title: 'Customs Clearance', desc: 'Expert handling of all documentation and regulatory requirements for your cargo.' },
]

export default function ServicesGrid() {
  return (
    <section className="py-8 md:py-16 bg-white">
      <div className="max-w-[1240px] mx-auto px-5">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {serviceList.map((service, i) => (
            <div key={i} className="group p-10 bg-[#F9F7FA] rounded-[3rem] border border-[#E5E7EB] hover:border-[#1F2288]/30 hover:shadow-xl transition-all">
              <div className="bg-white w-16 h-16 rounded-2xl flex items-center justify-center text-[#1F2288] mb-8 shadow-sm group-hover:scale-110 transition-transform">
                <service.icon className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-heading font-normal text-[#110713] mb-4">{service.title}</h3>
              <p className="text-[#66556B] leading-relaxed">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


