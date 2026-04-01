import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { productsApi } from '@/lib/api/products'
import { Product, ProductFilters } from '@/types/product'
import { useActiveStore } from './useActiveStore'

export const productKeys = {
  all: (storeId: string) => ['products', storeId] as const,
  list: (storeId: string, filters?: ProductFilters) => ['products', storeId, 'list', filters] as const,
  detail: (storeId: string, id: string) => ['products', storeId, id] as const,
  lowStock: (storeId: string) => ['products', storeId, 'low-stock'] as const,
}

/**
 * Fetch products. Accepts an optional storeId override for public pages.
 * Falls back to the authenticated user's active store.
 */
export const useProducts = (storeIdOverride?: string, filters?: ProductFilters) => {
  const activeStoreId = useActiveStore()
  const storeId = storeIdOverride ?? activeStoreId
  return useQuery({
    queryKey: productKeys.list(storeId ?? '', filters),
    queryFn: () => productsApi.getProducts(storeId!, filters),
    enabled: !!storeId,
  })
}

export const useProduct = (id: string, storeIdOverride?: string) => {
  const activeStoreId = useActiveStore()
  const storeId = storeIdOverride ?? activeStoreId
  return useQuery({
    queryKey: productKeys.detail(storeId ?? '', id),
    queryFn: () => productsApi.getProduct(storeId!, id),
    enabled: !!storeId && !!id,
  })
}

export const useCreateProduct = () => {
  const storeId = useActiveStore()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: Partial<Product>) => productsApi.createProduct(storeId!, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.all(storeId ?? '') })
    },
  })
}

export const useUpdateProduct = (id: string) => {
  const storeId = useActiveStore()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: Partial<Product>) => productsApi.updateProduct(storeId!, id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.all(storeId ?? '') })
    },
  })
}

export const useDeleteProduct = () => {
  const storeId = useActiveStore()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => productsApi.deleteProduct(storeId!, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.all(storeId ?? '') })
    },
  })
}

export const useUpdateStock = () => {
  const storeId = useActiveStore()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, delta, reason }: { id: string; delta: number; reason?: string }) =>
      productsApi.updateStock(storeId!, id, delta, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.all(storeId ?? '') })
    },
  })
}

export const useLowStock = () => {
  const storeId = useActiveStore()
  return useQuery({
    queryKey: productKeys.lowStock(storeId ?? ''),
    queryFn: () => productsApi.getLowStock(storeId!),
    enabled: !!storeId,
  })
}
