'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Shield,
  Activity,
  Globe,
  Users,
  CreditCard,
  Settings,
  AlertTriangle,
  Server,
  Zap,
  TrendingUp,
  Cpu,
  LogOut
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { authApi } from '@/lib/api/auth'
import { useAuthStore } from '@/store/authStore'
import { toast } from 'sonner'

const adminNav = [
  {
    group: 'Platform Overview',
    items: [
      { icon: Activity, label: 'Live Metrics', href: '/admin' },
      { icon: Globe, label: 'Store Ecosystem', href: '/admin/stores' },
      { icon: CreditCard, label: 'Global Transactions', href: '/admin/transactions' },
    ]
  },
  {
    group: 'Management',
    items: [
      { icon: Users, label: 'Platform Users', href: '/admin/users' },
      { icon: Shield, label: 'Security & Auth', href: '/admin/security' },
      { icon: AlertTriangle, label: 'Issue Logs', href: '/admin/logs' },
    ]
  },
  {
    group: 'Infrastructure',
    items: [
      { icon: Server, label: 'Nodes & RPC', href: '/admin/infra' },
      { icon: Cpu, label: 'System Health', href: '/admin/health' },
      { icon: Settings, label: 'Global Config', href: '/admin/config' },
    ]
  }
]

export default function AdminSidebar() {
  const pathname = usePathname()
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
    <div className="flex flex-col h-full bg-[#080808] border-r border-white/5">
      {/* Header */}
      <div className="h-16 flex items-center px-6 border-b border-white/5 gap-3">
        <div className="w-8 h-8 rounded bg-primary flex items-center justify-center">
          <Shield className="w-5 h-5 text-black" />
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-sm tracking-tight text-white uppercase">JesStore</span>
          <span className="text-[10px] text-primary font-bold tracking-widest uppercase opacity-80 leading-none">Admin Nexus</span>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-8 custom-scrollbar">
        {adminNav.map((section) => (
          <div key={section.group} className="space-y-2">
            <h3 className="px-3 text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-4">
              {section.group}
            </h3>
            <div className="space-y-1">
              {section.items.map((item) => {
                const isActive = pathname === item.href
                const Icon = item.icon

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg text-xs transition-all duration-200 group",
                      isActive 
                        ? "text-primary bg-primary/5 font-bold border border-primary/20" 
                        : "text-white/50 hover:text-white hover:bg-white/5"
                    )}
                  >
                    <Icon className={cn("w-4 h-4", isActive ? "text-primary" : "group-hover:text-white")} />
                    <span>{item.label}</span>
                    {isActive && (
                      <div className="ml-auto w-1 h-1 rounded-full bg-primary shadow-[0_0_8px_rgba(var(--primary),0.8)]" />
                    )}
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-white/5">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/5 mb-3">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-[10px] font-bold text-white">
            AD
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[11px] font-bold text-white truncate">Super Admin</span>
            <span className="text-[9px] text-white/40 truncate">God Mode Enabled</span>
          </div>
        </div>
        <Button 
          variant="ghost" 
          onClick={handleLogout}
          className="w-full justify-start gap-3 h-10 text-white/50 hover:text-destructive hover:bg-destructive/10 text-xs px-3"
        >
          <LogOut className="w-4 h-4" />
          <span>Exit Admin</span>
        </Button>
      </div>
    </div>
  )
}
