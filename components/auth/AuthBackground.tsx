'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ChipProps {
  text: string
  className?: string
  delay?: number
}

const FloatingChip = ({ text, className, delay = 0 }: ChipProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ 
      opacity: [0.15, 0.25, 0.15],
      y: [0, -15, 0],
      x: [0, 10, 0]
    }}
    transition={{ 
      opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" },
      y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay },
      x: { duration: 8, repeat: Infinity, ease: "easeInOut", delay: delay * 0.5 }
    }}
    className={cn(
      "glass-card rounded-full px-3 py-1.5 text-[10px] sm:text-xs text-gray-500 font-mono select-none pointer-events-none whitespace-nowrap",
      className
    )}
  >
    {text}
  </motion.div>
)

export default function AuthBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Layer 1 — Grid */}
      <div className="absolute inset-0 grid-pattern opacity-[0.4]" />

      {/* Layer 2 — Animated gradient blobs */}
      <motion.div
        className="absolute -top-[10%] -right-[10%] w-[40vw] h-[40vw] bg-primary/10 rounded-full blur-[100px] sm:blur-[120px]"
        animate={{ 
          x: [0, 50, 0], 
          y: [0, -30, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          duration: 20, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />
      
      <motion.div
        className="absolute -bottom-[10%] -left-[10%] w-[35vw] h-[35vw] bg-secondary/8 rounded-full blur-[80px] sm:blur-[100px]"
        animate={{ 
          x: [0, -40, 0], 
          y: [0, 40, 0],
          scale: [1, 1.05, 1]
        }}
        transition={{ 
          duration: 25, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 5
        }}
      />

      {/* Layer 3 — Floating activity chips */}
      <div className="absolute inset-0 hidden sm:block">
        <FloatingChip 
          text="$ 45.00 · ✓ Paid" 
          className="absolute top-[15%] left-[10%]" 
          delay={0}
        />
        <FloatingChip 
          text="RCP-00089 · Issued" 
          className="absolute top-[20%] right-[15%]" 
          delay={2}
        />
        <FloatingChip 
          text="Inventory: 143 items" 
          className="absolute bottom-[25%] right-[12%]" 
          delay={1}
        />
        <FloatingChip 
          text="New order · Fatima B." 
          className="absolute bottom-[20%] left-[18%]" 
          delay={3}
        />
        <FloatingChip 
          text="USDC · Polygon" 
          className="absolute top-[45%] right-[8%]" 
          delay={4}
        />
      </div>

      {/* Subtle overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background/50" />
    </div>
  )
}
