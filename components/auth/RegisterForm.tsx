'use client'

import React from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import AuthCard from '@/components/auth/AuthCard'
import FormInput from '@/components/auth/FormInput'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { authApi } from '@/lib/api/auth'
import { useAuthStore } from '@/store/authStore'
import { toast } from 'sonner'
import { getApiErrorMessage } from '@/lib/utils/handleApiError'
import { User } from '@/types/auth'
import { useWallet } from '@/hooks/useWallet'
import WalletConnectButton from '@/components/auth/WalletConnectButton'

const registerSchema = z.object({
  user_name: z.string().min(2, 'Enter your full name').max(100, 'Name is too long'),
  email: z.string().email('Enter a valid email address'),
  phone_number: z.string().optional().or(z.literal('')),
  agreedToTerms: z.literal(true, {
    errorMap: () => ({ message: 'You must accept the terms to continue' }),
  }),
})

type RegisterFormValues = z.infer<typeof registerSchema>

export default function RegisterForm() {
  const [isLoading, setIsLoading] = React.useState(false)
  const router = useRouter()
  const authStore = useAuthStore()
  const { address, isConnected } = useWallet()

  const methods = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      user_name: '',
      email: '',
      phone_number: '',
      agreedToTerms: false as unknown as true,
    },
  })

  const onSubmit = async (data: RegisterFormValues) => {
    if (!address) {
      toast.error('Please connect your wallet first')
      return
    }
    setIsLoading(true)
    try {
      await authApi.register({
        wallet_address: address.toLowerCase(),
        user_name: data.user_name,
        email: data.email,
        phone_number: data.phone_number || undefined,
      })

      const loginResponse = await authApi.login({ wallet_address: address.toLowerCase() })

      authStore.logout()
      const user: User = {
        id: loginResponse.user.id,
        email: loginResponse.user.email,
        fullName: loginResponse.user.user_name,
        walletAddress: loginResponse.user.wallet_address,
        role: (loginResponse.role as 'owner' | 'staff') ?? 'owner',
        createdAt: '',
        updatedAt: '',
      }
      authStore.setAuth(loginResponse.token, '', user)

      toast.success("Account created! Let's set up your store.")
      router.push('/onboarding')
    } catch (error) {
      toast.error(getApiErrorMessage(error))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthCard
      title="Create your account"
      subtitle="Start selling with JesStore. No credit card required."
      footer={
        <p className="text-gray-400">
          Already have an account?{' '}
          <Link href="/login" className="text-primary hover:text-primary/80 font-medium transition-colors">
            Sign in →
          </Link>
        </p>
      }
    >
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <FormInput name="user_name" label="Full Name" placeholder="Amara Okonkwo" />
            <FormInput name="email" label="Email Address" type="email" placeholder="amara@fashionhub.com" />
          </div>

          <FormInput
            name="phone_number"
            label="Phone Number"
            placeholder="+2348011111111"
            helperText="(Optional)"
          />

          {/* Wallet — replaced text input with connect button */}
          <div className="space-y-2">
            <Label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Wallet Address</Label>
            <WalletConnectButton />
            {!isConnected && methods.formState.isSubmitted && (
              <p className="text-[10px] text-destructive font-medium">Connect your wallet to continue</p>
            )}
          </div>

          <div className="pt-2">
            <div className="flex items-start space-x-3">
              <Checkbox
                id="agreedToTerms"
                onCheckedChange={(checked) => methods.setValue('agreedToTerms', checked as true)}
              />
              <Label htmlFor="agreedToTerms" className="text-xs text-gray-400 leading-normal cursor-pointer select-none font-['Plus_Jakarta_Sans']">
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
            disabled={isLoading || !isConnected}
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
    </AuthCard>
  )
}
