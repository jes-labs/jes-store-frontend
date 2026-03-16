/**
 * React Query cache key factory
 * Provides a centralized place to manage all query keys
 */

export const queryKeys = {
  // Auth
  auth: {
    all: ['auth'] as const,
    user: () => [...queryKeys.auth.all, 'user'] as const,
    session: () => [...queryKeys.auth.all, 'session'] as const,
  },

  // Store
  store: {
    all: ['store'] as const,
    detail: (storeId: string) => [...queryKeys.store.all, 'detail', storeId] as const,
    settings: (storeId: string) => [...queryKeys.store.all, 'settings', storeId] as const,
  },

  // Products
  products: {
    all: ['products'] as const,
    list: (storeId: string, filters?: Record<string, unknown>) => [
      ...queryKeys.products.all,
      'list',
      storeId,
      filters,
    ] as const,
    detail: (productId: string) => [...queryKeys.products.all, 'detail', productId] as const,
    categories: (storeId: string) => [...queryKeys.products.all, 'categories', storeId] as const,
  },

  // Orders
  orders: {
    all: ['orders'] as const,
    list: (storeId: string, filters?: Record<string, unknown>) => [
      ...queryKeys.orders.all,
      'list',
      storeId,
      filters,
    ] as const,
    detail: (orderId: string) => [...queryKeys.orders.all, 'detail', orderId] as const,
  },

  // Customers
  customers: {
    all: ['customers'] as const,
    list: (storeId: string, filters?: Record<string, unknown>) => [
      ...queryKeys.customers.all,
      'list',
      storeId,
      filters,
    ] as const,
    detail: (customerId: string) => [...queryKeys.customers.all, 'detail', customerId] as const,
  },

  // Receipts
  receipts: {
    all: ['receipts'] as const,
    list: (storeId: string, filters?: Record<string, unknown>) => [
      ...queryKeys.receipts.all,
      'list',
      storeId,
      filters,
    ] as const,
    detail: (receiptId: string) => [...queryKeys.receipts.all, 'detail', receiptId] as const,
    public: (receiptId: string) => [...queryKeys.receipts.all, 'public', receiptId] as const,
  },

  // Analytics
  analytics: {
    all: ['analytics'] as const,
    summary: (storeId: string, filters?: Record<string, unknown>) => [
      ...queryKeys.analytics.all,
      'summary',
      storeId,
      filters,
    ] as const,
  },
};
