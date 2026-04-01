import { useAuthStore } from '@/store/authStore'

/**
 * Returns the active store ID from auth state.
 * Returns null if no store is selected (e.g., during onboarding).
 */
export const useActiveStore = (): string | null => {
  return useAuthStore((s) => s.activeStoreId)
}
