'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { productSchema } from '@/lib/validations/product.schema'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent } from '@/components/ui/card'
import { z } from 'zod'

import { ProductImageUpload } from './ProductImageUpload'
import { Wand2, TrendingUp, Info } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

import { cn } from '@/lib/utils'
import { formatCurrency } from '@/lib/utils/currency'

type ProductFormValues = z.infer<typeof productSchema>

interface ProductFormProps {
  productId?: string
  initialData?: Partial<ProductFormValues>
}

export function ProductForm({ productId, initialData }: ProductFormProps) {
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: initialData || {
      name: '',
      description: '',
      price: 0,
      costPrice: 0,
      stock: 0,
      sku: '',
      isActive: true,
      lowStockAlert: 5,
      categoryId: '',
      images: [],
    },
  })

  const price = form.watch('price')
  const costPrice = form.watch('costPrice')
  const margin = price > 0 ? ((price - costPrice) / price) * 100 : 0
  const profit = price - costPrice

  function generateSku() {
    const random = Math.floor(100000 + Math.random() * 900000)
    form.setValue('sku', `JES-${random}`, { shouldValidate: true })
  }

  function onSubmit(values: ProductFormValues) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Section 1: Basic Info */}
            <Card className="border-border/50 bg-card">
              <CardContent className="p-6 space-y-6">
                <div className="space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                    <Info size={14} />
                    Basic Information
                  </h3>
                  <Separator className="bg-border/50" />
                </div>

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground px-1">Product Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Jordan 1 Retro" {...field} className="h-12 bg-muted/20 border-transparent focus:bg-background transition-all rounded-xl" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground px-1">Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell customers about this product..." 
                          className="min-h-[120px] bg-muted/20 border-transparent focus:bg-background transition-all rounded-xl resize-none"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="categoryId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground px-1">Category</FormLabel>
                        <FormControl>
                          <Input placeholder="Select category..." {...field} className="h-12 bg-muted/20 border-transparent focus:bg-background transition-all rounded-xl" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="sku"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex justify-between items-center mb-1">
                          <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground px-1">SKU / ID</FormLabel>
                          <Button 
                            type="button" 
                            variant="link" 
                            onClick={generateSku}
                            className="h-auto p-0 text-[10px] font-bold uppercase tracking-widest text-primary gap-1"
                          >
                            <Wand2 size={10} />
                            Generate
                          </Button>
                        </div>
                        <FormControl>
                          <Input placeholder="JES-000000" {...field} className="h-12 font-mono bg-muted/20 border-transparent focus:bg-background transition-all rounded-xl" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Section 2: Pricing */}
            <Card className="border-border/50 bg-card overflow-hidden">
              <CardContent className="p-6 space-y-6">
                <div className="space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                    <TrendingUp size={14} />
                    Pricing & Profit
                  </h3>
                  <Separator className="bg-border/50" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground px-1">Selling Price (USDT)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              {...field} 
                              onChange={e => field.onChange(parseFloat(e.target.value) || 0)}
                              className="h-14 bg-muted/20 border-transparent focus:bg-background transition-all font-mono font-bold text-xl rounded-2xl" 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="costPrice"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground px-1">Cost Price (USDT)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              {...field} 
                              onChange={e => field.onChange(parseFloat(e.target.value) || 0)}
                              className="h-14 bg-muted/20 border-transparent focus:bg-background transition-all font-mono rounded-2xl" 
                            />
                          </FormControl>
                          <FormDescription className="text-[9px] uppercase font-medium pt-1">Used for private profit calculation</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="bg-muted/30 rounded-3xl p-6 flex flex-col justify-center gap-4 border border-border/30">
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Estimated Profit</p>
                      <p className={cn("text-3xl font-bold font-display tabular-nums leading-none", profit >= 0 ? "text-green-500" : "text-red-500")}>
                        {formatCurrency(profit, 'USDT')}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Profit Margin</p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-muted-foreground/10 rounded-full overflow-hidden">
                          <div 
                            className={cn("h-full transition-all duration-1000", margin > 0 ? "bg-green-500" : "bg-red-500")}
                            style={{ width: `${Math.min(Math.max(margin, 0), 100)}%` }}
                          />
                        </div>
                        <span className={cn("text-sm font-bold font-mono min-w-[3rem] text-right", margin > 0 ? "text-green-500" : "text-red-500")}>
                          {margin.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Section 3: Inventory */}
            <Card className="border-border/50 bg-card p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-6">
                <FormField
                  control={form.control}
                  name="stock"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground px-1">Current Stock</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          {...field} 
                          onChange={e => field.onChange(parseInt(e.target.value) || 0)}
                          className="h-12 bg-muted/20 border-transparent focus:bg-background transition-all font-mono font-bold rounded-xl" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lowStockAlert"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground px-1">Alert Threshold</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          {...field} 
                          onChange={e => field.onChange(parseInt(e.target.value) || 0)}
                          className="h-12 bg-muted/20 border-transparent focus:bg-background transition-all font-mono rounded-xl" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-2xl border border-border/50 p-5 bg-muted/10">
                    <div className="space-y-0.5">
                      <FormLabel className="text-sm font-bold">Public Visibility</FormLabel>
                      <FormDescription className="text-[10px] text-muted-foreground uppercase tracking-tight">
                        Display this product on your public storefront
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </Card>
          </div>

          <div className="space-y-8">
            <Card className="border-border/50 bg-card p-6">
              <FormField
                control={form.control}
                name="images"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <ProductImageUpload 
                        value={field.value?.[0]} 
                        onChange={(url) => field.onChange(url ? [url] : [])} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Card>

            <div className="sticky top-24 space-y-4">
              <Button type="submit" size="lg" className="w-full h-14 rounded-2xl font-bold tracking-tight text-lg shadow-xl shadow-primary/20">
                {productId ? 'Update Product' : 'Add to Catalog'}
              </Button>
              <Button type="button" variant="ghost" className="w-full text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Discard Changes
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  )
}
