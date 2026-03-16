'use client'

import React from 'react'
import AdminSidebar from '@/components/layout/AdminSidebar'
import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { authApi } from '@/lib/api/auth'
import { useAuthStore } from '@/store/authStore'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const logoutUser = useAuthStore(state => state.logout)

  const handleLogout = async () => {
    try {
      await authApi.logout()
      logoutUser()
      toast.success('Logged out successfully')
      router.push('/login')
      router.refresh()
    } catch (error) {
      console.error('Logout error:', error)
      logoutUser()
      router.push('/login')
    }
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#050505] text-white">
      {/* Desktop Admin Sidebar */}
      <aside className="w-64 flex flex-col flex-shrink-0 z-30">
        <AdminSidebar />
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden relative">
        <header className="h-16 flex items-center justify-between px-8 border-b border-white/5 bg-[#080808]">
           <div className="flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(var(--primary),0.8)]" />
              <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-white/80">Platform Monitoring System</h2>
           </div>
           
           <div className="flex items-center gap-6">
              <div className="hidden md:flex flex-col items-end">
                 <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Network Status</span>
                 <span className="text-[10px] text-primary font-bold leading-none">Celo Mainnet (Synced)</span>
              </div>
              <div className="w-px h-8 bg-white/5" />
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-bold text-white/60">Node: jes-master-01</span>
                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
              </div>
              <div className="w-px h-8 bg-white/5" />
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleLogout}
                className="h-9 px-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-destructive/10 hover:text-destructive text-[10px] font-bold uppercase tracking-widest gap-2"
              >
                <LogOut className="w-3.5 h-3.5" />
                Logout
              </Button>
           </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {children}
        </main>
      </div>
    </div>
  )
}
