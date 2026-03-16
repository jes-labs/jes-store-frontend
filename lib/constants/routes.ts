/**
 * All app route strings in one place for type-safe navigation
 */

export const ROUTES = {
  // Public routes
  HOME: '/',
  STORE: (storeId: string) => `/store/${storeId}`,
  RECEIPT: (receiptId: string) => `/receipts/${receiptId}`,

  // Auth routes
  // Sync with consolidated (auth) group structure
  AUTH: {
    LOGIN: '/login',
    REGISTER: '/register',
    FORGOT_PASSWORD: '/forgot-password',
    RESET_PASSWORD: (token: string) => `/reset-password?token=${token}`,
  },

  // Dashboard routes
  DASHBOARD: '/dashboard',
  DASHBOARD_OVERVIEW: '/dashboard',
  DASHBOARD_ANALYTICS: '/dashboard/analytics',

  // Store management
  STORE_SETTINGS: '/dashboard/settings',
  ACCOUNT_SETTINGS: '/dashboard/settings',

  // POS & Orders
  POS: '/dashboard/pos',
  PRODUCTS: '/dashboard/products',
  ORDERS: '/dashboard/orders',
  ORDER_DETAIL: (orderId: string) => `/dashboard/orders/${orderId}`,

  // Customers
  CUSTOMERS: '/dashboard/customers',
  CUSTOMER_DETAIL: (customerId: string) => `/dashboard/customers/${customerId}`,

  // Receipts
  RECEIPTS: '/dashboard/receipts',
  RECEIPTS_DETAIL: (receiptId: string) => `/dashboard/receipts/${receiptId}`,
};

export const PUBLIC_ROUTES = [
  ROUTES.HOME,
  /^\/store\/.+$/,
  /^\/receipts\/.+$/,
  ROUTES.AUTH.LOGIN,
  ROUTES.AUTH.REGISTER,
  ROUTES.AUTH.FORGOT_PASSWORD,
  /^\/reset-password/,
];

export const PROTECTED_ROUTES = [
  /^\/dashboard/,
];
