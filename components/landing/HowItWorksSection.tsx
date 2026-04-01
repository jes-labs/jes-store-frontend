'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { ArrowRight, Package, Check, Copy, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

/**
 * HowItWorksSection
 * 3-step vertical flow with animated mockups
 */
export default function HowItWorksSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  })

  return (
    <section ref={containerRef} className="relative py-24 lg:py-32 bg-[#050505] overflow-hidden">
      {/* Central SVG Line (Desktop) */}
      <div className="absolute left-1/2 -translate-x-1/2 top-48 bottom-48 w-px hidden lg:block">
        <svg className="w-full h-full" preserveAspectRatio="none">
          <motion.path
            d="M 0 0 L 0 5000"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="1.5"
            strokeDasharray="6 6"
            style={{ pathLength: scrollYProgress }}
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-24">
          <span className="text-primary text-[10px] font-bold uppercase tracking-widest border border-primary/20 bg-primary/5 px-4 py-1.5 rounded-full mb-6 inline-block">
            Simple Setup
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-white mb-6">
            Up and running in 5 minutes.
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-body">
            No technical knowledge needed. If you can use WhatsApp, you can use JesStore.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-32 lg:space-y-48">
          <Step1 />
          <Step2 />
          <Step3 />
        </div>
      </div>
    </section>
  )
}

function Step1() {
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setIsSuccess(prev => !prev)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="lg:grid lg:grid-cols-2 gap-16 items-center relative">
      <div className="mb-12 lg:mb-0">
        <MockupFrame>
          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-6 space-y-6"
              >
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-wider text-muted-foreground">Store Name</label>
                  <div className="h-10 rounded-lg bg-white/5 border border-primary/40 flex items-center px-3 text-white text-sm">
                    Amara's Fashion
                    <motion.div 
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className="w-[1px] h-4 bg-primary ml-1" 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-wider text-muted-foreground">Settlement Wallet</label>
                  <div className="h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between px-3 text-white font-mono text-xs opacity-50">
                    0x1a2b...9f0e
                    <Copy className="w-3 h-3" />
                  </div>
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl py-6 animate-pulse glow-green">
                  Create My Store →
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.1, opacity: 0 }}
                className="p-8 flex flex-col items-center justify-center text-center space-y-4 h-full"
              >
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-2">
                  <Check className="w-8 h-8 text-primary" />
                </div>
                <h4 className="text-white font-heading font-bold">Store created!</h4>
                <p className="text-xs text-muted-foreground">jesstore.vercel.app/store/amara</p>
                <div className="flex gap-2 w-full pt-4">
                  <Button variant="outline" className="flex-1 text-xs h-9 rounded-lg">Copy Link</Button>
                  <Button variant="outline" className="flex-1 text-xs h-9 rounded-lg"><Share2 className="w-3 h-3 mr-2" /> Share</Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </MockupFrame>
      </div>

      <div className="relative">
        <span className="hidden lg:block absolute -left-20 top-0 text-[8rem] font-heading font-bold text-primary/5 select-none" aria-hidden="true">01</span>
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-sm font-bold text-white mb-6">1</div>
        <h3 className="text-3xl font-heading font-bold text-white mb-4">Create Your Store</h3>
        <p className="text-muted-foreground font-body leading-relaxed max-w-md">
          Sign up, set your store name, connect your wallet, and get your shareable store link in under 2 minutes.
        </p>
      </div>
    </div>
  )
}

function Step2() {
  return (
    <div className="lg:grid lg:grid-cols-2 gap-16 items-center relative">
      <div className="lg:order-2 mb-12 lg:mb-0">
        <MockupFrame>
          <div className="p-6 grid grid-cols-2 gap-4">
            {[1, 2, 3].map((i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="aspect-square rounded-xl bg-white/5 border border-white/10 p-3 flex flex-col justify-end gap-2"
              >
                <div className="w-full h-2 bg-white/10 rounded-full" />
                <div className="w-2/3 h-2 bg-primary/20 rounded-full" />
              </motion.div>
            ))}
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="aspect-square rounded-xl border-2 border-dashed border-primary/30 flex flex-col items-center justify-center gap-2 text-primary/40"
            >
              <Package className="w-6 h-6" />
              <span className="text-[10px] font-bold uppercase">Add Item</span>
            </motion.div>
          </div>
        </MockupFrame>
      </div>

      <div className="relative lg:text-right flex flex-col lg:items-end">
        <span className="hidden lg:block absolute -right-20 top-0 text-[8rem] font-heading font-bold text-primary/5 select-none" aria-hidden="true">02</span>
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-sm font-bold text-white mb-6">2</div>
        <h3 className="text-3xl font-heading font-bold text-white mb-4">List Your Products</h3>
        <p className="text-muted-foreground font-body leading-relaxed max-w-md">
          Add product photos, set prices in USDT/USDC, manage stock, and organize your inventory by categories.
        </p>
      </div>
    </div>
  )
}

function Step3() {
  return (
    <div className="lg:grid lg:grid-cols-2 gap-16 items-center relative">
      <div className="mb-12 lg:mb-0">
        <MockupFrame className="flex flex-col gap-4 p-4">
          <div className="w-full bg-[#25D366]/10 p-4 rounded-xl border border-[#25D366]/20">
             <div className="text-[10px] text-[#25D366] font-bold uppercase mb-2">WhatsApp share</div>
             <div className="text-xs text-white">"Here's my store link 🛍️ jesstore.vercel.app/store/amara"</div>
          </div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="w-full glass-card p-4 rounded-xl border-primary/30 glow-green"
          >
             <div className="flex justify-between items-start mb-2">
                <Check className="w-5 h-5 text-primary" />
                <span className="text-[10px] font-bold text-primary">✓ PAID</span>
             </div>
             <div className="text-xs text-white font-mono">RCP-20260315-001</div>
             <div className="text-lg font-heading font-bold text-white mt-1">160.00 USDT</div>
          </motion.div>
        </MockupFrame>
      </div>

      <div className="relative">
        <span className="hidden lg:block absolute -left-20 top-0 text-[8rem] font-heading font-bold text-primary/5 select-none" aria-hidden="true">03</span>
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-sm font-bold text-white mb-6">3</div>
        <h3 className="text-3xl font-heading font-bold text-white mb-4">Share & Get Paid</h3>
        <p className="text-muted-foreground font-body leading-relaxed max-w-md">
          Share your link on WhatsApp or Instagram. Customers pay with stablecoins, and funds go directly to your wallet.
        </p>
      </div>
    </div>
  )
}

function MockupFrame({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return (
    <div className="relative mx-auto max-w-[320px] aspect-[9/10] bg-[#0A0A0A] rounded-3xl border border-white/10 shadow-2xl p-3">
      <div className={cn("w-full h-full rounded-2xl bg-[#050505] border border-white/5 overflow-hidden flex flex-col", className)}>
         {children}
      </div>
    </div>
  )
}
