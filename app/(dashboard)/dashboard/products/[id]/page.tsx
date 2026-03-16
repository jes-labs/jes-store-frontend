'use client'

import { useParams } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ProductForm } from '@/components/features/products/ProductForm'

export default function EditProductPage() {
  const params = useParams()
  const id = params.id as string

  // In a real app, you would fetch actual data here
  // Mocking initial data for demonstration
  const mockInitialData = {
    name: "Jordan 1 Retro High OG",
    description: "The classic silhouette that started it all. Premium leather and timeless design.",
    price: 180,
    costPrice: 120,
    stock: 24,
    sku: "JES-123456",
    isActive: true,
    lowStockAlert: 5,
    categoryId: "footwear-01",
    images: ["https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=2070&auto=format&fit=crop"],
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild className="rounded-xl border border-border/50 bg-card">
          <Link href="/dashboard/products">
            <ChevronLeft size={20} />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold font-display">Edit Product</h1>
          <p className="text-sm text-muted-foreground uppercase tracking-widest font-bold text-[10px]">SKU: {mockInitialData.sku}</p>
        </div>
      </div>

      <ProductForm productId={id} initialData={mockInitialData} />
    </div>
  )
}
