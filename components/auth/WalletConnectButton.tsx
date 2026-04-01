'use client'

import { Wallet, CheckCircle2, Copy, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useWallet } from '@/hooks/useWallet'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

interface WalletConnectButtonProps {
  className?: string
  /** Called whenever the connected address changes (connect or disconnect) */
  onAddressChange?: (address: string | undefined) => void
}

export default function WalletConnectButton({ className, onAddressChange }: WalletConnectButtonProps) {
  const { address, isConnected, connect, disconnect } = useWallet()

  // Notify parent of address changes
  const handleConnect = () => {
    connect()
  }

  const handleCopy = () => {
    if (address) {
      navigator.clipboard.writeText(address)
      toast.success('Address copied')
    }
  }

  if (isConnected && address) {
    return (
      <div className={cn('space-y-2', className)}>
        <div className="flex items-center gap-3 h-14 px-4 rounded-xl bg-primary/5 border border-primary/20 w-full">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-4 h-4 text-primary" />
          </div>
          <span className="font-mono text-sm text-white flex-1 truncate">
            {address.slice(0, 8)}…{address.slice(-6)}
          </span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={handleCopy}
              className="p-1.5 text-white/40 hover:text-white transition-colors"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={disconnect}
              className="p-1.5 text-white/40 hover:text-white transition-colors"
            >
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
        <p className="text-[10px] text-primary/60 uppercase tracking-widest font-bold px-1">
          Wallet connected — address will be used automatically
        </p>
      </div>
    )
  }

  return (
    <Button
      type="button"
      onClick={handleConnect}
      className={cn(
        'h-14 w-full rounded-xl bg-white/5 border border-white/10 text-white font-bold gap-3',
        'hover:bg-primary/10 hover:border-primary/40 transition-all group',
        className
      )}
      variant="outline"
    >
      <Wallet className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
      Connect Wallet
    </Button>
  )
}
