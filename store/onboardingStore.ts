import { create } from 'zustand'

export type OnboardingStep = 1 | 2 | 3 | 4

interface OnboardingData {
  storeName: string
  storeSlug: string
  storeDescription: string
  walletAddress: string
  category: string
  socials: {
    instagram: string
    twitter: string
  }
  logo: string | null
}

interface OnboardingState {
  currentStep: OnboardingStep
  data: OnboardingData
  // Actions
  setStep: (step: OnboardingStep) => void
  nextStep: () => void
  prevStep: () => void
  updateData: (updates: Partial<OnboardingData>) => void
  reset: () => void
}

const initialData: OnboardingData = {
  storeName: '',
  storeSlug: '',
  storeDescription: '',
  walletAddress: '',
  category: '',
  socials: {
    instagram: '',
    twitter: '',
  },
  logo: null,
}

export const useOnboardingStore = create<OnboardingState>((set) => ({
  currentStep: 1,
  data: initialData,
  setStep: (step) => set({ currentStep: step }),
  nextStep: () => set((state) => ({ 
    currentStep: Math.min(state.currentStep + 1, 4) as OnboardingStep 
  })),
  prevStep: () => set((state) => ({ 
    currentStep: Math.max(state.currentStep - 1, 1) as OnboardingStep 
  })),
  updateData: (updates) => set((state) => ({ 
    data: { ...state.data, ...updates } 
  })),
  reset: () => set({ currentStep: 1, data: initialData }),
}))
