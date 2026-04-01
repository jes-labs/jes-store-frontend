import { apiClient } from './client'
import { Category } from '@/types/product'

/**
 * Category Service
 * Routes: /stores/:storeId/categories
 */
export const categoriesApi = {
  createCategory: async (storeId: string, payload: { name: string }): Promise<Category> => {
    const response = await apiClient.post<any>(`/stores/${storeId}/categories`, payload)
    return response.data?.category ?? response.data
  },

  getCategories: async (storeId: string): Promise<Category[]> => {
    const response = await apiClient.get<any>(`/stores/${storeId}/categories`)
    return response.data?.categories ?? response.data
  },
}
