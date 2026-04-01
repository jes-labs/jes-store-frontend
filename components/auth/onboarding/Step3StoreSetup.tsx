'use client'

import React from 'react'
import { useOnboardingStore } from '@/store/onboardingStore'
import { useAuthStore } from '@/store/authStore'
import { storesApi } from '@/lib/api/stores'
import { toast } from 'sonner'
import { getApiErrorMessage } from '@/lib/utils/handleApiError'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from '@/components/ui/select'
import { ArrowLeft, ArrowRight, Camera, Instagram, Twitter, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const categories = [
  'Fashion & Clothing',
  'Electronics',
  'Food & Beverages',
  'Beauty & Health',
  'Home & Living',
  'Sports',
  'Books & Education',
  'Other',
]

export default function Step3StoreSetup() {
  const { data, updateData, nextStep, prevStep } = useOnboardingStore()
  const setActiveStoreId = useAuthStore((s) => s.setActiveStoreId)
  const [isLoading, setIsLoading] = React.useState(false)

  const handleFinishSetup = async () => {
    if (!data.category) return
    setIsLoading(true)
    try {
      const store = await storesApi.createStore({
        name: data.storeName,
        description: data.storeDescription || undefined,
        walletAddress: data.walletAddress,
        country: 'Nigeria',
      })
      setActiveStoreId(store.id)
      nextStep()
    } catch (error) {
      toast.error(getApiErrorMessage(error))
    } finally {
      setIsLoading(false)
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        updateData({ logo: reader.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="glass-card rounded-2xl p-8 sm:p-12 border border-white/8 shadow-2xl">
      <div className="mb-10">
        <div className="text-primary text-[10px] font-bold uppercase tracking-widest mb-2">Step 3 of 4</div>
        <h2 className="font-['Outfit'] font-bold text-3xl sm:text-4xl text-white tracking-tight leading-tight">
          Customize your storefront
        </h2>
        <p className="text-gray-400 mt-3 text-lg font-['Plus_Jakarta_Sans']">
          Make your store stand out and help customers find you on social media.
        </p>
      </div>

      <div className="space-y-8">
        {/* Logo Upload */}
        <div className="space-y-4">
          <Label className="text-gray-300 font-medium">Store Logo</Label>
          <div className="relative group overflow-hidden h-44 rounded-2xl border-2 border-dashed border-white/10 bg-white/5 transition-all duration-300 hover:border-primary/40 hover:bg-primary/5">
            {data.logo ? (
                <div className="relative w-full h-full flex items-center justify-center p-6">
                    <img 
                        src={data.logo} 
                        alt="Store Logo Preview" 
                        className="max-w-full max-h-full object-contain rounded-lg shadow-xl"
                    />
                    <button 
                        onClick={() => updateData({ logo: null })}
                        className="absolute top-4 right-4 p-2 bg-black/60 rounded-full text-white hover:bg-destructive transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            ) : (
                <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
                    <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <Camera className="w-6 h-6 text-gray-500 group-hover:text-primary" />
                    </div>
                    <p className="text-sm font-bold text-white">Upload store logo</p>
                    <p className="text-xs text-gray-500 mt-1">JPG, PNG, max 5MB</p>
                    <input 
                        type="file" 
                        className="hidden" 
                        accept="image/*"
                        onChange={handleFileUpload}
                    />
                </label>
            )}
          </div>
        </div>

        {/* Category Select */}
        <div className="space-y-4">
          <Label className="text-gray-300 font-medium">Business Category</Label>
          <Select 
            value={data.category} 
            onValueChange={(val) => updateData({ category: val })}
          >
            <SelectTrigger className="h-14 bg-white/5 border-white/10 rounded-xl px-6 text-base focus:ring-primary/30">
              <SelectValue placeholder="What do you sell?" />
            </SelectTrigger>
            <SelectContent className="bg-[#121212] border-white/10 text-white">
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat} className="focus:bg-primary/10 focus:text-primary">
                    {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Social Links */}
        <div className="space-y-4">
          <Label className="text-gray-300 font-medium">Social Links <span className="text-gray-600 text-[10px] uppercase font-bold ml-1">(Optional)</span></Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="relative">
                <Instagram className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <Input 
                    placeholder="Instagram handle"
                    value={data.socials.instagram}
                    onChange={(e) => updateData({ socials: { ...data.socials, instagram: e.target.value } })}
                    className="h-14 pl-12 bg-white/5 border-white/10 rounded-xl focus:border-primary"
                />
            </div>
            <div className="relative">
                <Twitter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <Input 
                    placeholder="Twitter handle"
                    value={data.socials.twitter}
                    onChange={(e) => updateData({ socials: { ...data.socials, twitter: e.target.value } })}
                    className="h-14 pl-12 bg-white/5 border-white/10 rounded-xl focus:border-primary"
                />
            </div>
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <Button 
            variant="ghost"
            onClick={prevStep}
            className="flex-1 h-14 rounded-xl text-gray-400 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span>Go Back</span>
          </Button>
          <Button
            onClick={handleFinishSetup}
            disabled={!data.category || isLoading}
            className="flex-[2] h-14 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold shadow-lg shadow-primary/20 transition-all group"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Creating store...</span>
              </div>
            ) : (
              <>
                <span>Finish Setup</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
