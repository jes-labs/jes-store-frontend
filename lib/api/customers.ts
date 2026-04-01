import { apiClient } from './client'
import { Customer, CustomerFilters } from '@/types/customer'

/**
 * Customer Management Service
 * All routes are store-scoped: /stores/:storeId/customers/...
 */
export const customersApi = {
  createCustomer: async (storeId: string, payload: Partial<Customer>): Promise<Customer> => {
    const response = await apiClient.post<any>(`/stores/${storeId}/customers`, payload)
    return response.data?.customer ?? response.data
  },

  getCustomers: async (storeId: string, params?: CustomerFilters): Promise<Customer[]> => {
    const response = await apiClient.get<any>(`/stores/${storeId}/customers`, { params })
    return response.data?.customers ?? response.data
  },

  getCustomer: async (storeId: string, id: string): Promise<Customer> => {
    const response = await apiClient.get<any>(`/stores/${storeId}/customers/${id}`)
    return response.data?.customer ?? response.data
  },
}
