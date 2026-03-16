'use client'

import React from 'react'
import { useOnboardingStore } from '@/store/onboardingStore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Step1StoreName() {
  const { data, updateData, nextStep } = useOnboardingStore()
  
  const toSlug = (name: string) =>
    name.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value
    updateData({ 
      storeName: name,
      storeSlug: toSlug(name)
    })
  }

  return (
    <div className="glass-card rounded-2xl p-8 sm:p-12 border border-white/8 shadow-2xl">
      <div className="mb-10">
        <div className="text-primary text-[10px] font-bold uppercase tracking-widest mb-2">Step 1 of 4</div>
        <h2 className="font-['Outfit'] font-bold text-3xl sm:text-4xl text-white tracking-tight leading-tight">
          What&apos;s your store called?
        </h2>
        <p className="text-gray-400 mt-3 text-lg font-['Plus_Jakarta_Sans']">
          This will be the name customers see when they visit your store.
        </p>
      </div>

      <div className="space-y-10">
        <div className="space-y-4">
          <div className="flex justify-between items-end">
            <Label htmlFor="storeName" className="text-gray-300 font-medium">Store Name</Label>
            <span className={cn(
                "text-[10px] font-mono",
                data.storeName.length > 50 ? 'text-destructive' : 'text-gray-600'
            )}>
                {data.storeName.length}/60
            </span>
          </div>
          <Input 
            id="storeName"
            value={data.storeName}
            onChange={handleChange}
            placeholder="e.g. Amara's Fashion"
            maxLength={60}
            className="h-16 text-xl px-6 bg-white/5 border-white/10 rounded-xl focus:border-primary focus:ring-primary/30"
          />
          
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 transition-all duration-300">
            <p className="text-xs text-gray-400 mb-1">Your store link will be:</p>
            <div className="flex items-center gap-1 font-mono text-sm">
                <span className="text-gray-500">jesstore.io/store/</span>
                <motion.span 
                    key={data.storeSlug}
                    initial={{ opacity: 0.5, y: -2 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-primary font-bold"
                >
                    {data.storeSlug || '[your-slug]'}
                </motion.span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Label htmlFor="storeDescription" className="text-gray-300 font-medium">Store Description (Optional)</Label>
          <Textarea 
            id="storeDescription"
            value={data.storeDescription}
            onChange={(e) => updateData({ storeDescription: e.target.value })}
            placeholder="Tell your customers what you sell..."
            className="min-h-[120px] bg-white/5 border-white/10 rounded-xl px-6 py-4 focus:border-primary focus:ring-primary/30 resize-none text-base"
          />
        </div>

        <Button 
          onClick={nextStep}
          disabled={data.storeName.length < 2}
          className="w-full h-16 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold text-lg shadow-lg shadow-primary/20 transition-all group"
        >
          <span>Continue</span>
          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
        
        <p className="text-center text-xs text-gray-500">
            Don&apos;t worry, you can change this later in settings.
        </p>
      </div>
    </div>
  )
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}
