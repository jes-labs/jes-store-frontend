/**
 * Customer types
 */

export interface Customer {
  id: string;
  storeId: string;
  name: string;
  email?: string;
  phone?: string;
  walletAddress?: string;
  totalSpent: number; // in cents
  orderCount: number;
  notes?: string;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CustomerFilters {
  search?: string;
  sortBy?: 'name' | 'totalSpent' | 'orderCount' | 'createdAt';
  page?: number;
  limit?: number;
}
