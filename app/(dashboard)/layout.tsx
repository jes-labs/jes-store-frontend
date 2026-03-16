import { Metadata } from 'next'
import DashboardShell from '@/components/layout/DashboardShell'

export const metadata: Metadata = {
  title: 'Dashboard - JesStore',
  description: 'Manage your store with JesStore',
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DashboardShell>
      {children}
    </DashboardShell>
  )
}
