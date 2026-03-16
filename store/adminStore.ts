import { create } from 'zustand'

interface AdminState {
  isAdmin: boolean
  setAdmin: (isAdmin: boolean) => void
  reset: () => void
}

export const useAdminStore = create<AdminState>((set) => ({
  isAdmin: false,
  setAdmin: (isAdmin) => set({ isAdmin }),
  reset: () => set({ isAdmin: false }),
}))
