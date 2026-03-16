'use client'

import { motion } from 'framer-motion'
import { fadeIn, fadeUp } from '@/lib/constants/animation'

interface PublicPageHeaderProps {
  eyebrow: string
  title: string
  description: string
  gradient?: boolean
}

export default function PublicPageHeader({ eyebrow, title, description, gradient = true }: PublicPageHeaderProps) {
  return (
    <section className="relative pt-32 pb-16 lg:pt-48 lg:pb-24 overflow-hidden border-b border-white/5">
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/5 rounded-full blur-[120px] pointer-events-none opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.span
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="inline-block text-primary text-[10px] font-bold uppercase tracking-[0.2em] border border-primary/20 bg-primary/5 px-4 py-1.5 rounded-full mb-6"
        >
          {eyebrow}
        </motion.span>
        
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-4xl sm:text-6xl lg:text-7xl font-heading font-bold text-white mb-8 tracking-tighter"
        >
          {gradient ? (
            <span 
              className="gradient-text" 
              dangerouslySetInnerHTML={{ __html: title }} 
            />
          ) : (
            <span dangerouslySetInnerHTML={{ __html: title }} />
          )}
        </motion.h1>

        <motion.p
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ delay: 0.1 }}
          className="text-lg lg:text-xl text-muted-foreground font-body max-w-2xl mx-auto leading-relaxed"
        >
          {description}
        </motion.p>
      </div>
    </section>
  )
}
