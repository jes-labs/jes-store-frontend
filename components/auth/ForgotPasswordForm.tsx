'use client'

import React from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { forgotPasswordSchema, type ForgotPasswordFormValues } from '@/lib/validations/auth.schema'
import AuthCard from '@/components/auth/AuthCard'
import FormInput from '@/components/auth/FormInput'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, Mail } from 'lucide-react'

export default function ForgotPasswordForm() {
  const [status, setStatus] = React.useState<'form' | 'sent'>('form')
  const [isLoading, setIsLoading] = React.useState(false)
  const [emailValue, setEmailValue] = React.useState('')
  const [countdown, setCountdown] = React.useState(30)

  const methods = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  })

  React.useEffect(() => {
    let timer: NodeJS.Timeout
    if (status === 'sent' && countdown > 0) {
      timer = setInterval(() => setCountdown(prev => prev - 1), 1000)
    }
    return () => clearInterval(timer)
  }, [status, countdown])

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    setIsLoading(true)
    setEmailValue(data.email)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsLoading(false)
    setStatus('sent')
  }

  const handleResend = async () => {
    if (countdown > 0) return
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsLoading(false)
    setCountdown(30)
  }

  if (status === 'sent') {
    return (
      <AuthCard
        title="Check your email"
        subtitle={`We've sent a recovery link to ${emailValue}. Please check your inbox and spam folder.`}
        footer={
          <Link 
            href="/login" 
            className="text-gray-400 hover:text-white transition-colors flex items-center justify-center gap-2 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to sign in</span>
          </Link>
        }
      >
        <div className="flex flex-col items-center justify-center py-6">
          <div className="relative w-20 h-20 mb-8">
            <motion.div 
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute inset-0 bg-primary/10 rounded-full blur-xl"
            />
            <svg viewBox="0 0 48 36" className="relative w-full h-full">
              {/* Envelope Outline */}
              <motion.path 
                d="M2,2 h44 a2,2 0 0,1 2,2 v28 a2,2 0 0,1 -2,2 h-44 a2,2 0 0,1 -2,-2 v-28 a2,2 0 0,1 2,-2 z"
                fill="none" 
                stroke="hsl(var(--primary))" 
                strokeWidth="2"
                initial={{ pathLength: 0 }} 
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }} 
              />
              {/* Flap Lines */}
              <motion.path 
                d="M2,2 l22,16 l22,-16"
                fill="none" 
                stroke="hsl(var(--primary))" 
                strokeWidth="2"
                initial={{ pathLength: 0 }} 
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }} 
              />
              {/* Check inside */}
              <motion.path 
                d="M16,18 l6,6 l10,-10"
                fill="none" 
                stroke="hsl(var(--primary))" 
                strokeWidth="2.5" 
                strokeLinecap="round"
                initial={{ pathLength: 0 }} 
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.4, delay: 1.3 }} 
              />
            </svg>
          </div>

          <div className="text-center space-y-4 w-full">
            <p className="text-sm text-gray-400">
              The link expires in 15 minutes.
            </p>
            
            <button
              onClick={handleResend}
              disabled={countdown > 0 || isLoading}
              className="text-sm font-medium text-primary hover:text-primary/80 disabled:text-gray-600 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? "Sending..." : countdown > 0 ? `Resend link in ${countdown}s` : "Didn't get the email? Resend link"}
            </button>
          </div>
        </div>
      </AuthCard>
    )
  }

  return (
    <AuthCard
      title="Reset your password"
      subtitle="Enter your JesStore email and we'll send you a link to reset your password"
      footer={
        <Link 
          href="/login" 
          className="text-gray-400 hover:text-white transition-colors flex items-center justify-center gap-2 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to sign in</span>
        </Link>
      }
    >
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
          <FormInput
            name="email"
            label="Email Address"
            type="email"
            placeholder="amara@fashionhub.com"
          />

          <Button 
            type="submit" 
            disabled={isLoading}
            className="w-full h-14 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold text-base shadow-lg shadow-primary/20 transition-all duration-300 group"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Sending link...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span>Send Reset Link</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            )}
          </Button>
        </form>
      </FormProvider>
    </AuthCard>
  )
}
