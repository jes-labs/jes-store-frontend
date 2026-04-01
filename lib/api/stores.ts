import { apiClient } from './client'
import { Store, CreateStorePayload, UpdateStorePayload } from '@/types/store'

/**
 * Store Management Service
 * Backend routes:
 *   GET    /stores/mine
 *   POST   /stores
 *   GET    /stores/:id
 *   PUT    /stores/:id
 *   DELETE /stores/:id
 *   GET    /stores/:id/analytics
 */
export const storesApi = {
  /**
   * Get all stores owned by the authenticated user
   */
  getMyStores: async (): Promise<Store[]> => {
    const response = await apiClient.get<any>('/stores/mine')
    return response.data?.stores ?? response.data
  },

  /**
   * Create a new store
   */
  createStore: async (payload: CreateStorePayload): Promise<Store> => {
    const body = {
      store_name: payload.name,
      description: payload.description,
      owner_address: payload.walletAddress?.toLowerCase(),
      country: payload.country,
    }
    const response = await apiClient.post<any>('/stores', body)
    return response.data?.store ?? response.data
  },

  /**
   * Get a store by ID (public)
   */
  getStore: async (id: string): Promise<Store> => {
    const response = await apiClient.get<any>(`/stores/${id}`)
    return response.data?.store ?? response.data
  },

  /**
   * Update store details (owner only)
   */
  updateStore: async (id: string, payload: UpdateStorePayload): Promise<Store> => {
    const response = await apiClient.put<any>(`/stores/${id}`, payload)
    return response.data?.store ?? response.data
  },

  /**
   * Delete a store (owner only)
   */
  deleteStore: async (id: string): Promise<void> => {
    await apiClient.delete(`/stores/${id}`)
  },

  /**
   * Get analytics summary for a store
   */
  getAnalytics: async (storeId: string): Promise<any> => {
    const response = await apiClient.get<any>(`/stores/${storeId}/analytics`)
    return response.data?.analytics ?? response.data
  },
}
