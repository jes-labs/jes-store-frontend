'use client'

import React from 'react'
import { Bell, Search, Plus, User, LogOut, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { useRouter } from 'next/navigation'
import { authApi } from '@/lib/api/auth'
import { useAuthStore } from '@/store/authStore'
import { toast } from 'sonner'

export default function TopBar() {
  const pathname = usePathname()
  const router = useRouter()
  const logout = useAuthStore(state => state.logout)

  const handleLogout = async () => {
    try {
      await authApi.logout()
      logout()
      toast.success('Logged out successfully')
      router.push('/login')
      router.refresh()
    } catch (error) {
      console.error('Logout error:', error)
      logout()
      router.push('/login')
    }
  }

  // Dynamic title based on path
  const getPageTitle = () => {
    if (pathname === '/dashboard') return 'Overview'
    if (pathname.includes('/pos')) return 'Record Sale'
    if (pathname.includes('/products')) return 'Products'
    if (pathname.includes('/orders')) return 'Orders'
    if (pathname.includes('/customers')) return 'Customers'
    if (pathname.includes('/receipts')) return 'Receipts'
    if (pathname.includes('/analytics')) return 'Analytics'
    if (pathname.includes('/settings')) return 'Settings'
    return 'Dashboard'
  }

  return (
    <header className="h-14 lg:h-16 sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-bold font-display hidden md:block">
          {getPageTitle()}
        </h2>
      </div>

      {/* Search - Desktop Only */}
      <div className="hidden lg:flex flex-1 max-w-md mx-8">
        <div className="relative w-full group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input
            type="search"
            placeholder="Search products, orders... (⌘K)"
            className="pl-10 h-10 bg-muted/50 border-transparent focus:bg-background transition-all"
            readOnly // Command palette placeholder
          />
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        {/* Quick Action */}
        <Link href="/dashboard/pos" className="hidden sm:block">
          <Button size="sm" className="gap-2 rounded-full h-9 px-4 bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4" />
            <span className="text-sm">Record Sale</span>
          </Button>
        </Link>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative h-9 w-9 rounded-full">
          <Bell className="w-5 h-5 text-muted-foreground" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full border-2 border-background" />
        </Button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 md:w-auto md:gap-3 rounded-full md:rounded-xl p-0 md:px-2 md:py-1.5 overflow-hidden border border-transparent hover:border-border transition-all">
              <Avatar className="h-8 w-8">
                <AvatarImage src="" alt="User" />
                <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">JB</AvatarFallback>
              </Avatar>
              <div className="hidden md:flex flex-col items-start min-w-0 pr-1">
                <span className="text-sm font-semibold truncate leading-none mb-1">Jes Business</span>
                <span className="text-[10px] text-muted-foreground leading-none">Admin</span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 mt-2">
            <DropdownMenuLabel>
              <div className="flex flex-col">
                <span className="text-sm font-bold">Jes Business</span>
                <span className="text-xs text-muted-foreground font-normal">admin@jeslabs.com</span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/dashboard/settings" className="cursor-pointer">
                <Settings className="w-4 h-4 mr-2" />
                Store Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogout}
              className="text-destructive focus:text-destructive cursor-pointer"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Log Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
