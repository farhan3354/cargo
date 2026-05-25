"use client"
import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function About() {
  return (
    <section className="py-4 md:py-8 bg-white">
      <div className="max-w-[1240px] mx-auto px-5">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-5 rounded-[2rem] overflow-hidden h-[576px]">
            <img src="/aboutsectionhome.png" alt="Logistics Experience" className="w-full h-full object-cover" />
          </div>
          <div className="lg:col-span-7 space-y-10">
            <h2 className="text-4xl lg:text-5xl font-heading font-normal text-[#110713]">Learn More About Manar Cargo</h2>
            <p className="text-lg text-[#66556B] leading-relaxed">
              Manar Cargo is dedicated to providing innovative shipping solutions tailored to meet the diverse needs of our customers across the globe.
            </p>
            <Link href="/about">
              <Button variant="outline" className="h-14 px-10 border-[#1F2288] text-[#1F2288] hover:bg-[#1F2288] hover:text-white font-bold rounded-md uppercase tracking-widest text-sm">
                Read More
              </Button>
            </Link>
            <div className="w-20 h-[3px] bg-[#1F2288] rounded-full mt-6"></div>
            <div className="flex mt-6 items-center gap-6 pt-12 border-t border-[#E5E7EB]">
<img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Ali Khan" className="w-16 h-16 rounded-full" />              <div>
                <h4 className="text-xl font-bold text-[#110713]">Abdimailk Abdisalam Osman</h4>
                <p className="text-[#1F2288] text-sm uppercase font-bold tracking-widest">Founder</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


