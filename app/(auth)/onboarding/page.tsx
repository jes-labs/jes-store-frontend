'use client'

import React from 'react'
import { useOnboardingStore } from '@/store/onboardingStore'
import Step1StoreName from '@/components/auth/onboarding/Step1StoreName'
import Step2WalletConnect from '@/components/auth/onboarding/Step2WalletConnect'
import Step3StoreSetup from '@/components/auth/onboarding/Step3StoreSetup'
import Step4Complete from '@/components/auth/onboarding/Step4Complete'

export default function OnboardingPage() {
  const { currentStep } = useOnboardingStore()

  return (
    <>
      {currentStep === 1 && <Step1StoreName />}
      {currentStep === 2 && <Step2WalletConnect />}
      {currentStep === 3 && <Step3StoreSetup />}
      {currentStep === 4 && <Step4Complete />}
    </>
  )
}
