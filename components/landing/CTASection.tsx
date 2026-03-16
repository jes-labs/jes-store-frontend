'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Rocket } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { fadeIn, scaleIn } from '@/lib/constants/animation'

/**
 * CTASection
 * The final conversion point at the bottom of the landing page
 */
export default function CTASection() {
  return (
    <section className="relative py-24 lg:py-48 overflow-hidden bg-[#050505]">
      {/* Dynamic Background */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl aspect-video bg-gradient-to-tr from-primary/10 via-secondary/10 to-transparent blur-[120px] pointer-events-none opacity-50" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={scaleIn}
          className="max-w-4xl mx-auto space-y-12"
        >
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white text-[10px] font-bold uppercase tracking-[0.2em]">
               <Rocket className="w-3 h-3 text-primary animate-bounce" />
               Join the revolution
            </div>
            <h2 className="text-5xl sm:text-7xl lg:text-8xl font-heading font-bold text-white tracking-tighter leading-none">
              Ready to grow <br />
              <span className="gradient-text">your legacy?</span>
            </h2>
            <p className="text-xl text-muted-foreground font-body max-w-2xl mx-auto leading-relaxed">
              Start accepting stablecoin payments and managing your store with tools designed for the next billion users.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
             <Link href="/register" className="w-full sm:w-auto">
                <Button size="lg" className="h-14 px-12 rounded-full bg-primary hover:bg-primary/90 text-black font-bold text-lg group transition-all hover:scale-105 glow-green w-full">
                   Get Started Now
                   <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
             </Link>
             <Link href="/contact" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="h-14 px-10 rounded-full border-white/10 hover:bg-white/5 text-white text-lg w-full">
                   Talk to Sales
                </Button>
             </Link>
          </div>

          <div className="flex items-center justify-center gap-8 pt-8 opacity-40 grayscale group-hover:grayscale-0 transition-all duration-500">
             <div className="flex flex-col items-center">
                <Sparkles className="w-6 h-6 text-primary mb-2" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-white">Non-Custodial</span>
             </div>
             <div className="w-px h-8 bg-white/10" />
             <div className="flex flex-col items-center">
                <Rocket className="w-6 h-6 text-secondary mb-2" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-white">Instant Settlement</span>
             </div>
             <div className="w-px h-8 bg-white/10" />
             <div className="flex flex-col items-center">
                <ArrowRight className="w-6 h-6 text-orange-400 mb-2" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-white">Verified On-Chain</span>
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
