'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Check, Wallet, Smartphone, ShieldCheck, ArrowRight, Zap } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { fadeIn, scaleIn } from '@/lib/constants/animation'
import { cn } from '@/lib/utils'

const chains = [
  { name: 'Ethereum', dotColor: 'bg-[#627EEA]' },
  { name: 'Polygon', dotColor: 'bg-[#8247E5]' },
  { name: 'Base', dotColor: 'bg-[#0052FF]' },
  { name: 'Arbitrum', dotColor: 'bg-[#28A0F0]' },
  { name: 'BNB Chain', dotColor: 'bg-[#F3BA2F]' },
  { name: 'Optimism', dotColor: 'bg-[#FF0420]' },
]

/**
 * PaymentsSection
 * Showcases the EVM payment flow with animated sequence
 */
export default function PaymentsSection() {
  const [step, setStep] = useState(1)

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev % 6) + 1)
    }, 2000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden bg-[#050505]">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left - Animated Visual */}
          <div className="relative order-2 lg:order-1 flex flex-col items-center">
             <div className="relative w-full max-w-[400px] space-y-4">
                {/* Step 1: Checking out */}
                <StepCard active={step >= 1} index={1}>
                   <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center font-bold text-[10px] text-secondary">FB</div>
                      <div className="text-xs text-white">Fatima Bello <span className="text-muted-foreground">· Checking out...</span></div>
                   </div>
                </StepCard>

                {/* Step 2: Chain Selector */}
                <StepCard active={step >= 2} index={2}>
                   <div className="flex flex-col gap-3">
                      <div className="text-[10px] uppercase text-muted-foreground font-bold">Select Chain</div>
                      <div className="flex flex-wrap gap-2">
                         {chains.map((c) => (
                           <div key={c.name} className={cn(
                             "px-2 py-1 rounded-full text-[8px] font-bold border flex items-center gap-1.5 transition-all",
                             c.name === 'Polygon' 
                                ? "bg-primary border-primary text-black" 
                                : "bg-white/5 border-white/10 text-muted-foreground opacity-50"
                           )}>
                              <div className={cn("w-1.5 h-1.5 rounded-full bg-white", !c.name.includes('Polygon') && c.dotColor)} />
                              {c.name}
                           </div>
                         ))}
                      </div>
                   </div>
                </StepCard>

                {/* Step 3: Token Info */}
                <StepCard active={step >= 3} index={3}>
                   <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-full bg-[#2775CA]/20 flex items-center justify-center">
                            <Zap className="w-4 h-4 text-[#2775CA]" />
                         </div>
                         <div>
                            <div className="text-[10px] font-bold text-white">160.00 USDC</div>
                            <div className="text-[8px] text-muted-foreground">Polygon Mainnet</div>
                         </div>
                      </div>
                      <Button size="sm" className="h-7 px-3 text-[10px] rounded-lg">Confirm</Button>
                   </div>
                </StepCard>

                {/* Step 4: Animation Arc Placeholder */}
                <div className="h-8 relative">
                   {step === 4 && (
                     <motion.div
                       initial={{ x: 0, opacity: 0 }}
                       animate={{ x: [0, 150, 0], opacity: [0, 1, 0] }}
                       transition={{ duration: 1 }}
                       className="absolute left-1/2 w-6 h-6 rounded-full bg-primary flex items-center justify-center z-20"
                     >
                       <Zap className="w-3 h-3 text-white" />
                     </motion.div>
                   )}
                </div>

                {/* Step 5: Confirmed */}
                <StepCard active={step >= 5} index={5} glow={step >= 5}>
                   <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                         <Check className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                         <div className="text-[10px] font-bold text-white">Payment Confirmed ✓</div>
                         <div className="text-[8px] text-primary font-mono">Tx: 0x1a2b...9f0e</div>
                      </div>
                   </div>
                </StepCard>

                {/* Step 6: Receipt */}
                {step >= 6 && (
                  <motion.div
                    variants={scaleIn}
                    initial="hidden"
                    animate="visible"
                    className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-[80%] glass-card p-4 rounded-xl border-primary/30 glow-green z-30"
                  >
                     <div className="flex justify-between items-center mb-1">
                        <span className="text-[8px] font-bold text-muted-foreground">RECEIPT</span>
                        <div className="text-[8px] font-bold text-primary">ISSUED</div>
                     </div>
                     <div className="text-[10px] font-mono text-white">RCP-20260315-00089</div>
                  </motion.div>
                )}
             </div>

             {/* Floating Chain Badges */}
             <FloatingBadge label="Polygon" color="#8247E5" delay={0} className="top-0 -left-12" />
             <FloatingBadge label="Base" color="#0052FF" delay={1} className="top-24 -right-16" />
             <FloatingBadge label="USDC" color="#2775CA" delay={2} className="bottom-12 -left-20" />
          </div>

          {/* Right - Text Content */}
          <div className="order-1 lg:order-2">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="space-y-8"
            >
              <div className="space-y-4">
                <span className="text-primary text-[10px] font-bold uppercase tracking-widest border border-primary/20 bg-primary/5 px-4 py-1.5 rounded-full">
                   Any EVM chain. Any wallet.
                </span>
                <h2 className="text-4xl sm:text-5xl font-heading font-bold text-white leading-tight">
                  Accept stablecoins <br />
                  <span className="gradient-text">without limits.</span>
                </h2>
                <p className="text-lg text-muted-foreground font-body leading-relaxed">
                  Your customers pay with USDC or USDT on Ethereum, Polygon, Base, Arbitrum, BNB Chain, Optimism, or any EVM-compatible network. Funds go directly to your wallet — no middleman, no chargebacks.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  'USDC and USDT on any EVM chain',
                  'Works with MetaMask, WalletConnect, Coinbase Wallet',
                  'Direct wallet-to-wallet settlement',
                  'On-chain payment verification'
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                       <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-sm text-gray-300 font-body">{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-6">
                <Button size="lg" className="rounded-full px-8 h-12 bg-primary hover:bg-primary/90 text-white font-bold group transition-all glow-green">
                  Set Up Stablecoin Payments
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

function StepCard({ children, active, index, glow = false }: { children: React.ReactNode, active: boolean, index: number, glow?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={active ? { opacity: 1, y: 0 } : { opacity: 0.2, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn(
        "glass-card p-4 rounded-xl border-white/5 transition-all duration-500",
        active && "border-white/20",
        glow && "glow-green border-primary/30"
      )}
    >
       {children}
    </motion.div>
  )
}

function FloatingBadge({ label, color, delay, className }: { label: string, color: string, delay: number, className: string }) {
  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 4, repeat: Infinity, delay, ease: "easeInOut" }}
      className={cn(
        "absolute hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full glass-card border-white/10 text-[10px] font-bold text-white whitespace-nowrap z-0",
        className
      )}
    >
       <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
       {label}
    </motion.div>
  )
}
