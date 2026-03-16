import { apiClient } from './client'
import { Order, CreateOrderPayload } from '@/types/order'
import { ApiResponse, PaginatedResponse } from '@/types/api'

/**
 * Order & Sales Service
 */
export const ordersApi = {
  /**
   * List orders for a store (paginated)
   */
  getOrders: async (params?: {
    page?: number;
    limit?: number;
    status?: string;
    customerId?: string;
    startDate?: string;
    endDate?: string;
  }): Promise<ApiResponse<PaginatedResponse<Order>>> => {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<Order>>>('/orders', { params })
    return response.data
  },

  /**
   * Get order details by ID
   */
  getOrder: async (id: string): Promise<ApiResponse<Order>> => {
    const response = await apiClient.get<ApiResponse<Order>>(`/api/orders/${id}`)
    return response.data
  },

  /**
   * Create a new order (Checkout)
   */
  createOrder: async (payload: CreateOrderPayload): Promise<ApiResponse<Order>> => {
    const response = await apiClient.post<ApiResponse<Order>>('/orders', payload)
    return response.data
  },

  /**
   * Update order status
   */
  updateStatus: async (id: string, status: Order['status']): Promise<ApiResponse<Order>> => {
    const response = await apiClient.patch<ApiResponse<Order>>(`/orders/${id}/status`, { status })
    return response.data
  },

  /**
   * Process payment for an order
   */
  processPayment: async (id: string, paymentDetails: any): Promise<ApiResponse<Order>> => {
    const response = await apiClient.post<ApiResponse<Order>>(`/orders/${id}/payment`, paymentDetails)
    return response.data
  },
}
