'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Phone, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

const navItems = [
  { id: 'home', label: 'Home', href: '/' },
  { id: 'about', label: 'About', href: '/about' },
  { id: 'services', label: 'Services', href: '/services' },
  { id: 'Faqs', label: 'Faqs', href: '/faq' },
  {id: 'contact', label: 'Contact', href: '/contact'},
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="fixed w-full z-50 transition-all duration-300 bg-white py-4 shadow-md">
      <div className="max-w-[1240px] mx-auto px-5">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <img src="/finallogo.jpeg" alt="Manar Cargo Logo" className="h-10 w-auto transition-transform group-hover:scale-105" />
            <div className="flex flex-col">
              {/* <span className="text-xl font-bold tracking-tight leading-none text-[#1F2288]">MANAR ALKHAIR</span> */}
              {/* <span className="text-[9px] font-bold text-[#1F2288] tracking-[0.4em] mt-0.5 uppercase">Cargo L.L.C</span> */}
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-8 ml-auto mr-8">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="text-[14px] font-semibold text-[#110713] hover:text-[#1F2288] transition-colors uppercase tracking-wider"
              >
                {item.label}
              </Link>
            ))}
            
            <div className="flex items-center gap-2 text-[#1F2288] font-bold border-l-2 border-[#E5E7EB] pl-8">
              <Phone className="w-5 h-5" />
              <span>+971 52 397 9396</span>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <Link href="https://wa.me/971523979396" target="_blank">
              <Button className="bg-[#25D366] hover:bg-[#128C7E] text-white px-4 h-11 rounded-xl font-bold capitalize text-[14px] shadow-sm flex items-center gap-2">
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </Button>
            </Link>
          
          </div>

          <button
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 text-[#110713]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 p-6 space-y-3 shadow-xl animate-in slide-in-from-top duration-300">
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="block w-full text-left px-6 py-4 rounded-xl font-semibold transition-colors hover:bg-gray-50 text-[#110713]"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className="flex items-center gap-2 px-6 py-4 text-[#1F2288] font-bold">
            <Phone className="w-5 h-5" />
            <span>+971 52 397 9396</span>
          </div>
          <Link
            href="https://wa.me/971523979396" target="_blank"
            className="block w-full text-center px-6 py-4 mt-2 rounded-xl bg-[#25D366] text-white font-bold capitalize text-[15px] flex items-center justify-center gap-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            <MessageCircle className="w-5 h-5" /> WhatsApp
          </Link>
        </div>
      )}
    </nav>
  )
}


