'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/shared/PageHeader'
import { SearchInput } from '@/components/shared/SearchInput'
import { ReceiptCard } from '@/components/features/receipts/ReceiptCard'
import { useRouter } from 'next/navigation'

// Mock data
const mockReceipts = [
  {
    id: '1',
    receiptNo: 'RCP-20260315-00001',
    customerName: 'John Doe',
    date: new Date().toISOString(),
    amount: 125.5,
    paymentMethod: 'USDC (MiniPay)',
    chain: 'Polygon'
  },
  {
    id: '2',
    receiptNo: 'RCP-20260314-00002',
    customerName: 'Jane Smith',
    date: new Date(Date.now() - 86400000).toISOString(),
    amount: 75.0,
    paymentMethod: 'Cash',
  },
  {
    id: '3',
    receiptNo: 'RCP-20260313-00003',
    customerName: 'Mike Johnson',
    date: new Date(Date.now() - 172800000).toISOString(),
    amount: 250.75,
    paymentMethod: 'USDT',
    chain: 'Arbitrum'
  },
]

export default function ReceiptsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()

  const filteredReceipts = mockReceipts.filter(
    (receipt) =>
      receipt.receiptNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      receipt.customerName.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <main className="space-y-8 animate-in fade-in duration-500">
      <PageHeader
        title="Receipts"
        description="View and manage all transaction receipts"
      />

      {/* Search */}
      <div className="max-w-md">
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search by receipt # or customer..."
        />
      </div>

      {/* Receipts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReceipts.length === 0 ? (
          <div className="col-span-full text-center py-12 bg-muted/20 rounded-2xl border border-dashed border-border/50">
            <p className="text-muted-foreground font-medium italic">No receipts found</p>
          </div>
        ) : (
          filteredReceipts.map((receipt) => (
            <ReceiptCard 
              key={receipt.id} 
              receipt={receipt} 
              onView={(id) => router.push(`/dashboard/receipts/${id}`)}
            />
          ))
        )}
      </div>
    </main>
  )
}
