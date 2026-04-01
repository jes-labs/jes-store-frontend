import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { ordersApi } from '@/lib/api/orders'
import { CreateOrderPayload, OrderFilters } from '@/types/order'
import { useActiveStore } from './useActiveStore'

export const orderKeys = {
  all: (storeId: string) => ['orders', storeId] as const,
  list: (storeId: string, filters?: OrderFilters) => ['orders', storeId, 'list', filters] as const,
  detail: (storeId: string, id: string) => ['orders', storeId, id] as const,
  receipt: (storeId: string, orderId: string) => ['orders', storeId, orderId, 'receipt'] as const,
}

export const useOrders = (filters?: OrderFilters) => {
  const storeId = useActiveStore()
  return useQuery({
    queryKey: orderKeys.list(storeId ?? '', filters),
    queryFn: () => ordersApi.getOrders(storeId!, filters),
    enabled: !!storeId,
  })
}

export const useOrder = (id: string) => {
  const storeId = useActiveStore()
  return useQuery({
    queryKey: orderKeys.detail(storeId ?? '', id),
    queryFn: () => ordersApi.getOrder(storeId!, id),
    enabled: !!storeId && !!id,
  })
}

export const useCreateOrder = () => {
  const storeId = useActiveStore()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: CreateOrderPayload) => ordersApi.createOrder(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: orderKeys.all(storeId ?? '') })
    },
  })
}

export const useUpdateOrderStatus = () => {
  const storeId = useActiveStore()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      ordersApi.updateStatus(storeId!, id, status),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: orderKeys.detail(storeId ?? '', id) })
      queryClient.invalidateQueries({ queryKey: orderKeys.all(storeId ?? '') })
    },
  })
}

export const useOrderReceipt = (orderId: string) => {
  const storeId = useActiveStore()
  return useQuery({
    queryKey: orderKeys.receipt(storeId ?? '', orderId),
    queryFn: () => ordersApi.getOrderReceipt(storeId!, orderId),
    enabled: !!storeId && !!orderId,
  })
}
