'use client'

import { useParams } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ProductForm } from '@/components/features/products/ProductForm'
import { useProduct } from '@/hooks/useProducts'
import { TableSkeleton } from '@/components/shared/LoadingSkeletons'

export default function EditProductPage() {
  const params = useParams()
  const id = params.id as string

  const { data: product, isLoading, error } = useProduct(id)

  const initialData = product
    ? {
        name: product.product_name ?? product.name ?? '',
        description: product.description ?? '',
        price: typeof product.price === 'string' ? parseFloat(product.price) : (product.price ?? 0),
        costPrice: typeof product.cost_price === 'string' ? parseFloat(product.cost_price) : (product.cost_price ?? 0),
        stock: product.quantity ?? product.stock ?? 0,
        sku: product.sku ?? '',
        isActive: product.is_active ?? true,
        lowStockAlert: product.low_stock_alert ?? product.lowStockAlert ?? 5,
        categoryId: product.category_id ?? '',
        images: product.image_cid ? [`https://ipfs.io/ipfs/${product.image_cid}`] : (product.images ?? []),
      }
    : undefined

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
          {product && (
            <p className="text-sm text-muted-foreground uppercase tracking-widest font-bold text-[10px]">SKU: {product.sku}</p>
          )}
        </div>
      </div>

      {isLoading ? (
        <TableSkeleton />
      ) : error ? (
        <div className="text-center py-12 text-muted-foreground">Failed to load product.</div>
      ) : (
        <ProductForm productId={id} initialData={initialData} />
      )}
    </div>
  )
}
