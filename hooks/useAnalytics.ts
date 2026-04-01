import { useQuery } from '@tanstack/react-query'
import { storesApi } from '@/lib/api/stores'
import { storeKeys } from './useStores'
import { useActiveStore } from './useActiveStore'

/**
 * Fetch store analytics summary.
 * Analytics data is considered stale after 5 minutes.
 */
export const useAnalytics = () => {
  const storeId = useActiveStore()
  return useQuery({
    queryKey: storeKeys.analytics(storeId ?? ''),
    queryFn: () => storesApi.getAnalytics(storeId!),
    enabled: !!storeId,
    staleTime: 5 * 60 * 1000,
    retry: (failureCount, error: any) => {
      // Don't retry on 403 (wrong store) or 401 (not authenticated)
      const status = error?.response?.status
      if (status === 403 || status === 401) return false
      return failureCount < 2
    },
  })
}
