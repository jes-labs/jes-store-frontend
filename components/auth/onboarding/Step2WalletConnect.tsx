'use client'

import React from 'react'
import { useOnboardingStore } from '@/store/onboardingStore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowLeft, ArrowRight, Wallet, CheckCircle2, Info, Copy, ExternalLink, Smartphone } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

export default function Step2WalletConnect() {
  const { data, updateData, nextStep, prevStep } = useOnboardingStore()
  const [isConnecting, setIsConnecting] = React.useState(false)
  const [showManual, setShowManual] = React.useState(false)

  const handleConnect = async (walletType: string) => {
    setIsConnecting(true)
    // Simulate connection
    await new Promise(resolve => setTimeout(resolve, 2000))
    updateData({ walletAddress: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F' })
    setIsConnecting(false)
  }

  const isValidAddress = /^0x[a-fA-F0-9]{40}$/.test(data.walletAddress)

  return (
    <div className="glass-card rounded-2xl p-8 sm:p-12 border border-white/8 shadow-2xl">
      <div className="mb-10">
        <div className="text-primary text-[10px] font-bold uppercase tracking-widest mb-2">Step 2 of 4</div>
        <h2 className="font-['Outfit'] font-bold text-3xl sm:text-4xl text-white tracking-tight leading-tight">
          Connect your payment wallet
        </h2>
        <p className="text-gray-400 mt-3 text-lg font-['Plus_Jakarta_Sans']">
          Customers will pay directly to this address. You own it completely — JesStore never holds your funds.
        </p>
      </div>

      <div className="space-y-8">
        <AnimatePresence mode="wait">
          {!data.walletAddress ? (
            <motion.div 
              key="connect-view"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <WalletCard 
                    icon="/metamask.svg" 
                    name="MetaMask" 
                    desc="Popular browser wallet" 
                    onClick={() => handleConnect('metamask')}
                    isLoading={isConnecting}
                />
                <WalletCard 
                    icon="/walletconnect.svg" 
                    name="WalletConnect" 
                    desc="Works with 300+ apps" 
                    onClick={() => handleConnect('walletconnect')}
                    isLoading={isConnecting}
                />
              </div>

              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/5" />
                </div>
                <div className="relative flex justify-center text-[10px] uppercase tracking-widest">
                  <span className="bg-[#121212] px-4 text-gray-600 font-bold">or</span>
                </div>
              </div>

              {!showManual ? (
                <button 
                  onClick={() => setShowManual(true)}
                  className="w-full py-4 text-sm text-gray-500 hover:text-primary transition-colors font-medium border border-dashed border-white/10 rounded-xl"
                >
                  Enter wallet address manually →
                </button>
              ) : (
                <div className="space-y-4 pt-2">
                  <Label htmlFor="walletAddress" className="text-gray-300">Paste your EVM Wallet Address</Label>
                  <Input 
                    id="walletAddress"
                    value={data.walletAddress}
                    onChange={(e) => updateData({ walletAddress: e.target.value })}
                    placeholder="0x..."
                    className="h-14 font-mono bg-white/5 border-white/10 rounded-xl focus:border-primary px-6"
                  />
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div 
              key="success-view"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-primary/5 border border-primary/20 rounded-2xl p-8 flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                <CheckCircle2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Wallet Connected!</h3>
              <p className="text-gray-400 text-sm mb-6 max-w-xs">
                Payments will be settled directly to your address on any EVM chain.
              </p>
              
              <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-lg border border-white/5 font-mono text-xs text-gray-300 w-full justify-between">
                <span>{data.walletAddress.slice(0, 10)}...{data.walletAddress.slice(-8)}</span>
                <div className="flex items-center gap-1">
                    <button className="p-1.5 hover:text-primary transition-colors"><Copy className="w-3 h-3" /></button>
                    <button 
                        onClick={() => updateData({ walletAddress: '' })}
                        className="p-1.5 hover:text-destructive transition-colors text-[10px] font-bold uppercase ml-2"
                    >
                        Change
                    </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="bg-white/5 rounded-xl p-4 border border-white/5">
            <div className="flex gap-3">
                <Info className="w-5 h-5 text-secondary shrink-0" />
                <div className="space-y-1">
                    <p className="text-xs font-bold text-white uppercase tracking-wider">What is a wallet?</p>
                    <p className="text-xs text-gray-500 leading-relaxed">
                        A digital safe for your stablecoins. Creating one is free. 
                        Popular options include MetaMask and Coinbase Wallet.
                    </p>
                    <a href="#" className="inline-flex items-center gap-1 text-[10px] text-secondary hover:underline font-bold uppercase mt-1">
                        Learn more <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                </div>
            </div>
        </div>

        <div className="flex gap-4 pt-4">
          <Button 
            variant="ghost"
            onClick={prevStep}
            className="flex-1 h-14 rounded-xl text-gray-400 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span>Go Back</span>
          </Button>
          <Button 
            onClick={nextStep}
            disabled={!isValidAddress}
            className="flex-[2] h-14 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold shadow-lg shadow-primary/20 transition-all group"
          >
            <span>Continue</span>
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </div>
  )
}

function WalletCard({ icon, name, desc, onClick, isLoading }: { icon: string, name: string, desc: string, onClick: () => void, isLoading: boolean }) {
    return (
        <button 
            onClick={onClick}
            disabled={isLoading}
            className="flex flex-col items-center p-6 bg-white/5 border border-white/10 rounded-2xl transition-all duration-300 hover:border-primary/40 hover:bg-primary/5 hover:-translate-y-1 text-center group"
        >
            <div className="w-12 h-12 mb-4 flex items-center justify-center">
                {isLoading ? (
                    <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                ) : (
                    <div className="w-full h-full rounded-xl bg-white/5 flex items-center justify-center p-2 group-hover:scale-110 transition-transform">
                        {/* Placeholder for real icons */}
                        <Smartphone className="w-6 h-6 text-gray-400 group-hover:text-primary" />
                    </div>
                )}
            </div>
            <p className="font-bold text-white text-sm mb-1">{name}</p>
            <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">{desc}</p>
        </button>
    )
}
