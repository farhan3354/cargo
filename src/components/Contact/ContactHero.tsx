"use client"
import React from 'react'

export default function ContactHero({ title, subtitle }: { title?: string; subtitle?: string }) {
  return (
    <section className="relative h-[55vh] mt-20 flex justify-center items-center overflow-hidden">
      <img
        src="/homepageimage/services4.jfif"
        alt="About Manar Cargo"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-[#110713]/70"></div>

      <div className="relative z-10 text-left pl-5 md:pl-8 lg:pl-12 max-w-[1240px] w-full">
        <p className="text-white/70 uppercase tracking-[4px] text-sm mb-3">
          Contact Us
        </p>

        <h1 className="text-3xl md:text-5xl font-bold text-white mb-5">
          <span className="block text-[#d8d9ff]">
            {title || "Manar Cargo"}
          </span>
        </h1>

        <p className="text-white/80 max-w-2xl text-lg whitespace-pre-wrap">
          {subtitle || "Get in touch with our team for shipping, logistics, cargo tracking, and support services."}
        </p>
      </div>
    </section>
  )
}