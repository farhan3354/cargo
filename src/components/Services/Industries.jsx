"use client"
import React from 'react'

export default function Industries() {
  return (
    <section className="py-10 bg-white">
      <div className="max-w-[1240px] mx-auto px-5">
        <h2 className="text-4xl font-bold mb-10 text-[#110713]">
          Industries We Serve
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            'Retail & E-commerce',
            'Manufacturing',
            'Medical Supplies',
            'Automotive',
            'Electronics',
            'Personal Cargo',
          ].map((item, i) => (
            <div
              key={i}
              className="bg-[#f8fafc] rounded-2xl p-6"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}