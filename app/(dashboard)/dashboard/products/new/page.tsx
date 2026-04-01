'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { PageHeader } from '@/components/shared/PageHeader'
import { ArrowLeft } from 'lucide-react'
import { ProductForm } from '@/components/features/products/ProductForm'

export default function NewProductPage() {
  return (
    <main className="space-y-8">
      <PageHeader
        title="Add New Product"
        action={
          <Link href="/dashboard/products">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </Link>
        }
      />

      <ProductForm />
    </main>
  )
}
