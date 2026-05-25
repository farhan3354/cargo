"use client"
import React from 'react'

const stats = [
  { label: 'Years Of Experience', value: '20+' },
  { label: 'Happy Customers', value: '350+' },
  { label: 'Customer Satisfaction', value: '98%' },
]

export default function Stats() {
  return (
    <section className="py-6 md:py-8 bg-[#f5edf9] border-y border-[#E5E7EB]">
      <div className="max-w-[1240px] mx-auto px-5 text-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-6">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-5xl font-heading font-normal mb-1">{stat.value}</div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#1F2288]">{stat.label}</p>
            </div>
          ))}
        </div>
        <p className="text-lg font-medium text-[#66556B]">
          Discover our journey and commitment to excellence.
        </p>
      </div>
    </section>
  )
}

