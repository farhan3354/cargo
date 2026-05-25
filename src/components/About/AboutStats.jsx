import React from 'react'

export default function AboutStats() {
  const stats = [
    ['5000+', 'Shipments Delivered'],
    ['20+', 'Countries Served'],
    ['24/7', 'Customer Support'],
    ['99%', 'On-Time Delivery'],
  ]

  return (
    <section className="py-20 bg-[#1F2288] text-white">
      <div className="max-w-[1240px] mx-auto px-5 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map(([num, label], i) => (
          <div key={i}>
            <h3 className="text-4xl font-bold mb-2">
              {num}
            </h3>
            <p className="text-white/70">
              {label}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}