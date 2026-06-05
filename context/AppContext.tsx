import React, { createContext, useContext, useReducer, useEffect, useState, ReactNode } from 'react';
import { AppState as AppStateType, AppContextType, AppAction, Transaction } from '../types';
import { database } from '../database/sqlite';

const initialState: AppStateType = {
  balance: 0,
  transactions: [],
  income: 0,
  expense: 0,
};

function calculateTotals(transactions: Transaction[]): { income: number; expense: number } {
  return transactions.reduce(
    (acc, transaction) => ({
      income: acc.income + (transaction.type === 'income' ? transaction.amount : 0),
      expense: acc.expense + (transaction.type === 'expense' ? transaction.amount : 0),
    }),
    { income: 0, expense: 0 }
  );
}

function appReducer(state: AppStateType, action: AppAction): AppStateType {
  switch (action.type) {
    case 'SET_BALANCE': {
      const newBalance = action.payload;
      return { ...state, balance: newBalance };
    }
    case 'ADD_TRANSACTION': {
      const newTransactions = [action.payload, ...state.transactions];
      const totals = calculateTotals(newTransactions);
      const newBalance = state.balance + (action.payload.type === 'income' ? action.payload.amount : -action.payload.amount);
      return {
        ...state,
        transactions: newTransactions,
        income: totals.income,
        expense: totals.expense,
        balance: newBalance,
      };
    }
    case 'DELETE_TRANSACTION': {
      const transactionToDelete = state.transactions.find(t => t.id === action.payload);
      if (!transactionToDelete) return state;
      
      const newTransactions = state.transactions.filter(t => t.id !== action.payload);
      const totals = calculateTotals(newTransactions);
      const newBalance = state.balance - (transactionToDelete.type === 'income' ? transactionToDelete.amount : -transactionToDelete.amount);
      
      return {
        ...state,
        transactions: newTransactions,
        income: totals.income,
        expense: totals.expense,
        balance: newBalance,
      };
    }
    case 'UPDATE_TRANSACTION': {
      const oldTransaction = state.transactions.find(t => t.id === action.payload.id);
      if (!oldTransaction) return state;
      
      const newTransactions = state.transactions.map(t =>
        t.id === action.payload.id ? action.payload : t
      );
      const totals = calculateTotals(newTransactions);
      const balanceDiff = (action.payload.type === 'income' ? action.payload.amount : -action.payload.amount) -
                         (oldTransaction.type === 'income' ? oldTransaction.amount : -oldTransaction.amount);
      
      return {
        ...state,
        transactions: newTransactions,
        income: totals.income,
        expense: totals.expense,
        balance: state.balance + balanceDiff,
      };
    }
    case 'RESET_DATA': {
      return initialState;
    }
    default:
      return state;
  }
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize database and load data on mount
  useEffect(() => {
    async function loadData() {
      try {
        await database.initialize();
        
        const balance = await database.getBalance();
        const transactions = await database.getAllTransactions();
        
        dispatch({ type: 'SET_BALANCE', payload: balance });
        
        // Add all transactions (they will be added in reverse order, but that's okay)
        for (const transaction of transactions) {
          dispatch({ 
            type: 'ADD_TRANSACTION', 
            payload: {
              id: transaction.id,
              type: transaction.type,
              amount: transaction.amount,
              description: transaction.description,
              category: transaction.category,
              date: transaction.date,
            }
          });
        }
        
        setIsInitialized(true);
      } catch (error) {
        console.error('Failed to initialize database:', error);
        setIsInitialized(true);
      }
    }
    
    loadData();
  }, []);

  // Persist balance to database when it changes
  useEffect(() => {
    if (isInitialized) {
      database.setBalance(state.balance).catch(console.error);
    }
  }, [state.balance, isInitialized]);

  // Sync transactions to database
  const addTransaction = async (transaction: Omit<Transaction, 'id'>) => {
    const id = Date.now().toString();
    const newTransaction: Transaction = { ...transaction, id };
    
    await database.addTransaction({
      id,
      type: transaction.type,
      amount: transaction.amount,
      description: transaction.description,
      category: transaction.category,
      date: transaction.date,
    });
    
    dispatch({ type: 'ADD_TRANSACTION', payload: newTransaction });
  };

  const deleteTransaction = async (id: string) => {
    await database.deleteTransaction(id);
    dispatch({ type: 'DELETE_TRANSACTION', payload: id });
  };

  const updateTransaction = async (transaction: Transaction) => {
    await database.updateTransaction({
      id: transaction.id,
      type: transaction.type,
      amount: transaction.amount,
      description: transaction.description,
      category: transaction.category,
      date: transaction.date,
    });
    
    dispatch({ type: 'UPDATE_TRANSACTION', payload: transaction });
  };

  const resetData = async () => {
    await database.resetAllData();
    dispatch({ type: 'RESET_DATA' });
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const value: AppContextType = {
    state,
    setBalance: (balance: number) => dispatch({ type: 'SET_BALANCE', payload: balance }),
    addTransaction,
    deleteTransaction,
    updateTransaction,
    resetData,
    formatCurrency,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
