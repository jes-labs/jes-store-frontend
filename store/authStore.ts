import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User } from '@/types/auth'


interface AuthState {
  accessToken: string | null
  refreshToken: string | null
  user: User | null
  activeStoreId: string | null
  isAuthenticated: boolean
  isHydrated: boolean
  // Actions
  setAuth: (accessToken: string, refreshToken: string, user: User) => void
  setAccessToken: (token: string) => void
  setUser: (user: User) => void
  setTokens: (accessToken: string, refreshToken: string) => void
  setActiveStoreId: (id: string) => void
  logout: () => void
  clearAuth: () => void
  setHydrated: () => void
  isLoggedIn: () => boolean
  hydrate: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      refreshToken: null,
      user: null,
      activeStoreId: null,
      isAuthenticated: false,
      isHydrated: false,
      setAuth: (accessToken, refreshToken, user) => set({ accessToken, refreshToken, user, isAuthenticated: true, activeStoreId: null }),
      setAccessToken: (accessToken) => set({ accessToken, isAuthenticated: true }),
      setUser: (user) => set({ user }),
      setTokens: (accessToken, refreshToken) => set({ accessToken, refreshToken, isAuthenticated: true }),
      setActiveStoreId: (id) => set({ activeStoreId: id }),
      logout: () => set({ accessToken: null, refreshToken: null, user: null, activeStoreId: null, isAuthenticated: false }),
      clearAuth: () => set({ accessToken: null, refreshToken: null, user: null, activeStoreId: null, isAuthenticated: false }),
      setHydrated: () => set({ isHydrated: true }),
      isLoggedIn: () => !!get().accessToken,
      hydrate: () => {
        // Hydration is handled by persist middleware, but we can manually trigger if needed
        const state = get()
        if (state.accessToken) set({ isAuthenticated: true })
        set({ isHydrated: true })
      },
    }),
    {
      name: 'jesstore-auth',
      // Only persist tokens + user, not derived state
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        user: state.user,
        activeStoreId: state.activeStoreId,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated()
        if (state?.accessToken) state.isAuthenticated = true
      },
    }
  )
)
