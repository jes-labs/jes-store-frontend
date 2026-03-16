'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Store, Mail, Phone, QrCode, Share2, Copy, Save, ShieldCheck, LogOut } from "lucide-react"
import { useRouter } from 'next/navigation'
import { authApi } from '@/lib/api/auth'
import { useAuthStore } from '@/store/authStore'
import { toast } from 'sonner'

export default function SettingsPage() {
  const storeUrl = "https://jes-store.tech/olu-sneakers"
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="storeName" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground px-1">Store Name</Label>
                  <Input id="storeName" defaultValue="Olu Sneakers & Apparel" className="h-12 rounded-xl bg-muted/20 border-transparent focus:bg-background transition-all" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="storeSlug" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground px-1">Store URL Slug</Label>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="h-12 px-3 rounded-xl border-border/50 bg-muted/50 text-muted-foreground font-mono">/store/</Badge>
                    <Input id="storeSlug" defaultValue="olu-sneakers" className="h-12 rounded-xl bg-muted/20 border-transparent focus:bg-background transition-all flex-1" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="storeDesc" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground px-1">Store Description</Label>
                <Textarea
                  id="storeDesc"
                  placeholder="Tell your story..."
                  className="min-h-[120px] rounded-xl bg-muted/20 border-transparent focus:bg-background transition-all resize-none"
                  defaultValue="Premium authentic sneakers and streetwear based in Lagos. We specialize in limited editions and classic silhouettes."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground px-1">Support Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                    <Input id="email" defaultValue="hello@olu-sneakers.com" className="h-12 pl-12 rounded-xl bg-muted/20 border-transparent focus:bg-background transition-all" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground px-1">Business Phone</Label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                    <Input id="phone" defaultValue="+234 812 345 6789" className="h-12 pl-12 rounded-xl bg-muted/20 border-transparent focus:bg-background transition-all" />
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button className="rounded-xl font-bold py-6 px-8 gap-2 shadow-lg shadow-primary/20">
                  <Save size={18} />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Payment & Security */}
          <Card className="border-border/50 bg-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <ShieldCheck className="text-green-500" size={20} />
                  Payment Settings
                </CardTitle>
                <CardDescription>Manage how you receive crypto payments.</CardDescription>
              </div>
              <Badge className="bg-green-500/10 text-green-500 border-green-500/20 rounded-lg">Verified Merchant</Badge>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 rounded-2xl bg-muted/20 border border-border/50 space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold">Payout Wallet Address</p>
                  <Button variant="ghost" size="sm" className="h-auto p-0 text-primary text-[10px] font-bold uppercase tracking-widest hover:bg-transparent">Change</Button>
                </div>
                <div className="flex gap-2">
                  <code className="flex-1 p-3 rounded-xl bg-background border border-border/50 text-sm font-mono truncate">0x71C7656EC7ab88b098defB751B7401B5f6d8976F</code>
                  <Button variant="outline" size="icon" className="h-12 w-12 rounded-xl border-border/50 bg-card shrink-0">
                    <Copy size={16} />
                  </Button>
                </div>
                <p className="text-[10px] text-muted-foreground italic">Automatic payouts are processed every 24 hours to this address on the Celo Network.</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          {/* Share Block */}
          <Card className="border-border/50 bg-card overflow-hidden text-center">
            <div className="bg-primary/5 p-8 border-b border-border/50 flex flex-col items-center">
              <div className="h-48 w-48 bg-white p-4 rounded-3xl shadow-xl mb-6 relative group overflow-hidden">
                <QrCode size={152} className="text-black" />
                <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button variant="ghost" className="text-white font-bold gap-2">
                    <Copy size={18} />
                    Download PNG
                  </Button>
                </div>
              </div>
              <h3 className="text-xl font-bold font-display">Store QR Code</h3>
              <p className="text-xs text-muted-foreground pt-1">Scan to open storefront on mobile</p>
            </div>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Public Link</p>
                <p className="text-sm font-bold text-primary truncate">{storeUrl}</p>
              </div>
              <div className="flex gap-3 pt-2">
                <Button variant="outline" className="flex-1 rounded-xl font-bold gap-2">
                  <Copy size={16} />
                  Copy
                </Button>
                <Button className="flex-1 rounded-xl font-bold gap-2">
                  <Share2 size={16} />
                  Share
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="border-border/50 bg-card p-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground border-b border-border/50 pb-3 mb-4">Quick Insights</h3>
            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Profile Completion</p>
                  <p className="text-2xl font-bold font-display">85%</p>
                </div>
                <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: '85%' }} />
                </div>
              </div>
              <Separator className="bg-border/50" />
              <div className="space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Recent Activity</p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <p className="text-xs text-muted-foreground"><span className="font-bold text-foreground">Updated</span> store description</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <p className="text-xs text-muted-foreground"><span className="font-bold text-foreground">Verified</span> business email</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Account Logout (Mobile focused) */}
          <Card className="border-destructive/20 bg-destructive/5 lg:hidden">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="space-y-1">
                  <h3 className="font-bold">Sign Out</h3>
                  <p className="text-xs text-muted-foreground">Log out of your JesStore account on this device.</p>
                </div>
                <Button
                  variant="destructive"
                  className="w-full rounded-xl font-bold gap-2"
                  onClick={handleLogout}
                >
                  <LogOut size={16} />
                  Log Out
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
