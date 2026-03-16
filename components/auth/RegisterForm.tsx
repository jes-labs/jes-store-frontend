'use client'

import React from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema, type RegisterFormValues } from '@/lib/validations/auth.schema'
import AuthCard from '@/components/auth/AuthCard'
import FormInput from '@/components/auth/FormInput'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import WalletSignInButton from '@/components/auth/WalletSignInButton'
import PasswordStrength from '@/components/auth/PasswordStrength'
import { ArrowRight, LinkIcon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

import { useRouter } from 'next/navigation'
import { authApi } from '@/lib/api/auth'
import { useAuthStore } from '@/store/authStore'
import { toast } from 'sonner'

export default function RegisterForm() {
  const [isLoading, setIsLoading] = React.useState(false)
  const router = useRouter()
  const setUser = useAuthStore(state => state.setUser)
  const setTokens = useAuthStore(state => state.setTokens)

  const methods = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      walletAddress: '',
      password: '',
      confirmPassword: '',
      agreedToTerms: false as any,
    },
  })

  const password = methods.watch('password')

  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true)
    try {
      const response = await authApi.register({
        ...data,
        businessName: data.fullName, // Using fullName as businessName fallback for registration
      })
      
      if (response.data) {
        setUser(response.data.user)
        setTokens(response.data.accessToken, response.data.refreshToken)
        toast.success('Account created!')
        router.push('/onboarding')
        router.refresh()
      }
    } catch (error) {
      console.error('Registration error:', error)
      toast.error('Registration failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleAutoFillWallet = () => {
    // In a real app, this would use wagmi to detect the connected account
    methods.setValue('walletAddress', '0x71C7656EC7ab88b098defB751B7401B5f6d8976F')
  }

  return (
    <AuthCard
      title="Create your account"
      subtitle="Start your 14-day free trial. No credit card required."
      footer={
        <p className="text-gray-400">
          Already have an account?{' '}
          <Link 
            href="/login" 
            className="text-primary hover:text-primary/80 font-medium transition-colors"
          >
            Sign in →
          </Link>
        </p>
      }
    >
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <FormInput
              name="fullName"
              label="Full Name"
              placeholder="Amara Okonkwo"
            />

            <FormInput
              name="email"
              label="Email Address"
              type="email"
              placeholder="amara@fashionhub.com"
            />
          </div>

          <div className="relative">
            <FormInput
                name="walletAddress"
                label="Wallet Address"
                placeholder="0x..."
                helperText="(Optional)"
                className="font-mono"
            />
            <button
                type="button"
                onClick={handleAutoFillWallet}
                className="absolute right-4 top-[38px] flex items-center gap-1.5 text-xs text-primary border border-primary/30 rounded-lg px-2 py-1 bg-primary/5 hover:bg-primary/10 transition-colors"
            >
                <LinkIcon className="w-3 h-3" />
                <span>Auto-fill</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <FormInput
              name="password"
              label="Create Password"
              type="password"
              placeholder="••••••••"
            />

            <FormInput
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              placeholder="••••••••"
            />
          </div>
          
          <PasswordStrength password={password} />

          <div className="pt-2">
            <div className="flex items-start space-x-3">
              <Checkbox 
                id="agreedToTerms" 
                onCheckedChange={(checked) => methods.setValue('agreedToTerms', checked as true)}
              />
              <Label 
                htmlFor="agreedToTerms" 
                className="text-xs text-gray-400 leading-normal cursor-pointer select-none font-['Plus_Jakarta_Sans']"
              >
                I agree to the{' '}
                <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link>
                {' '}and{' '}
                <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
              </Label>
            </div>
            <AnimatePresence>
                {methods.formState.errors.agreedToTerms && (
                    <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-[10px] text-destructive mt-1.5 font-medium ml-7"
                    >
                        {methods.formState.errors.agreedToTerms.message as string}
                    </motion.p>
                )}
            </AnimatePresence>
          </div>

          <Button 
            type="submit" 
            disabled={isLoading}
            className="w-full h-14 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold text-base shadow-lg shadow-primary/20 transition-all duration-300 group mt-2"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Creating account...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span>Create Account</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            )}
          </Button>
        </form>
      </FormProvider>

      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/5" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-[#121212] px-4 text-gray-500 font-medium tracking-widest">
            or register with
          </span>
        </div>
      </div>

      <WalletSignInButton 
        text="Register with Wallet"
        onClick={() => console.log('Wallet registration')} 
      />
    </AuthCard>
  )
}
