import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { expensesApi } from '@/lib/api/expenses'
import { CreateExpensePayload } from '@/types/expense'
import { useActiveStore } from './useActiveStore'

export const expenseKeys = {
  all: (storeId: string) => ['expenses', storeId] as const,
}

export const useExpenses = () => {
  const storeId = useActiveStore()
  return useQuery({
    queryKey: expenseKeys.all(storeId ?? ''),
    queryFn: () => expensesApi.getExpenses(storeId!),
    enabled: !!storeId,
  })
}

export const useCreateExpense = () => {
  const storeId = useActiveStore()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: CreateExpensePayload) => expensesApi.createExpense(storeId!, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: expenseKeys.all(storeId ?? '') })
    },
  })
}

export const useDeleteExpense = () => {
  const storeId = useActiveStore()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => expensesApi.deleteExpense(storeId!, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: expenseKeys.all(storeId ?? '') })
    },
  })
}
