import HeroSection from '@/components/landing/HeroSection'
import SocialProofBar from '@/components/landing/SocialProofBar'
import FeaturesSection from '@/components/landing/FeaturesSection'
import HowItWorksSection from '@/components/landing/HowItWorksSection'
import DemoSection from '@/components/landing/DemoSection'
import PaymentsSection from '@/components/landing/PaymentsSection'
import AnalyticsSection from '@/components/landing/AnalyticsSection'
import PricingSection from '@/components/landing/PricingSection'
import TestimonialsSection from '@/components/landing/TestimonialsSection'
import FAQSection from '@/components/landing/FAQSection'
import CTASection from '@/components/landing/CTASection'

export default function LandingPage() {
  return (
    <main className="flex flex-col w-full">
      <HeroSection />
      <SocialProofBar />
      <FeaturesSection />
      <HowItWorksSection />
      <DemoSection />
      <PaymentsSection />
      <AnalyticsSection />
      <PricingSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </main>
  )
}
