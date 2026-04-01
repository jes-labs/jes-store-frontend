'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'

/**
 * Client-side auth guard for dashboard routes.
 * Redirects to /login if not authenticated.
 * Redirects to /onboarding if authenticated but no active store.
 */
export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const isHydrated = useAuthStore((s) => s.isHydrated)
  const activeStoreId = useAuthStore((s) => s.activeStoreId)

  useEffect(() => {
    if (!isHydrated) return
    if (!isAuthenticated) {
      router.replace('/login')
    } else if (!activeStoreId) {
      router.replace('/onboarding')
    }
  }, [isHydrated, isAuthenticated, activeStoreId, router])

  // Don't render until hydrated to avoid flash
  if (!isHydrated) return null
  if (!isAuthenticated || !activeStoreId) return null

  return <>{children}</>
}
