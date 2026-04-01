import { apiClient } from './client'
import { Order, CreateOrderPayload, OrderFilters } from '@/types/order'
import { Receipt } from '@/types/receipt'

/**
 * Order & Sales Service
 * Backend routes:
 *   POST  /orders                                (not store-scoped)
 *   GET   /stores/:storeId/orders
 *   GET   /stores/:storeId/orders/:id
 *   PATCH /stores/:storeId/orders/:id/status
 *   GET   /stores/:storeId/orders/:id/receipt
 */
export const ordersApi = {
  createOrder: async (payload: CreateOrderPayload): Promise<Order> => {
    const response = await apiClient.post<any>('/orders', payload)
    return response.data?.order ?? response.data
  },

  getOrders: async (storeId: string, params?: OrderFilters): Promise<Order[]> => {
    const response = await apiClient.get<any>(`/stores/${storeId}/orders`, { params })
    return response.data?.orders ?? response.data
  },

  getOrder: async (storeId: string, id: string): Promise<Order> => {
    const response = await apiClient.get<any>(`/stores/${storeId}/orders/${id}`)
    return response.data?.order ?? response.data
  },

  updateStatus: async (storeId: string, id: string, status: string): Promise<Order> => {
    const response = await apiClient.patch<any>(`/stores/${storeId}/orders/${id}/status`, { status })
    return response.data?.order ?? response.data
  },

  getOrderReceipt: async (storeId: string, orderId: string): Promise<Receipt> => {
    const response = await apiClient.get<any>(`/stores/${storeId}/orders/${orderId}/receipt`)
    return response.data?.receipt ?? response.data
  },
}
