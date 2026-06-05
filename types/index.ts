export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  description: string;
  category: string;
  date: string;
}

export interface AppState {
  balance: number;
  transactions: Transaction[];
  income: number;
  expense: number;
}

export type AppAction =
  | { type: 'SET_BALANCE'; payload: number }
  | { type: 'ADD_TRANSACTION'; payload: Transaction }
  | { type: 'DELETE_TRANSACTION'; payload: string }
  | { type: 'UPDATE_TRANSACTION'; payload: Transaction }
  | { type: 'RESET_DATA' };

export interface AppContextType {
  state: AppState;
  setBalance: (balance: number) => void;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  deleteTransaction: (id: string) => void;
  updateTransaction: (transaction: Transaction) => void;
  resetData: () => void;
  formatCurrency: (amount: number) => string;
}
