import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { storesApi } from '@/lib/api/stores'
import { CreateStorePayload, UpdateStorePayload } from '@/types/store'

export const storeKeys = {
  mine: () => ['stores', 'mine'] as const,
  detail: (id: string) => ['stores', id] as const,
  analytics: (id: string) => ['stores', id, 'analytics'] as const,
}

export const useMyStores = () => {
  return useQuery({
    queryKey: storeKeys.mine(),
    queryFn: () => storesApi.getMyStores(),
  })
}

export const useStore = (id: string) => {
  return useQuery({
    queryKey: storeKeys.detail(id),
    queryFn: () => storesApi.getStore(id),
    enabled: !!id,
  })
}

export const useCreateStore = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: CreateStorePayload) => storesApi.createStore(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: storeKeys.mine() })
    },
  })
}

export const useUpdateStore = (id: string) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: UpdateStorePayload) => storesApi.updateStore(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: storeKeys.detail(id) })
      queryClient.invalidateQueries({ queryKey: storeKeys.mine() })
    },
  })
}

export const useDeleteStore = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => storesApi.deleteStore(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: storeKeys.mine() })
    },
  })
}

export const useStoreAnalytics = (storeId: string | null) => {
  return useQuery({
    queryKey: storeKeys.analytics(storeId ?? ''),
    queryFn: () => storesApi.getAnalytics(storeId!),
    enabled: !!storeId,
    staleTime: 5 * 60 * 1000,
  })
}
