'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/shared/PageHeader'
import { SearchInput } from '@/components/shared/SearchInput'


// Mock data
const mockCustomers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+234 (0) 801 234 5678',
    totalOrders: 5,
    totalSpent: 500.0,
    lastPurchase: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+234 (0) 802 345 6789',
    totalOrders: 3,
    totalSpent: 300.0,
    lastPurchase: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    phone: '+234 (0) 803 456 7890',
    totalOrders: 2,
    totalSpent: 150.0,
    lastPurchase: new Date(Date.now() - 172800000).toISOString(),
  },
]

import { useEffect } from 'react'
import { TableSkeleton } from '@/components/shared/LoadingSkeletons'
import { CustomerTable } from '@/components/features/customers/CustomerTable'

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  const filteredCustomers = mockCustomers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <main className="space-y-8 animate-in fade-in duration-700">
      <PageHeader
        title="Customers"
        description="Manage your customer relationships"
      />

      {/* Search */}
      <div className="max-w-md">
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search by name or email..."
        />
      </div>

      {/* Customers Table */}
      {isLoading ? (
        <TableSkeleton />
      ) : (
        <CustomerTable customers={filteredCustomers} />
      )}
    </main>
  )
}
