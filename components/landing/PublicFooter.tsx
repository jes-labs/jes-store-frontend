'use client'

import Link from 'next/link'
import { Mail, Linkedin, Twitter, Github, MapPin, Phone } from 'lucide-react'
import { siteConfig } from '@/lib/constants/landing'

const footerLinks = {
  product: [
    { label: 'Features', href: '/features' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'How It Works', href: '/#how-it-works' },
    { label: 'Merchant Demo', href: '/#demo' },
  ],
  resources: [
    { label: 'FAQ', href: '#faq' },
    { label: 'Documentation', href: '#' },
    { label: 'Support', href: '/contact' },
    { label: 'API Reference', href: '#' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'Careers', href: '#' },
    { label: 'Press Kit', href: '#' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Cookie Policy', href: '#' },
  ],
}

export default function PublicFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-[#050505] border-t border-white/5 pt-20 pb-10 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary/5 rounded-full blur-[100px]" />
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-secondary/5 rounded-full blur-[100px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          {/* Brand & Mission */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center group">
              <div className="flex items-center font-heading font-bold text-2xl tracking-tight">
                <span className="text-primary">Jes</span>
                <span className="text-white">Store</span>
              </div>
            </Link>
            <p className="max-w-xs text-muted-foreground leading-relaxed text-sm">
              {siteConfig.description} Empowering 1,200+ merchants across the continent.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-300">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-300">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-300">
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links Grid */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-6">Product</h4>
            <ul className="space-y-4">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-white mb-6">Resources</h4>
            <ul className="space-y-4">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-white mb-6">Company</h4>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-muted-foreground text-xs tabular-nums">
            © {currentYear} {siteConfig.name}. Designed & Built for the frontier.
          </p>
          <div className="flex items-center gap-6">
            {footerLinks.legal.map((link) => (
              <Link key={link.label} href={link.href} className="text-muted-foreground hover:text-white transition-colors text-xs">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
