'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/about', label: 'About' },
  { href: '/features', label: 'Features' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/contact', label: 'Contact' },
]

export default function PublicNav() {
  const [isOpen, setIsOpen] = useState(false)

  // Block scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-24 flex items-center pointer-events-none">
      <nav className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 pointer-events-auto">
        <div className="flex h-14 items-center justify-between bg-[#050505]/60 backdrop-blur-xl border border-white/10 rounded-full px-4 sm:px-8 shadow-2xl">
          {/* Left - Logo */}
          <Link
            href="/"
            className="flex items-center group transition-transform duration-150 hover:scale-[1.02]"
          >
            <div className="flex items-center font-heading font-bold text-lg tracking-tight">
              <span className="text-primary">Jes</span>
              <span className="text-white">Store</span>
            </div>
          </Link>

          {/* Center - Links (Desktop) */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-white transition-colors py-1"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right - CTAs (Desktop) */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/login" className="w-full" onClick={() => setIsOpen(false)}>
              <Button variant="ghost" className="w-full text-muted-foreground py-4 rounded-xl">
                Log In
              </Button>
            </Link>
            <Link href="/register" className="w-full" onClick={() => setIsOpen(false)}>
              <Button className="w-full bg-primary hover:bg-primary/90 text-black font-bold py-4 rounded-xl glow-green">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-muted-foreground hover:text-white transition-colors relative z-[60]"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu Drawer */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="lg:hidden absolute top-20 left-4 right-4 bg-[#0A0A0A] border border-white/10 rounded-3xl overflow-hidden shadow-2xl z-50 p-6 flex flex-col gap-4"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-3 text-base font-medium text-muted-foreground hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="h-px bg-white/5 my-2" />
              <div className="flex flex-col gap-3">
                <Link href="/login" className="w-full" onClick={() => setIsOpen(false)}>
                  <Button variant="ghost" className="w-full text-muted-foreground py-6 rounded-xl">
                    Log In
                  </Button>
                </Link>
                <Link href="/register" className="w-full" onClick={() => setIsOpen(false)}>
                  <Button className="w-full bg-primary hover:bg-primary/90 text-black font-bold py-6 rounded-xl glow-green">
                    Get Started
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}
