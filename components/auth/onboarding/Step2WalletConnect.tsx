'use client'

import React from 'react'
import { useOnboardingStore } from '@/store/onboardingStore'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, CheckCircle2, Info, Copy, ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'
import { useWallet } from '@/hooks/useWallet'
import WalletConnectButton from '@/components/auth/WalletConnectButton'
import { toast } from 'sonner'

export default function Step2WalletConnect() {
  const { data, updateData, nextStep, prevStep } = useOnboardingStore()
  const { address } = useWallet()

  // Sync connected address into onboarding store
  React.useEffect(() => {
    if (address) updateData({ walletAddress: address })
  }, [address])

  const walletAddress = data.walletAddress || address || ''
  const isValid = /^0x[a-fA-F0-9]{40}$/.test(walletAddress)

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
        {isValid ? (
          <motion.div
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
              <span>{walletAddress.slice(0, 10)}...{walletAddress.slice(-8)}</span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => { navigator.clipboard.writeText(walletAddress); toast.success('Copied') }}
                  className="p-1.5 hover:text-primary transition-colors"
                >
                  <Copy className="w-3 h-3" />
                </button>
                <WalletConnectButton className="h-7! text-xs! px-3 ml-1" />
              </div>
            </div>
          </motion.div>
        ) : (
          <WalletConnectButton />
        )}

        <div className="bg-white/5 rounded-xl p-4 border border-white/5">
          <div className="flex gap-3">
            <Info className="w-5 h-5 text-secondary shrink-0" />
            <div className="space-y-1">
              <p className="text-xs font-bold text-white uppercase tracking-wider">What is a wallet?</p>
              <p className="text-xs text-gray-500 leading-relaxed">
                A digital safe for your stablecoins. Creating one is free.
                Popular options include MetaMask and Coinbase Wallet.
              </p>
              <a href="https://metamask.io" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-[10px] text-secondary hover:underline font-bold uppercase mt-1">
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
            Go Back
          </Button>
          <Button
            onClick={nextStep}
            disabled={!isValid}
            className="flex-2 h-14 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold shadow-lg shadow-primary/20 transition-all group"
          >
            Continue
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </div>
  )
}
