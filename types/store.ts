/**
 * Store types
 */

export interface StoreSettings {
  currencySymbol: string; // $, ₦ etc
  lowStockAlert: number; // threshold
  receiptFooter?: string;
  allowCryptoPayments: boolean;
  cryptoCurrencies: Array<'USDC' | 'cUSD' | 'USDT'>;
}

export interface Store {
  id: string;
  // camelCase (frontend-shaped)
  ownerId?: string;
  name?: string;
  walletAddress?: string;
  createdAt?: string;
  updatedAt?: string;
  // snake_case (backend response)
  store_name?: string;
  owner_address?: string;
  owner_id?: string;
  created_at?: string;
  updated_at?: string;
  // shared
  description?: string;
  logo?: string;
  country?: string;
  city?: string;
  category?: string;
  settings?: Partial<StoreSettings>;
}

export interface StoreState {
  name: string;
  currency: string;
  products: any[]; // Assuming 'any' for now as product type is not defined
  orders: any[];   // Assuming 'any' for now as order type is not defined
}

export const initialStoreState: StoreState = {
  name: "My Unnamed Store",
  currency: "USD",
  products: [],
  orders: [],
}

export interface CreateStorePayload {
  name: string;
  description?: string;
  walletAddress: string;
  country: string;
}

export interface UpdateStorePayload {
  name?: string;
  description?: string;
  logo?: string;
  category?: string;
  settings?: Partial<StoreSettings>;
}
