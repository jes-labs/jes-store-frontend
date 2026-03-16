'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface PasswordStrengthProps {
  password?: string
}

export default function PasswordStrength({ password = '' }: PasswordStrengthProps) {
  const getStrength = (pass: string) => {
    let score = 0
    if (pass.length === 0) return 0
    if (pass.length >= 8) score++
    if (/[A-Z]/.test(pass)) score++
    if (/[0-9]/.test(pass)) score++
    if (/[^A-Za-z0-9]/.test(pass)) score++
    return score
  }

  const strength = getStrength(password)
  
  const labels = ["", "Weak", "Fair", "Good", "Strong"]
  const colors = [
    "bg-gray-800",
    "bg-destructive",
    "bg-amber-500",
    "bg-blue-500",
    "bg-primary"
  ]

  return (
    <div className="space-y-2 pt-1">
      <div className="flex justify-between items-center text-[10px] uppercase tracking-wider font-bold">
        <span className="text-gray-500">Security Strength</span>
        <span className={cn(
          "transition-colors duration-300",
          strength > 0 ? (strength === 1 ? 'text-destructive' : strength === 2 ? 'text-amber-500' : strength === 3 ? 'text-blue-500' : 'text-primary') : 'text-gray-500'
        )}>
          {labels[strength] || "Enter password"}
        </span>
      </div>
      
      <div className="grid grid-cols-4 gap-1.5 h-1">
        {[1, 2, 3, 4].map((step) => (
          <div
            key={step}
            className={cn(
              "h-full rounded-full transition-all duration-300 ease-out",
              strength >= step ? colors[strength] : "bg-white/5"
            )}
          />
        ))}
      </div>
    </div>
  )
}
