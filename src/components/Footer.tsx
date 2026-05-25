"use client"
import React from 'react'
import Link from 'next/link'
import { Phone, Mail, MapPin } from 'lucide-react'

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Contact', href: '/contact' },
]

const services = [
  'Domestic Cargo',
  'International Cargo',
  'Air Freight',
  'Sea Freight',
]

export default function Footer() {
  return (
    <footer className="bg-[#0f172a] text-white pt-8 pb-4">
      <div className="max-w-[1240px] mx-auto px-5">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          <div>
            <Link href="/" className="inline-flex items-center gap-3 mb-5">
              <img
                src="/finallogo.jpeg"
                alt="Manar Cargo Logo"
                className="h-12 w-auto"
              />
              <div>
                <h3 className="text-lg font-bold">
                  MANAR ALKHAIR
                </h3>
                <p className="text-[10px] tracking-[4px] text-blue-300 uppercase">
                  Cargo L.L.C
                </p>
              </div>
            </Link>

            <p className="text-white/70 leading-relaxed text-sm">
              Trusted cargo and logistics solutions delivering
              your shipments safely and efficiently worldwide.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-5">
              Quick Links
            </h4>

            <ul className="space-y-3">
              {navItems.map((item, i) => (
                <li key={i}>
                  <Link
                    href={item.href}
                    className="text-white/70 hover:text-white transition"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-5">
              Our Services
            </h4>

            <ul className="space-y-3 text-white/70">
              {services.map((service, i) => (
                <li key={i}>{service}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-5">
              Contact Us
            </h4>

            <div className="space-y-4 text-white/70 text-sm">
              <div className="flex gap-3">
                <Phone className="w-4 h-4 mt-1 text-blue-300" />
                <span>+971 52 397 9396</span>
              </div>

              <div className="flex gap-3">
                <Mail className="w-4 h-4 mt-1 text-blue-300" />
                <span>info@manarcargo.com</span>
              </div>

              <div className="flex gap-3">
                <MapPin className="w-4 h-4 mt-1 text-blue-300" />
                <span>Dubai, United Arab Emirates</span>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-6 text-center text-sm text-white/50">
          © 2026 MANAR ALKHAIR CARGO L.L.C. Powered by BIS TECHNOLOGY. All rights reserved.
        </div>
      </div>
    </footer>
  )
}