'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Wallet } from 'lucide-react'
import { cn } from '@/lib/utils'

interface WalletSignInButtonProps {
  className?: string
  loading?: boolean
  onClick?: () => void
  text?: string
}

export default function WalletSignInButton({
  className,
  loading = false,
  onClick,
  text = "Continue with Wallet"
}: WalletSignInButtonProps) {
  return (
    <Button
      type="button"
      variant="outline"
      onClick={onClick}
      disabled={loading}
      className={cn(
        "h-14 w-full border-white/10 bg-white/5 rounded-xl px-4 flex items-center justify-center gap-3",
        "text-gray-300 text-sm font-medium transition-all duration-300",
        "hover:border-primary/50 hover:bg-primary/5 hover:text-white group",
        "active:scale-[0.98]",
        className
      )}
    >
      {loading ? (
        <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      ) : (
        <Wallet className="w-4 h-4 text-primary group-hover:scale-110 transition-transform duration-300" />
      )}
      <span>{loading ? "Connecting..." : text}</span>
    </Button>
  )
}
