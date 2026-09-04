'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Phone, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

const navItems = [
  { id: 'home', label: 'Home', href: '/' },
  { id: 'about', label: 'About', href: '/about' },
  { id: 'services', label: 'Services', href: '/services' },
  { id: 'Faqs', label: 'Faqs', href: '/faq' },
  { id: 'contact', label: 'Contact', href: '/contact' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  // Set mounted state after component mounts
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Close mobile menu when window resizes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && mobileMenuOpen) {
        setMobileMenuOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [mobileMenuOpen])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [mobileMenuOpen])

  return (
    <nav className="fixed w-full z-50 transition-all duration-300 bg-white py-3 shadow-md">
      <div className="max-w-[1240px] mx-auto px-5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="flex items-center gap-3">
              <img
                src="/finallogo.jpeg"
                alt="Manar Cargo Logo"
                className="h-12 w-auto transition-transform group-hover:scale-105"
                loading="eager"
                fetchPriority="high"
              />
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-6 ml-auto mr-6">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="text-[13px] font-semibold text-[#110713] hover:text-[#1F2288] transition-colors uppercase tracking-wider"
              >
                {item.label}
              </Link>
            ))}
            
            {/* Vertical Phone Numbers - Clickable */}
            <div className="flex flex-col gap-0.5 text-[#1F2288] font-medium border-l-2 border-[#E5E7EB] pl-4">
              <a 
                href="tel:+971588627018" 
                className="flex items-center gap-1.5 hover:text-[#25D366] transition-colors"
              >
                <Phone className="w-3 h-3" />
                <span className="text-[11px]">+971 58 8627018</span>
              </a>
              <a 
                href="tel:+971528652516" 
                className="flex items-center gap-1.5 hover:text-[#25D366] transition-colors"
              >
                <Phone className="w-3 h-3" />
                <span className="text-[11px]">+971 52 8652516</span>
              </a>
              <a 
                href="tel:+971586647298" 
                className="flex items-center gap-1.5 hover:text-[#25D366] transition-colors"
              >
                <Phone className="w-3 h-3" />
                <span className="text-[11px]">+971 58 6647298</span>
              </a>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <Link href="https://wa.me/971588627018" target="_blank">
              <Button className="bg-[#25D366] hover:bg-[#128C7E] text-white px-3.5 h-9 rounded-lg font-bold capitalize text-[12px] shadow-sm flex items-center gap-1.5">
                <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
              </Button>
            </Link>
          </div>

          <button
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 text-[#110713]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMounted && mobileMenuOpen && (
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
          
          <div className="flex flex-col gap-2 px-6 py-4 border-t border-b border-[#E5E7EB]">
            <a 
              href="tel:+971588627018" 
              className="flex items-center gap-2 text-[#1F2288] font-bold text-sm hover:text-[#25D366] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Phone className="w-4 h-4" />
              <span>+971 58 8627018</span>
            </a>
            <a 
              href="tel:+971528652516" 
              className="flex items-center gap-2 text-[#1F2288] font-bold text-sm hover:text-[#25D366] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Phone className="w-4 h-4" />
              <span>+971 52 8652516</span>
            </a>
            <a 
              href="tel:+971586647298" 
              className="flex items-center gap-2 text-[#1F2288] font-bold text-sm hover:text-[#25D366] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Phone className="w-4 h-4" />
              <span>+971 58 6647298</span>
            </a>
          </div>

          <Link
            href="https://wa.me/971588627018" 
            target="_blank"
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
