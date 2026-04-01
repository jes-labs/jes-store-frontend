'use client'

import { useState, useMemo } from 'react'
import { PageHeader } from '@/components/shared/PageHeader'
import { SearchInput } from '@/components/shared/SearchInput'
import { ReceiptCard } from '@/components/features/receipts/ReceiptCard'
import { useRouter } from 'next/navigation'
import { useStoreReceipts } from '@/hooks/useReceipts'
import { TableSkeleton } from '@/components/shared/LoadingSkeletons'

export default function ReceiptsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()

  const { data: receipts = [], isLoading } = useStoreReceipts()

  const filtered = useMemo(() => {
    return receipts.filter((r: any) => {
      const num = r.receipt_number ?? r.receiptNumber ?? ''
      const name = r.customer_name ?? r.customerName ?? ''
      const q = searchQuery.toLowerCase()
      return num.toLowerCase().includes(q) || name.toLowerCase().includes(q)
    })
  }, [receipts, searchQuery])

  // Map backend receipt to ReceiptCard's expected shape
  const mappedReceipts = filtered.map((r: any) => ({
    id: r.id,
    receiptNo: r.receipt_number ?? r.receiptNumber,
    customerName: r.customer_name ?? r.customerName ?? '—',
    date: r.issued_at ?? r.createdAt,
    amount: typeof r.total_amount === 'string' ? parseFloat(r.total_amount) : (r.total ?? 0),
    paymentMethod: r.payment_method ?? 'cash',
  }))

  return (
    <main className="space-y-8 animate-in fade-in duration-500">
      <PageHeader
        title="Receipts"
        description="View and manage all transaction receipts"
      />

      <div className="max-w-md">
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search by receipt # or customer..."
        />
      </div>

      {isLoading ? (
        <TableSkeleton />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mappedReceipts.length === 0 ? (
            <div className="col-span-full text-center py-12 bg-muted/20 rounded-2xl border border-dashed border-border/50">
              <p className="text-muted-foreground font-medium italic">No receipts found</p>
            </div>
          ) : (
            mappedReceipts.map((receipt) => (
              <ReceiptCard
                key={receipt.id}
                receipt={receipt}
                onView={(id) => router.push(`/dashboard/receipts/${id}`)}
              />
            ))
          )}
        </div>
      )}
    </main>
  )
}
