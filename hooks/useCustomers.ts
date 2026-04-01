import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { customersApi } from '@/lib/api/customers'
import { Customer, CustomerFilters } from '@/types/customer'
import { useActiveStore } from './useActiveStore'

export const customerKeys = {
  all: (storeId: string) => ['customers', storeId] as const,
  list: (storeId: string, filters?: CustomerFilters) => ['customers', storeId, 'list', filters] as const,
  detail: (storeId: string, id: string) => ['customers', storeId, id] as const,
}

export const useCustomers = (filters?: CustomerFilters) => {
  const storeId = useActiveStore()
  return useQuery({
    queryKey: customerKeys.list(storeId ?? '', filters),
    queryFn: () => customersApi.getCustomers(storeId!, filters),
    enabled: !!storeId,
  })
}

export const useCustomer = (id: string) => {
  const storeId = useActiveStore()
  return useQuery({
    queryKey: customerKeys.detail(storeId ?? '', id),
    queryFn: () => customersApi.getCustomer(storeId!, id),
    enabled: !!storeId && !!id,
  })
}

export const useCreateCustomer = () => {
  const storeId = useActiveStore()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: Partial<Customer>) => customersApi.createCustomer(storeId!, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: customerKeys.all(storeId ?? '') })
    },
  })
}
