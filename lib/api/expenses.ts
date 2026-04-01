import { apiClient } from './client'
import { Expense, CreateExpensePayload } from '@/types/expense'

/**
 * Expense Tracking Service
 * Routes: /stores/:storeId/expenses
 */
export const expensesApi = {
  createExpense: async (storeId: string, payload: CreateExpensePayload): Promise<Expense> => {
    const response = await apiClient.post<any>(`/stores/${storeId}/expenses`, payload)
    return response.data?.expense ?? response.data
  },

  getExpenses: async (storeId: string): Promise<Expense[]> => {
    const response = await apiClient.get<any>(`/stores/${storeId}/expenses`)
    return response.data?.expenses ?? response.data
  },

  deleteExpense: async (storeId: string, id: string): Promise<void> => {
    await apiClient.delete(`/stores/${storeId}/expenses/${id}`)
  },
}
