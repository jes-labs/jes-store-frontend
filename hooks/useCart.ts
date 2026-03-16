/**
 * useCart hook - provides cart state and actions from cart store
 */

import { useCartStore } from '@/store/cartStore';
import { Product } from '@/types/product';
import { PaymentMethod } from '@/types/order';

export const useCart = () => {
  const items = useCartStore((state) => state.items);
  const customerName = useCartStore((state) => state.customerName);
  const customerEmail = useCartStore((state) => state.customerEmail);
  const discount = useCartStore((state) => state.discount);
  const paymentMethod = useCartStore((state) => state.paymentMethod);

  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const setCustomerName = useCartStore((state) => state.setCustomerName);
  const setCustomerEmail = useCartStore((state) => state.setCustomerEmail);
  const setDiscount = useCartStore((state) => state.setDiscount);
  const setPaymentMethod = useCartStore((state) => state.setPaymentMethod);
  const clear = useCartStore((state) => state.clear);

  const subtotal = useCartStore((state) => state.subtotal());
  const total = useCartStore((state) => state.total());
  const itemCount = useCartStore((state) => state.itemCount());

  return {
    items,
    customerName,
    customerEmail,
    discount,
    paymentMethod,
    subtotal,
    total,
    itemCount,
    addItem: (product: Product, quantity: number) => addItem(product, quantity),
    removeItem,
    updateQuantity,
    setCustomerName,
    setCustomerEmail,
    setDiscount,
    setPaymentMethod: (method: PaymentMethod) => setPaymentMethod(method),
    clear,
    isEmpty: () => items.length === 0,
  };
};
