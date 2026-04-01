/**
 * Expense types
 */

export interface Expense {
  id: string;
  store_id: string;
  title: string;
  amount: string;
  category: string;
  note?: string;
  expense_date: string;
  created_at: string;
}

export interface CreateExpensePayload {
  title: string;
  amount: number;
  category: string;
  note?: string;
  expense_date?: string;
}
