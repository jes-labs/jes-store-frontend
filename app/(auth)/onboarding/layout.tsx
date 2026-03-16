'use client'

import Link from 'next/link'
import AuthBackground from '@/components/auth/AuthBackground'
import StepIndicator from '@/components/auth/onboarding/StepIndicator'
import { motion, AnimatePresence } from 'framer-motion'

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center px-4 py-8 bg-background overflow-hidden">
      <AuthBackground />

      <div className="relative z-10 w-full flex flex-col items-center">
        {/* Progress Tracker */}
        <StepIndicator />

        <div className="w-full max-w-[640px] relative">
          <div className="absolute top-0 right-0 -mt-16">
            <Link 
              href="/dashboard" 
              className="text-gray-500 hover:text-white transition-colors text-sm font-medium"
            >
              Skip setup →
            </Link>
          </div>
          
          <AnimatePresence mode="wait">
            <motion.div
              key="onboarding-form"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
