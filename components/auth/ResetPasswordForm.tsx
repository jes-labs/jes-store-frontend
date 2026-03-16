'use client'

import React from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { resetPasswordSchema, type ResetPasswordFormValues } from '@/lib/validations/auth.schema'
import AuthCard from '@/components/auth/AuthCard'
import FormInput from '@/components/auth/FormInput'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react'
import PasswordStrength from '@/components/auth/PasswordStrength'

export default function ResetPasswordForm() {
  const [status, setStatus] = React.useState<'loading' | 'valid' | 'expired' | 'success'>('loading')
  const [isLoading, setIsLoading] = React.useState(false)

  const methods = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: '', confirmPassword: '' },
  })

  const password = methods.watch('password')

  React.useEffect(() => {
    // Simulate token verification
    const timer = setTimeout(() => {
      setStatus('valid')
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  const onSubmit = async (data: ResetPasswordFormValues) => {
    setIsLoading(true)
    console.log('Updating password:', data)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsLoading(false)
    setStatus('success')
  }

  if (status === 'loading') {
    return (
      <AuthCard 
        title="Verifying link" 
        subtitle="Please wait while we verify your password reset link..."
      >
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4" />
          <p className="text-sm text-gray-500 font-medium">Verifying security token...</p>
        </div>
      </AuthCard>
    )
  }

  if (status === 'expired') {
    return (
      <AuthCard
        title="Link expired"
        subtitle="Password reset links expire after 15 minutes for your security."
        footer={
          <Link 
            href="/forgot-password" 
            className="text-primary hover:text-primary/80 font-medium transition-colors"
          >
            Request a new link →
          </Link>
        }
      >
        <div className="flex flex-col items-center justify-center py-6 text-center">
          <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center mb-6">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              <div className="w-10 h-10 border-4 border-destructive rounded-full flex items-center justify-center font-bold text-destructive text-xl">!</div>
            </motion.div>
          </div>
          <p className="text-gray-400 text-sm">
            It looks like this reset link is no longer valid or has already been used.
          </p>
        </div>
      </AuthCard>
    )
  }

  if (status === 'success') {
    return (
      <AuthCard
        title="Password updated!"
        subtitle="Your JesStore account password has been changed successfully."
        footer={
          <Link 
            href="/login" 
            className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl h-14 flex items-center justify-center font-bold shadow-lg shadow-primary/20 transition-all group"
          >
            <span>Sign in now</span>
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        }
      >
        <div className="flex flex-col items-center justify-center py-6 text-center">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
            <motion.div
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 12 }}
            >
              <CheckCircle2 className="w-10 h-10 text-primary" />
            </motion.div>
          </div>
          <p className="text-gray-400 text-sm">
            You can now use your new password to sign in to your dashboard across all your devices.
          </p>
        </div>
      </AuthCard>
    )
  }

  return (
    <AuthCard
      title="Set new password"
      subtitle="Choose a strong, unique password for your JesStore account."
    >
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormInput
              name="password"
              label="New Password"
              type="password"
              placeholder="••••••••"
            />
            
            <PasswordStrength password={password} />

            <FormInput
              name="confirmPassword"
              label="Confirm New Password"
              type="password"
              placeholder="••••••••"
            />
          </div>

          <Button 
            type="submit" 
            disabled={isLoading}
            className="w-full h-14 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold text-base shadow-lg shadow-primary/20 transition-all duration-300 group"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Updating...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span>Update Password</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            )}
          </Button>
        </form>
      </FormProvider>
    </AuthCard>
  )
}
