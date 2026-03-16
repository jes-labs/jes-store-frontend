'use client'

import React from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, type LoginFormValues } from '@/lib/validations/auth.schema'
import AuthCard from '@/components/auth/AuthCard'
import FormInput from '@/components/auth/FormInput'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import WalletSignInButton from '@/components/auth/WalletSignInButton'
import { useRouter, useSearchParams } from 'next/navigation'
import { authApi } from '@/lib/api/auth'
import { useAuthStore } from '@/store/authStore'
import { toast } from 'sonner'
import { ArrowRight } from 'lucide-react'

export default function LoginForm() {
  const [isLoading, setIsLoading] = React.useState(false)
  const [isWalletLoading, setIsWalletLoading] = React.useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const setUser = useAuthStore(state => state.setUser)
  const setTokens = useAuthStore(state => state.setTokens)

  const methods = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  })

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true)
    try {
      const response = await authApi.login(data)
      
      if (response.data) {
        setUser(response.data.user)
        setTokens(response.data.accessToken, response.data.refreshToken)
        
        toast.success('Welcome back!')
        
        const redirectTo = searchParams.get('redirect') || '/dashboard'
        router.push(redirectTo)
        router.refresh() // important for middleware to pick up the cookie
      }
    } catch (error) {
      console.error('Login error:', error)
      toast.error('Invalid credentials (try anything for now)')
    } finally {
      setIsLoading(false)
    }
  }

  const handleWalletSignIn = async () => {
    setIsWalletLoading(true)
    // Wallet connection logic here
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsWalletLoading(false)
  }

  return (
    <AuthCard
      title="Welcome back"
      subtitle="Sign in to your JesStore account to manage your business"
      footer={
        <p className="text-gray-400">
          Don't have an account?{' '}
          <Link 
            href="/register" 
            className="text-primary hover:text-primary/80 font-medium transition-colors"
          >
            Create one →
          </Link>
        </p>
      }
    >
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
          <FormInput
            name="email"
            label="Email Address"
            type="email"
            placeholder="name@company.com"
          />

          <div className="space-y-1">
            <FormInput
              name="password"
              label="Password"
              type="password"
              placeholder="••••••••"
            />
            <div className="flex justify-end">
              <Link 
                href="/forgot-password" 
                className="text-xs text-gray-500 hover:text-primary transition-colors font-medium"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="rememberMe" {...methods.register('rememberMe')} />
            <Label 
              htmlFor="rememberMe" 
              className="text-sm text-gray-400 cursor-pointer select-none font-['Plus_Jakarta_Sans']"
            >
              Remember me for 30 days
            </Label>
          </div>

          <Button 
            type="submit" 
            disabled={isLoading}
            className="w-full h-14 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold text-base shadow-lg shadow-primary/20 transition-all duration-300 group"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Signing in...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span>Sign In</span>
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
            or continue with
          </span>
        </div>
      </div>

      <WalletSignInButton 
        loading={isWalletLoading} 
        onClick={handleWalletSignIn} 
      />
    </AuthCard>
  )
}
