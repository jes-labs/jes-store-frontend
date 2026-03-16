/**
 * Analytics types
 */

export interface DailySalesData {
  date: string;
  revenue: number; // in cents
  orderCount: number;
}

export interface TopProduct {
  productId: string;
  productName: string;
  quantitySold: number;
  revenue: number; // in cents
}

export interface PaymentMethodBreakdown {
  method: 'cash' | 'bank_transfer' | 'crypto';
  count: number;
  total: number; // in cents
}

export interface AnalyticsSummary {
  totalRevenue: number; // in cents
  totalOrders: number;
  averageOrderValue: number; // in cents
  topProducts: TopProduct[];
  paymentMethodBreakdown: PaymentMethodBreakdown[];
  dailySales: DailySalesData[];
  periodComparison: {
    revenueChange: number; // percentage
    orderChange: number; // percentage
  };
}

export interface AnalyticsFilters {
  startDate: string;
  endDate: string;
  groupBy?: 'daily' | 'weekly' | 'monthly';
}
