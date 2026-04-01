'use client'

import React from 'react'
import { useOnboardingStore } from '@/store/onboardingStore'
import { Button } from '@/components/ui/button'
import { ArrowRight, CheckCircle2, Copy, ExternalLink, Package, ShoppingCart, Wallet } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Step4Complete() {
  const { data } = useOnboardingStore()
  
  const storeUrl = `app.jesstore.vercel.app/store/${data.storeSlug}`

  return (
    <div className="glass-card rounded-2xl p-8 sm:p-12 border border-white/8 shadow-2xl relative overflow-hidden">
      {/* Confetti Effect (Simulated via random dots) */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              opacity: 1, 
              y: 0, 
              x: 0,
              scale: Math.random() * 0.5 + 0.5
            }}
            animate={{ 
              opacity: 0, 
              y: (Math.random() - 0.5) * 400, 
              x: (Math.random() - 0.5) * 400,
              rotate: Math.random() * 360
            }}
            transition={{ duration: 2, delay: 0.1, ease: "easeOut" }}
            className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full"
            style={{ 
              backgroundColor: ['hsl(var(--primary))', 'hsl(var(--secondary))', '#f9c22e'][i % 3] 
            }}
          />
        ))}
      </div>

      <div className="flex flex-col items-center text-center">
        <div className="relative mb-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
                type: "spring", 
                stiffness: 260, 
                damping: 20,
                delay: 0.2 
            }}
            className="w-24 h-24 bg-primary rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(34,197,94,0.4)]"
          >
            <CheckCircle2 className="w-12 h-12 text-white" />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute -top-2 -right-2 text-3xl"
          >
            🎉
          </motion.div>
        </div>

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-4 mb-10"
        >
            <h2 className="font-['Outfit'] font-bold text-4xl sm:text-5xl text-white tracking-tight leading-tight">
                You&apos;re all set!
            </h2>
            <p className="text-gray-400 text-lg sm:text-xl font-['Plus_Jakarta_Sans'] max-w-md">
                Your store is live and ready for business. Start selling on-chain now.
            </p>
        </motion.div>

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="w-full space-y-8"
        >
            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Your store link</p>
                <div className="flex items-center justify-between bg-black/40 border border-white/5 rounded-xl px-5 py-4">
                    <span className="font-mono text-primary text-sm sm:text-base font-bold truncate mr-4">
                        {storeUrl}
                    </span>
                    <div className="flex gap-2 shrink-0">
                        <button className="p-2 hover:bg-white/5 rounded-lg border border-white/5 transition-colors">
                            <Copy className="w-4 h-4 text-gray-400 hover:text-white" />
                        </button>
                        <button className="p-2 hover:bg-white/5 rounded-lg border border-white/5 transition-colors">
                            <ExternalLink className="w-4 h-4 text-gray-400 hover:text-white" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <FeatureBadge icon={<Package className="w-4 h-4" />} label="Inventory Ready" delay={1} />
                <FeatureBadge icon={<ShoppingCart className="w-4 h-4" />} label="POS Active" delay={1.1} />
                <FeatureBadge icon={<Wallet className="w-4 h-4" />} label="Crypto Ready" delay={1.2} />
            </div>

            <Link href="/dashboard" className="block">
                <Button 
                    className="w-full h-16 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold text-lg shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98] group"
                >
                    <span>Go to My Dashboard</span>
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
            </Link>

            <p className="text-gray-500 text-xs text-center font-medium">
                Share your link anywhere to start getting paid directly to your wallet.
            </p>
        </motion.div>
      </div>
    </div>
  )
}

function FeatureBadge({ icon, label, delay }: { icon: React.ReactNode, label: string, delay: number }) {
    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay }}
            className="flex items-center gap-2 bg-white/5 border border-white/5 px-4 py-3 rounded-xl justify-center"
        >
            <span className="text-primary">{icon}</span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">{label}</span>
        </motion.div>
    )
}
