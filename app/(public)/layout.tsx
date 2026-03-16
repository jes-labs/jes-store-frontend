import PublicNav from '@/components/landing/PublicNav'
import PublicFooter from '@/components/landing/PublicFooter'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <PublicNav />
      <div className="flex-1">
        {children}
      </div>
      <PublicFooter />
    </div>
  )
}
