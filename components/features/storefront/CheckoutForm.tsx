'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ShieldCheck, Truck, Mail, User, ArrowRight } from 'lucide-react'

const checkoutSchema = z.object({
  fullName: z.string().min(3, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  address: z.string().min(10, 'Delivery address is required'),
  notes: z.string().optional(),
})

type CheckoutValues = z.infer<typeof checkoutSchema>

interface CheckoutFormProps {
  onComplete: (data: CheckoutValues) => void
  total: number
}

export default function CheckoutForm({ onComplete, total }: CheckoutFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<CheckoutValues>({
    resolver: zodResolver(checkoutSchema)
  })

  return (
    <form onSubmit={handleSubmit(onComplete)} className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-widest text-primary flex items-center gap-2">
           <User size={14} /> Buyer Information
        </h3>
        <div className="space-y-4">
           <div className="space-y-2">
              <Label htmlFor="fullName" className="text-[10px] uppercase font-bold text-white/40">Full Name</Label>
              <div className="relative">
                 <User className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                 <Input 
                   id="fullName" 
                   {...register('fullName')}
                   className="pl-10 h-12 rounded-xl bg-white/5 border-white/10 focus:border-primary/50 transition-all" 
                   placeholder="Amara Okonkwo"
                 />
              </div>
              {errors.fullName && <p className="text-[10px] text-destructive">{errors.fullName.message}</p>}
           </div>

           <div className="space-y-2">
              <Label htmlFor="email" className="text-[10px] uppercase font-bold text-white/40">Email Address</Label>
              <div className="relative">
                 <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                 <Input 
                   id="email" 
                   type="email"
                   {...register('email')}
                   className="pl-10 h-12 rounded-xl bg-white/5 border-white/10 focus:border-primary/50 transition-all" 
                   placeholder="amara@example.com"
                 />
              </div>
              {errors.email && <p className="text-[10px] text-destructive">{errors.email.message}</p>}
           </div>
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t border-white/5">
        <h3 className="text-sm font-bold uppercase tracking-widest text-primary flex items-center gap-2">
           <Truck size={14} /> Delivery Details
        </h3>
        <div className="space-y-4">
           <div className="space-y-2">
              <Label htmlFor="address" className="text-[10px] uppercase font-bold text-white/40">Delivery Address</Label>
              <Textarea 
                id="address" 
                {...register('address')}
                className="min-h-[100px] rounded-xl bg-white/5 border-white/10 focus:border-primary/50 transition-all resize-none" 
                placeholder="123 Admiralty Way, Lekki Phase 1, Lagos"
              />
              {errors.address && <p className="text-[10px] text-destructive">{errors.address.message}</p>}
           </div>

           <div className="space-y-2">
              <Label htmlFor="notes" className="text-[10px] uppercase font-bold text-white/40">Order Notes (Optional)</Label>
              <Input 
                id="notes" 
                {...register('notes')}
                className="h-12 rounded-xl bg-white/5 border-white/10 focus:border-primary/50 transition-all" 
                placeholder="e.g. Please leave at the security gate"
              />
           </div>
        </div>
      </div>

      <div className="pt-6">
        <Button 
          type="submit"
          className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-black font-bold text-base shadow-lg glow-green flex items-center justify-center gap-3"
        >
           Proceed to Payment (${total.toFixed(2)}) <ArrowRight size={18} />
        </Button>
        <div className="flex items-center justify-center gap-2 mt-4 text-[10px] text-white/30 uppercase tracking-widest">
           <ShieldCheck size={12} className="text-green-500" /> Secure On-chain Checkout
        </div>
      </div>
    </form>
  )
}
