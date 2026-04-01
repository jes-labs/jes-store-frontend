import { apiClient } from './client'
import { Receipt } from '@/types/receipt'

/**
 * Receipt Service
 * Routes:
 *   GET /stores/:storeId/receipts  (authenticated)
 *   GET /receipts/:id              (public — no auth required)
 */
export const receiptsApi = {
  getStoreReceipts: async (storeId: string): Promise<Receipt[]> => {
    const response = await apiClient.get<any>(`/stores/${storeId}/receipts`)
    return response.data?.receipts ?? response.data
  },

  getReceipt: async (id: string): Promise<Receipt> => {
    const response = await apiClient.get<any>(`/receipts/${id}`, {
      headers: { Authorization: '' },
    })
    return response.data?.receipt ?? response.data
  },
}
