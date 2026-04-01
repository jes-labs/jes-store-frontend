import { apiClient } from './client'

export interface CartItem {
  id: string;
  cart_id: string;
  product_id: string;
  quantity: number;
}

export interface CartResponse {
  cart: { id: string; user_id: string };
  items: CartItem[];
  item_count: number;
  total: string;
}

/**
 * Server-side cart for buyer storefront flow
 * Routes: POST /cart, GET /cart
 */
export const cartApi = {
  /**
   * Add a product to the cart (increments quantity if already present)
   */
  addToCart: async (productId: string, quantity: number): Promise<CartItem> => {
    const response = await apiClient.post<CartItem>('/cart', { product_id: productId, quantity })
    return response.data
  },

  /**
   * Get the current user's cart with items and total
   */
  getCart: async (): Promise<CartResponse> => {
    const response = await apiClient.get<CartResponse>('/cart')
    return response.data
  },
}
