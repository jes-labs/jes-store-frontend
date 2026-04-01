'use client'

import { useState, useMemo } from 'react'
import { PageHeader } from '@/components/shared/PageHeader'
import { SearchInput } from '@/components/shared/SearchInput'
import { TableSkeleton } from '@/components/shared/LoadingSkeletons'
import { CustomerTable } from '@/components/features/customers/CustomerTable'
import { useCustomers } from '@/hooks/useCustomers'

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState('')

  const { data: customers = [], isLoading } = useCustomers()

  const filteredCustomers = useMemo(() => {
    return customers.filter((c: any) => {
      const name = c.full_name ?? c.name ?? ''
      const email = c.email ?? ''
      const q = searchQuery.toLowerCase()
      return name.toLowerCase().includes(q) || email.toLowerCase().includes(q)
    })
  }, [customers, searchQuery])

  return (
    <main className="space-y-8 animate-in fade-in duration-700">
      <PageHeader
        title="Customers"
        description="Manage your customer relationships"
      />

      <div className="max-w-md">
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search by name or email..."
        />
      </div>

      {isLoading ? (
        <TableSkeleton />
      ) : (
        <CustomerTable customers={filteredCustomers} />
      )}
    </main>
  )
}
