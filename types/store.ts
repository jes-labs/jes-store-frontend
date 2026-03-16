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
  ownerId: string;
  name: string;
  description?: string;
  logo?: string;
  walletAddress: string;
  country: string;
  city?: string;
  category?: string;
  settings: StoreSettings;
  createdAt: string;
  updatedAt: string;
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
