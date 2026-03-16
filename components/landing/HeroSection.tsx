'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { AsciiWave } from './AsciiWave'
import DashboardMockup from './DashboardMockup'
import { heroTextVariants, fadeIn } from '@/lib/constants/animation'
import { siteConfig } from '@/lib/constants/landing'

export default function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden pt-32 pb-20">
      {/* Background Layer 1: Subtle Grid */}
      <div className="absolute inset-0 grid-pattern opacity-40" />

      {/* Background Layer 2: ASCII Wave */}
      <div className="absolute inset-0 opacity-[0.15] pointer-events-none overflow-hidden flex items-center justify-center">
        <AsciiWave className="w-full h-full scale-125 md:scale-100" />
      </div>

      {/* Background Layer 3: Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none opacity-30" />

      <div className="relative z-10 container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Eyebrow */}
        <motion.div
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          variants={fadeIn}
          className="inline-flex items-center gap-2 border border-primary/20 bg-primary/5 px-4 py-1.5 rounded-full mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs font-semibold text-primary uppercase tracking-widest">
            The Future of Commerce is On-Chain
          </span>
        </motion.div>

        {/* Headline */}
        <div className="space-y-6 mb-10">
          <motion.h1
            custom={0}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
            variants={heroTextVariants}
            className="text-4xl sm:text-6xl lg:text-8xl font-heading font-bold leading-[1.1] tracking-tight text-white"
          >
            The smarter way to <br />
            <span className="gradient-text">run your store</span>
          </motion.h1>

          <motion.p
            custom={1}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
            variants={heroTextVariants}
            className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto font-body"
          >
            {siteConfig.description}
          </motion.p>
        </div>

        {/* CTAs */}
        <motion.div
          custom={2}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          variants={heroTextVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
        >
          <Link href="/register" className="w-full sm:w-auto">
            <Button size="lg" className="h-12 px-8 rounded-full bg-primary hover:bg-primary/90 text-white font-semibold group transition-all hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(34,197,94,0.3)] w-full">
              Get Started for Free
              <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link href="#features" className="w-full sm:w-auto">
            <Button size="lg" variant="outline" className="h-12 px-8 rounded-full border-white/10 hover:bg-white/5 text-white w-full">
              Explore Features
            </Button>
          </Link>
        </motion.div>

        {/* Visual Cue - Mockup Preview Area could go here */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-20 relative px-4"
        >
          <div className="relative mx-auto max-w-5xl rounded-3xl border border-white/10 bg-[#0A0A0A]/50 p-2 backdrop-blur-3xl shadow-2xl overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-secondary/5 pointer-events-none" />

            {/* Rich Dashboard Visualization */}
            <div className="relative rounded-2xl overflow-hidden border border-white/5 aspect-auto min-h-[400px] lg:aspect-[16/8]">
              <DashboardMockup />
            </div>

            {/* Premium Overlay Glow */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none opacity-40" />
          </div>

          {/* Dashboard floating elements decoration */}
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-secondary/10 blur-[100px] rounded-full pointer-events-none" />
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-3"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Learn More</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent" />
      </motion.div>
    </section>
  )
}
