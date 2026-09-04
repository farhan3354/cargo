import React from 'react'

export default function AboutStats({ data }) {
  const stats = [
    [data?.stat1Value || '5000+', data?.stat1Label || 'Shipments Delivered'],
    [data?.stat2Value || '20+', data?.stat2Label || 'Countries Served'],
    [data?.stat3Value || '24/7', data?.stat3Label || 'Customer Support'],
    [data?.stat4Value || '99%', data?.stat4Label || 'On-Time Delivery'],
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