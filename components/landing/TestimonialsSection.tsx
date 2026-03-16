'use client'

import { motion } from 'framer-motion'
import { testimonials } from '@/lib/constants/landing'
import { cn } from '@/lib/utils'

/**
 * TestimonialsSection
 * Uses a dual-row marquee effect for high-density social proof
 */
export default function TestimonialsSection() {
  const firstRow = testimonials.slice(0, testimonials.length / 2)
  const secondRow = testimonials.slice(testimonials.length / 2)

  return (
    <section id="testimonials" className="relative py-24 lg:py-32 bg-[#0A0A0A] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
        <h2 className="text-4xl sm:text-5xl font-heading font-bold text-white mb-6">
          Loved by builders, <br />
          <span className="text-primary">trusted by merchants.</span>
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-body">
          Hear from the people running jewelry shops, fashion boutiques, and tech stalls using JesStore.
        </p>
      </div>

      <div className="relative flex flex-col gap-8 w-full">
        {/* Row 1: Leftward */}
        <Marquee direction="left">
          {firstRow.map((t, i) => (
            <TestimonialCard key={i} {...t} />
          ))}
        </Marquee>

        {/* Row 2: Rightward */}
        <Marquee direction="right">
          {secondRow.map((t, i) => (
            <TestimonialCard key={i} {...t} />
          ))}
        </Marquee>

        {/* Gradient Fades for screen edges */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0A0A0A] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0A0A0A] to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  )
}

function Marquee({ children, direction = 'left' }: { children: React.ReactNode, direction?: 'left' | 'right' }) {
  return (
    <div className="flex overflow-hidden group select-none">
      <motion.div
        animate={{
          x: direction === 'left' ? [0, -1000] : [-1000, 0]
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
        className="flex shrink-0 items-center justify-around gap-8 min-w-full"
      >
        {children}
        {children} {/* Duplicate for seamless loop */}
      </motion.div>
    </div>
  )
}

function TestimonialCard({ name, business, quote }: any) {
  return (
    <div className="glass-card w-[350px] p-6 rounded-2xl flex flex-col gap-4 border-white/5 hover:border-white/20 transition-all duration-300 cursor-default">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center text-primary font-bold">
           {name.charAt(0)}
        </div>
        <div>
           <div className="text-sm font-bold text-white">{name}</div>
           <div className="text-[10px] text-muted-foreground font-body">{business}</div>
        </div>
      </div>
      <p className="text-sm text-gray-300 leading-relaxed font-body">
        &ldquo;{quote}&rdquo;
      </p>
    </div>
  )
}
