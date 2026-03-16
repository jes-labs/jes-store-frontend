/**
 * Product types
 */

export interface Category {
  id: string;
  name: string;
  description?: string;
}

export interface Product {
  id: string;
  storeId: string;
  name: string;
  description?: string;
  categoryId: string;
  category: Category | string;
  price: number; // USDT amount in cents
  costPrice?: number;
  sku: string;
  barcode?: string;
  stock: number;
  lowStockAlert: number;
  image?: string; // IPFS/Pinata URL
  images?: string[];
  status: 'active' | 'inactive' | 'discontinued' | 'draft' | 'out_of_stock';
  isActive?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface StockAdjustment {
  id: string;
  productId: string;
  reason: 'restock' | 'damage' | 'return' | 'adjustment';
  quantity: number;
  notes?: string;
  createdAt: string;
}

export interface ProductFilters {
  categoryId?: string;
  status?: 'active' | 'inactive' | 'discontinued';
  search?: string;
  page?: number;
  limit?: number;
}
