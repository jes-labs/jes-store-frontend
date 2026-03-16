/**
 * Cart store - manages POS cart items, totals, and customer info
 */

import { create } from 'zustand';
import { Product } from '@/types/product';
import { PaymentMethod } from '@/types/order';

export interface CartItem {
  productId: string;
  product: Product;
  quantity: number;
}

interface CartStoreState {
  items: CartItem[];
  customerName: string;
  customerEmail: string;
  customerId?: string;
  discount: number;
  discountType: 'fixed' | 'percentage';
  discountValue: number;
  paymentMethod: PaymentMethod;
  selectedChain: string | null;

  // Actions
  addItem: (product: Product, quantity: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  setCustomer: (name: string, email: string, id?: string) => void;
  setCustomerName: (name: string) => void;
  setCustomerEmail: (email: string) => void;
  setDiscount: (type: 'fixed' | 'percentage', value: number) => void;
  setPaymentMethod: (method: PaymentMethod) => void;
  setSelectedChain: (chainId: string | null) => void;
  clear: () => void;

  // Computed values
  subtotal: () => number;
  total: () => number;
  itemCount: () => number;
  getDiscountAmount: () => number;
}

export const useCartStore = create<CartStoreState>((set, get) => ({
  items: [],
  customerName: '',
  customerEmail: '',
  customerId: undefined,
  discount: 0,
  discountType: 'fixed',
  discountValue: 0,
  paymentMethod: 'cash',
  selectedChain: null,

  addItem: (product: Product, quantity: number) => {
    set((state) => {
      const existingItem = state.items.find((item) => item.productId === product.id);

      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.productId === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      }

      return {
        items: [...state.items, { productId: product.id, product, quantity }],
      };
    });
  },

  removeItem: (productId: string) => {
    set((state) => ({
      items: state.items.filter((item) => item.productId !== productId),
    }));
  },

  updateQuantity: (productId: string, quantity: number) => {
    if (quantity <= 0) {
      get().removeItem(productId);
      return;
    }

    set((state) => ({
      items: state.items.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      ),
    }));
  },

  setCustomer: (name: string, email: string, id?: string) => {
    set({ customerName: name, customerEmail: email, customerId: id });
  },

  setCustomerName: (name: string) => {
    set({ customerName: name });
  },

  setCustomerEmail: (email: string) => {
    set({ customerEmail: email });
  },

  setDiscount: (type, value) => {
    set({ discountType: type, discountValue: Math.max(0, value), discount: Math.max(0, value) });
  },

  setPaymentMethod: (method: PaymentMethod) => {
    set({ paymentMethod: method });
  },

  setSelectedChain: (chainId: string | null) => {
    set({ selectedChain: chainId });
  },

  clear: () => {
    set({
      items: [],
      customerName: '',
      customerEmail: '',
      customerId: undefined,
      discountType: 'fixed',
      discountValue: 0,
      paymentMethod: 'cash',
      selectedChain: null,
    });
  },

  subtotal: () => {
    return get().items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  },

  getDiscountAmount: () => {
    const { discountType, discountValue, subtotal } = get();
    const sub = subtotal();
    if (discountType === 'percentage') {
      return (sub * discountValue) / 100;
    }
    return discountValue;
  },

  total: () => {
    const sub = get().subtotal();
    const discountAmount = get().getDiscountAmount();
    return Math.max(0, sub - discountAmount);
  },

  itemCount: () => {
    return get().items.reduce((sum, item) => sum + item.quantity, 0);
  },
}));
