import { useQuery } from '@tanstack/react-query'
import { receiptsApi } from '@/lib/api/receipts'
import { useActiveStore } from './useActiveStore'

export const receiptKeys = {
  all: (storeId: string) => ['receipts', storeId] as const,
  detail: (id: string) => ['receipts', 'public', id] as const,
}

export const useStoreReceipts = () => {
  const storeId = useActiveStore()
  return useQuery({
    queryKey: receiptKeys.all(storeId ?? ''),
    queryFn: () => receiptsApi.getStoreReceipts(storeId!),
    enabled: !!storeId,
  })
}

/**
 * Fetch a single receipt by ID.
 * Works without authentication (public shareable link).
 */
export const useReceipt = (id: string) => {
  return useQuery({
    queryKey: receiptKeys.detail(id),
    queryFn: () => receiptsApi.getReceipt(id),
    enabled: !!id,
  })
}
