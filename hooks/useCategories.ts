import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { categoriesApi } from '@/lib/api/categories'
import { useActiveStore } from './useActiveStore'

export const categoryKeys = {
  all: (storeId: string) => ['categories', storeId] as const,
}

export const useCategories = (storeIdOverride?: string) => {
  const activeStoreId = useActiveStore()
  const storeId = storeIdOverride ?? activeStoreId
  return useQuery({
    queryKey: categoryKeys.all(storeId ?? ''),
    queryFn: () => categoriesApi.getCategories(storeId!),
    enabled: !!storeId,
  })
}

export const useCreateCategory = () => {
  const storeId = useActiveStore()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (name: string) => categoriesApi.createCategory(storeId!, { name }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.all(storeId ?? '') })
    },
  })
}
