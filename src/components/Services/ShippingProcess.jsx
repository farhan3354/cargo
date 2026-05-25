"use client"
import React from 'react'

const steps = [
  'Request a Quote',
  'Schedule Pickup',
  'Track Shipment',
  'Safe Delivery',
]

export default function ShippingProcess() {
  return (
    <section className="py-10 bg-[#f8fafc]">
      <div className="max-w-[1240px] mx-auto px-5">
        <h2 className="text-4xl font-bold text-[#110713] mb-12">
          How It Works
        </h2>

        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-3xl text-center shadow-sm"
            >
              <div className="text-4xl font-bold text-[#1F2288] mb-4">
                0{i + 1}
              </div>

              <h3 className="font-semibold text-lg">
                {step}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}