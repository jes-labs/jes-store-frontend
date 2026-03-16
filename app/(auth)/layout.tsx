import Link from 'next/link'
import AuthBackground from '@/components/auth/AuthBackground'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center px-4 py-12 bg-background overflow-hidden">
      {/* Background Layer */}
      <AuthBackground />

      <div className="relative z-10 w-full flex flex-col items-center">
        {/* Branding */}
        <Link href="/" className="mb-10 flex items-center group transition-transform duration-300 hover:scale-[1.02]">
          <span className="font-['Outfit'] font-bold text-2xl tracking-tight">
            <span className="text-primary">Jes</span>
            <span className="text-white">Store</span>
          </span>
        </Link>

        {/* Auth Content */}
        {children}
      </div>
    </div>
  )
}
