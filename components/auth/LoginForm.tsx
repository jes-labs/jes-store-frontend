'use client'

import React from 'react'
import AuthCard from '@/components/auth/AuthCard'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { authApi } from '@/lib/api/auth'
import { storesApi } from '@/lib/api/stores'
import { useAuthStore } from '@/store/authStore'
import { toast } from 'sonner'
import { ArrowRight } from 'lucide-react'
import { getApiErrorMessage } from '@/lib/utils/handleApiError'
import { User } from '@/types/auth'
import { useWallet } from '@/hooks/useWallet'
import WalletConnectButton from '@/components/auth/WalletConnectButton'

export default function LoginForm() {
  const [isLoading, setIsLoading] = React.useState(false)
  const router = useRouter()
  const authStore = useAuthStore()
  const { address, isConnected } = useWallet()

  const handleLogin = async () => {
    if (!address) {
      toast.error('Please connect your wallet first')
      return
    }
    setIsLoading(true)
    try {
      const normalizedAddress = address.toLowerCase()
      const loginResponse = await authApi.login({ wallet_address: normalizedAddress })

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

      let hasStore = false
      try {
        const stores = await storesApi.getMyStores()
        const storeList = Array.isArray(stores) ? stores : []
        if (storeList.length > 0) {
          authStore.setActiveStoreId(storeList[0].id)
          hasStore = true
        }
      } catch (err) {
        console.error('[Login] getMyStores failed:', err)
      }

      toast.success('Welcome back!')
      router.push(hasStore ? '/dashboard' : '/onboarding')
    } catch (error: any) {
      const msg = getApiErrorMessage(error)
      const isNotRegistered = msg.toLowerCase().includes('not registered') || msg.toLowerCase().includes('register first')
      if (isNotRegistered) {
        toast.error('Wallet not registered.', {
          description: 'Please create an account first.',
          action: { label: 'Register', onClick: () => router.push('/register') },
        })
      } else {
        toast.error(msg)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthCard
      title="Welcome back"
      subtitle="Connect your wallet to sign in to your JesStore account"
      footer={
        <p className="text-gray-400">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="text-primary hover:text-primary/80 font-medium transition-colors">
            Create one →
          </Link>
        </p>
      }
    >
      <div className="space-y-6">
        <WalletConnectButton />

        {isConnected && address && (
          <Button
            onClick={handleLogin}
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
        )}
      </div>
    </AuthCard>
  )
}
