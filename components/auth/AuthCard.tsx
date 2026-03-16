'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { fadeUp } from '@/lib/constants/animation'
import { cn } from '@/lib/utils'

interface AuthCardProps {
  title: string
  subtitle: string
  children: React.ReactNode
  footer?: React.ReactNode
  className?: string
}

export default function AuthCard({
  title,
  subtitle,
  children,
  footer,
  className
}: AuthCardProps) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className={cn(
        "glass-card rounded-2xl p-8 w-full max-w-[620px] relative overflow-hidden",
        "border border-white/10 shadow-[0_32px_64px_rgba(0,0,0,0.4)]",
        "before:absolute before:inset-0 before:bg-gradient-to-tr before:from-primary/5 before:via-transparent before:to-secondary/5 before:pointer-events-none",
        className
      )}
    >
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="mb-8">
        <h1 className="font-['Outfit'] font-bold text-2xl sm:text-3xl text-white tracking-tight">
          {title}
        </h1>
        <p className="font-['Plus_Jakarta_Sans'] text-sm sm:text-base text-gray-400 mt-2 leading-relaxed">
          {subtitle}
        </p>
      </div>

      <div className="space-y-6">
        {children}
      </div>

      {footer && (
        <div className="mt-8 pt-8 border-t border-white/5 text-center text-sm">
          {footer}
        </div>
      )}
    </motion.div>
  )
}
