import { apiClient } from './client'
import { Product } from '@/types/product'
import { ApiResponse, PaginatedResponse } from '@/types/api'

/**
 * Inventory Management Service
 */
export const productsApi = {
  /**
   * List all products for a store (paginated)
   */
  getProducts: async (params?: { 
    page?: number; 
    limit?: number; 
    search?: string;
    category?: string;
  }): Promise<ApiResponse<PaginatedResponse<Product>>> => {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<Product>>>('/api/products', { params })
    return response.data
  },

  /**
   * Get product details by ID
   */
  getProduct: async (id: string): Promise<ApiResponse<Product>> => {
    const response = await apiClient.get<ApiResponse<Product>>(`/api/products/${id}`)
    return response.data
  },

  /**
   * Create a new product
   */
  createProduct: async (payload: Partial<Product>): Promise<ApiResponse<Product>> => {
    const response = await apiClient.post<ApiResponse<Product>>('/api/products', payload)
    return response.data
  },

  /**
   * Update an existing product
   */
  updateProduct: async (id: string, payload: Partial<Product>): Promise<ApiResponse<Product>> => {
    const response = await apiClient.patch<ApiResponse<Product>>(`/api/products/${id}`, payload)
    return response.data
  },

  /**
   * Delete a product
   */
  deleteProduct: async (id: string): Promise<ApiResponse> => {
    const response = await apiClient.delete<ApiResponse>(`/api/products/${id}`)
    return response.data
  },
}
