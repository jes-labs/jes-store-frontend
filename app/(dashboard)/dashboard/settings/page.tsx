'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Store, Mail, Phone, QrCode, Share2, Copy, Save, ShieldCheck, LogOut, Loader2 } from "lucide-react"
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import { toast } from 'sonner'
import { useMyStores, useUpdateStore } from '@/hooks/useStores'

export default function SettingsPage() {
  const router = useRouter()
  const logout = useAuthStore((s) => s.logout)
  const user = useAuthStore((s) => s.user)
  const activeStoreId = useAuthStore((s) => s.activeStoreId)

  const { data: stores = [], isLoading: storesLoading } = useMyStores()
  const store = stores.find((s) => s.id === activeStoreId) ?? stores[0]
  const { mutate: updateStore, isPending: isSaving } = useUpdateStore(store?.id ?? '')

  const [storeName, setStoreName] = useState('')
  const [description, setDescription] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  // Populate form once store loads
  useEffect(() => {
    if (!store) return
    setStoreName((store as any).store_name ?? store.name ?? '')
    setDescription(store.description ?? '')
    setEmail(user?.email ?? '')
    setPhone(user?.walletAddress ?? '')
  }, [store, user])

  const storeUrl = store?.id ? `${typeof window !== 'undefined' ? window.location.origin : ''}/store/${store.id}` : ''
  const walletAddress = (store as any)?.owner_address ?? (store as any)?.walletAddress ?? user?.walletAddress ?? ''

  const handleSave = () => {
    if (!store?.id) return
    updateStore(
      { name: storeName, description },
      {
        onSuccess: () => toast.success('Store updated'),
        onError: () => toast.error('Failed to save changes'),
      }
    )
  }

  const handleLogout = () => {
    logout()
    toast.success('Logged out')
    router.push('/login')
  }

  if (storesLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12">
      <div>
        <h1 className="text-3xl font-bold font-display tracking-tight">Store Settings</h1>
        <p className="text-muted-foreground pt-1">Configure your digital storefront and business profile</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Store Profile */}
          <Card className="border-border/50 bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Store className="text-primary" size={20} />
                Store Profile
              </CardTitle>
              <CardDescription>How your store appears to customers on the marketplace.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="storeName" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground px-1">Store Name</Label>
                <Input
                  id="storeName"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  className="h-12 rounded-xl bg-muted/20 border-transparent focus:bg-background transition-all"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="storeDesc" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground px-1">Store Description</Label>
                <Textarea
                  id="storeDesc"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Tell your story..."
                  className="min-h-[120px] rounded-xl bg-muted/20 border-transparent focus:bg-background transition-all resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground px-1">Account Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                    <Input
                      id="email"
                      value={email}
                      readOnly
                      className="h-12 pl-12 rounded-xl bg-muted/20 border-transparent opacity-60 cursor-not-allowed"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground px-1">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                    <Input
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="h-12 pl-12 rounded-xl bg-muted/20 border-transparent focus:bg-background transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button onClick={handleSave} disabled={isSaving} className="rounded-xl font-bold py-6 px-8 gap-2 shadow-lg shadow-primary/20">
                  {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={18} />}
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Payment Settings */}
          <Card className="border-border/50 bg-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <ShieldCheck className="text-green-500" size={20} />
                  Payment Settings
                </CardTitle>
                <CardDescription>Your wallet address where customers pay you directly.</CardDescription>
              </div>
              {walletAddress && (
                <Badge className="bg-green-500/10 text-green-500 border-green-500/20 rounded-lg">Wallet Connected</Badge>
              )}
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 rounded-2xl bg-muted/20 border border-border/50 space-y-4">
                <p className="text-sm font-bold">Payout Wallet Address</p>
                {walletAddress ? (
                  <div className="flex gap-2">
                    <code className="flex-1 p-3 rounded-xl bg-background border border-border/50 text-sm font-mono truncate">
                      {walletAddress}
                    </code>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-12 w-12 rounded-xl border-border/50 bg-card shrink-0"
                      onClick={() => { navigator.clipboard.writeText(walletAddress); toast.success('Copied') }}
                    >
                      <Copy size={16} />
                    </Button>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No wallet address found. Update your store settings.</p>
                )}
                <p className="text-[10px] text-muted-foreground italic">Customers pay directly to this address. JesStore never holds your funds.</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          {/* Store Link */}
          <Card className="border-border/50 bg-card overflow-hidden text-center">
            <div className="bg-primary/5 p-8 border-b border-border/50 flex flex-col items-center">
              <div className="h-48 w-48 bg-white p-4 rounded-3xl shadow-xl mb-6 flex items-center justify-center">
                <QrCode size={152} className="text-black" />
              </div>
              <h3 className="text-xl font-bold font-display">Store QR Code</h3>
              <p className="text-xs text-muted-foreground pt-1">Scan to open storefront on mobile</p>
            </div>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Public Link</p>
                <p className="text-sm font-bold text-primary truncate">{storeUrl || '—'}</p>
              </div>
              <div className="flex gap-3 pt-2">
                <Button
                  variant="outline"
                  className="flex-1 rounded-xl font-bold gap-2"
                  disabled={!storeUrl}
                  onClick={() => { navigator.clipboard.writeText(storeUrl); toast.success('Link copied') }}
                >
                  <Copy size={16} />
                  Copy
                </Button>
                <Button
                  className="flex-1 rounded-xl font-bold gap-2"
                  disabled={!storeUrl}
                  onClick={() => navigator.share?.({ url: storeUrl, title: storeName })}
                >
                  <Share2 size={16} />
                  Share
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Sign Out */}
          <Card className="border-destructive/20 bg-destructive/5">
            <CardContent className="p-6 space-y-4">
              <div className="space-y-1">
                <h3 className="font-bold">Sign Out</h3>
                <p className="text-xs text-muted-foreground">Log out of your JesStore account on this device.</p>
              </div>
              <Button variant="destructive" className="w-full rounded-xl font-bold gap-2" onClick={handleLogout}>
                <LogOut size={16} />
                Log Out
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
