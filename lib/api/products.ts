import { apiClient } from './client'
import { Product, ProductFilters } from '@/types/product'

/**
 * Product/Inventory Service
 * All routes are store-scoped: /stores/:storeId/products/...
 */
export const productsApi = {
  getProducts: async (storeId: string, params?: ProductFilters): Promise<Product[]> => {
    const response = await apiClient.get<any>(`/stores/${storeId}/products`, { params })
    return response.data?.products ?? response.data
  },

  getProduct: async (storeId: string, id: string): Promise<Product> => {
    const response = await apiClient.get<any>(`/stores/${storeId}/products/${id}`)
    return response.data?.product ?? response.data
  },

  createProduct: async (storeId: string, payload: Partial<Product>): Promise<Product> => {
    const response = await apiClient.post<any>(`/stores/${storeId}/products`, payload)
    return response.data?.product ?? response.data
  },

  updateProduct: async (storeId: string, id: string, payload: Partial<Product>): Promise<Product> => {
    const response = await apiClient.put<any>(`/stores/${storeId}/products/${id}`, payload)
    return response.data?.product ?? response.data
  },

  updateStock: async (storeId: string, id: string, quantityDelta: number, reason?: string): Promise<Product> => {
    const response = await apiClient.patch<any>(`/stores/${storeId}/products/${id}/stock`, {
      quantity_delta: quantityDelta,
      reason,
    })
    return response.data?.product ?? response.data
  },

  getLowStock: async (storeId: string): Promise<Product[]> => {
    const response = await apiClient.get<any>(`/stores/${storeId}/low-stock`)
    return response.data?.products ?? response.data
  },

  deleteProduct: async (storeId: string, id: string): Promise<void> => {
    await apiClient.delete(`/stores/${storeId}/products/${id}`)
  },
}
