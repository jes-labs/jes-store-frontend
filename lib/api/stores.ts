import { apiClient } from './client'
import { Store } from '@/types/store'
import { ApiResponse } from '@/types/api'

/**
 * Store Management Service
 */
export const storesApi = {
  /**
   * Get store details by ID or slug
   */
  getStore: async (idOrSlug: string): Promise<ApiResponse<Store>> => {
    const response = await apiClient.get<ApiResponse<Store>>(`/stores/${idOrSlug}`)
    return response.data
  },

  /**
   * Update store settings
   */
  updateStore: async (id: string, payload: Partial<Store>): Promise<ApiResponse<Store>> => {
    const response = await apiClient.patch<ApiResponse<Store>>(`/stores/${id}`, payload)
    return response.data
  },

  /**
   * Upload store logo
   */
  uploadLogo: async (id: string, file: File): Promise<ApiResponse<{ url: string }>> => {
    const formData = new FormData()
    formData.append('file', file)
    const response = await apiClient.post<ApiResponse<{ url: string }>>(`/stores/${id}/logo`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },

  /**
   * Get store analytics summary
   */
  getAnalytics: async (id: string): Promise<ApiResponse<any>> => {
    const response = await apiClient.get<ApiResponse<any>>(`/stores/${id}/analytics`)
    return response.data
  },
}
