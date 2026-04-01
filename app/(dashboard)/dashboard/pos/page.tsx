'use client'

import React, { useState } from 'react'
import { PageHeader } from '@/components/shared/PageHeader'
import { ProductGrid } from '@/components/features/pos/ProductGrid'
import { CartPanel } from '@/components/features/pos/CartPanel'
import { ReceiptModal } from '@/components/features/pos/ReceiptModal'
import { useCartStore } from '@/store/cartStore'
import { useAuthStore } from '@/store/authStore'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { useProducts } from '@/hooks/useProducts'
import { useCreateOrder } from '@/hooks/useOrders'
import { toast } from 'sonner'
import { getApiErrorMessage } from '@/lib/utils/handleApiError'

export default function PosPage() {
  const { items, total, customerName, paymentMethod, clear } = useCartStore()
  const activeStoreId = useAuthStore((s) => s.activeStoreId)
  const [isReceiptOpen, setIsReceiptOpen] = useState(false)
  const [lastOrder, setLastOrder] = useState<any>(null)

  const { data: products = [], isLoading } = useProducts()
  const { mutate: createOrder, isPending } = useCreateOrder()

  // Map backend products to the shape ProductGrid expects
  const posProducts = products.map((p: any) => ({
    id: p.id,
    name: p.product_name ?? p.name ?? '',
    sku: p.sku ?? '',
    price: typeof p.price === 'string' ? parseFloat(p.price) : (p.price ?? 0),
    category: typeof p.category === 'string' ? p.category : (p.category?.name ?? ''),
    stock: p.quantity ?? p.stock ?? 0,
    images: p.image_cid ? [p.image_cid] : [],
    lowStockAlert: p.low_stock_alert ?? p.lowStockAlert ?? 5,
    status: p.is_active ? 'active' : 'inactive',
    isActive: p.is_active ?? true,
    storeId: p.store_id ?? activeStoreId ?? '',
    categoryId: p.category_id ?? '',
    createdAt: p.created_at ?? new Date().toISOString(),
    updatedAt: p.updated_at ?? new Date().toISOString(),
  }))

  const handleCompleteSale = () => {
    if (items.length === 0) return

    const payload = {
      store_id: activeStoreId,
      customer_id: null,
      items: items.map(item => ({
        product_id: item.product.id,
        quantity: item.quantity,
      })),
      discount_amount: 0,
      payment_method: paymentMethod ?? 'cash',
      notes: customerName ? `Customer: ${customerName}` : undefined,
    }

    createOrder(payload as any, {
      onSuccess: (order: any) => {
        const receiptData = {
          id: order.id,
          reference: order.order_ref,
          customerName: customerName || 'Walk-in customer',
          total: total(),
          paymentMethod,
          date: order.created_at,
          items: items.map(item => ({
            name: item.product.name,
            quantity: item.quantity,
            price: item.product.price,
          })),
        }
        setLastOrder(receiptData)
        setIsReceiptOpen(true)
        clear()
        toast.success('Sale recorded!')
      },
      onError: (err) => toast.error(getApiErrorMessage(err)),
    })
  }

  return (
    <div className="flex flex-col space-y-8 animate-in fade-in duration-1000 pb-20">
      {/* Sticky Header */}
      <div className="sticky top-0 z-40 -mx-4 md:-mx-6 lg:-mx-8 px-4 md:px-6 lg:px-8 py-4 bg-background/80 backdrop-blur-xl border-b border-border/50 transition-all duration-300">
        <div className="flex items-center justify-between gap-4 max-w-[1600px] mx-auto">
          <PageHeader
            title="Terminal POS"
            description="In-person sales terminal."
          />

          <Sheet>
            <SheetTrigger asChild>
              <Button className="rounded-2xl h-12 px-6 bg-primary text-black font-black uppercase tracking-[0.2em] text-[10px] gap-3 shadow-xl shadow-primary/20 hover:shadow-primary/40 active:scale-95 transition-all">
                terminal POS
                <div className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
                <Badge variant="secondary" className="bg-black/10 border-none font-mono font-black ml-1 text-[8px] h-4">
                  {items.length}
                </Badge>
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md bg-[#080808] border-l border-white/5 p-0 overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)] flex flex-col">
              <SheetHeader className="sr-only">
                <SheetTitle>Active Order Terminal</SheetTitle>
              </SheetHeader>
              <CartPanel onComplete={handleCompleteSale} isLoading={isPending} />
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto w-full">
        <ProductGrid products={posProducts} isLoading={isLoading} />
      </div>

      {lastOrder && (
        <ReceiptModal
          isOpen={isReceiptOpen}
          onClose={() => setIsReceiptOpen(false)}
          order={lastOrder}
        />
      )}
    </div>
  )
}
