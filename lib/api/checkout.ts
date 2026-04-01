import { apiClient } from './client'
import { Order } from '@/types/order'

export interface CheckoutPayload {
  cart_id: string;
  buyer_address: string;
  payment_method: 'crypto' | 'cash' | 'transfer' | 'card';
  transaction_hash?: string;
  discount_amount?: number;
}

/**
 * Storefront checkout — buyer-facing flow
 * Route: POST /checkout
 */
export const checkoutApi = {
  /**
   * Complete checkout from a cart.
   * For crypto payments, transaction_hash must be a real confirmed Celo tx.
   */
  checkout: async (payload: CheckoutPayload): Promise<Order> => {
    const response = await apiClient.post<Order>('/checkout', payload)
    return response.data
  },
}
