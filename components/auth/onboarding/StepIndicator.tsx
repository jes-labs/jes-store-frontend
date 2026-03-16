'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useOnboardingStore } from '@/store/onboardingStore'

const steps = [
  { id: 1, label: 'Store' },
  { id: 2, label: 'Wallet' },
  { id: 3, label: 'Customize' },
  { id: 4, label: 'Done' },
]

export default function StepIndicator() {
  const { currentStep } = useOnboardingStore()

  return (
    <div className="w-full max-w-sm mx-auto mb-12">
      <div className="relative flex justify-between items-center">
        {/* Background Line */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-white/5" />
        
        {/* Progress Line */}
        <motion.div 
          className="absolute left-0 top-1/2 -translate-y-1/2 h-[2px] bg-primary shadow-[0_0_10px_rgba(34,197,94,0.3)]"
          initial={{ width: "0%" }}
          animate={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />

        {steps.map((step) => {
          const isCompleted = currentStep > step.id
          const isActive = currentStep === step.id

          return (
            <div key={step.id} className="relative z-10 flex flex-col items-center">
              <motion.div
                initial={false}
                animate={{
                  backgroundColor: isCompleted || isActive ? 'hsl(var(--primary))' : '#121212',
                  borderColor: isCompleted || isActive ? 'hsl(var(--primary))' : 'rgba(255,255,255,0.1)',
                  scale: isActive ? 1.2 : 1,
                }}
                className={cn(
                  "w-8 h-8 rounded-full border-2 flex items-center justify-center transition-shadow duration-300",
                  isActive && "shadow-[0_0_15px_rgba(34,197,94,0.4)]",
                  !isActive && !isCompleted && "bg-[#121212]"
                )}
              >
                {isCompleted ? (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                    >
                        <Check className="w-4 h-4 text-white font-bold" />
                    </motion.div>
                ) : (
                  <span className={cn(
                    "text-xs font-bold",
                    isActive ? "text-white" : "text-gray-500"
                  )}>
                    {step.id}
                  </span>
                )}
              </motion.div>
              
              <span className={cn(
                "absolute -bottom-6 text-[10px] font-bold uppercase tracking-widest whitespace-nowrap hidden sm:block",
                isActive ? "text-primary" : "text-gray-600"
              )}>
                {step.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
