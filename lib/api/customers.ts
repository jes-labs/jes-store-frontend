import { apiClient } from './client'
import { Customer } from '@/types/customer'
import { ApiResponse, PaginatedResponse } from '@/types/api'

/**
 * Customer Management Service
 */
export const customersApi = {
  /**
   * List customers for a merchant (paginated)
   */
  getCustomers: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<ApiResponse<PaginatedResponse<Customer>>> => {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<Customer>>>('/customers', { params })
    return response.data
  },

  /**
   * Get customer details by ID
   */
  getCustomer: async (id: string): Promise<ApiResponse<Customer>> => {
    const response = await apiClient.get<ApiResponse<Customer>>(`/api/customers/${id}`)
    return response.data
  },

  /**
   * Update customer profile
   */
  updateCustomer: async (id: string, payload: Partial<Customer>): Promise<ApiResponse<Customer>> => {
    const response = await apiClient.patch<ApiResponse<Customer>>(`/customers/${id}`, payload)
    return response.data
  },

  /**
   * Get customer purchase history
   */
  getHistory: async (id: string): Promise<ApiResponse<any>> => {
    const response = await apiClient.get<ApiResponse<any>>(`/customers/${id}/history`)
    return response.data
  },
}
