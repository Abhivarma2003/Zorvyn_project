import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { initialTransactions } from '../data/mockData';
import { Role, Theme, Transaction, TransactionType } from '../types';

interface AppState {
  role: Role;
  theme: Theme;
  transactions: Transaction[];
  filterKeyword: string;
  typeFilter: 'all' | TransactionType;
  sortKey: 'date' | 'amount';
  sortDirection: 'asc' | 'desc';
  setRole: (value: Role) => void;
  setTheme: (value: Theme) => void;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  updateTransaction: (id: string, updates: Partial<Omit<Transaction, 'id'>>) => void;
  setFilterKeyword: (value: string) => void;
  setTypeFilter: (value: 'all' | TransactionType) => void;
  setSortKey: (value: 'date' | 'amount') => void;
  toggleSortDirection: () => void;
}

const AppContext = createContext<AppState | undefined>(undefined);
const LOCAL_STORAGE_KEY = 'finance-dashboard-state';

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [role, setRole] = useState<Role>('viewer');
  const [theme, setTheme] = useState<Theme>('light');
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [filterKeyword, setFilterKeyword] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | TransactionType>('all');
  const [sortKey, setSortKey] = useState<'date' | 'amount'>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as {
          role: Role;
          theme: Theme;
          transactions: Transaction[];
        };
        setRole(parsed.role);
        setTheme(parsed.theme);
        setTransactions(parsed.transactions);
      } catch {
        return;
      }
    }
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify({ role, theme, transactions })
    );
  }, [role, theme, transactions]);

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: `t-${Date.now()}`,
    };
    setTransactions((prev) => [newTransaction, ...prev]);
  };

  const updateTransaction = (
    id: string,
    updates: Partial<Omit<Transaction, 'id'>>
  ) => {
    setTransactions((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  const toggleSortDirection = () => {
    setSortDirection((current) => (current === 'asc' ? 'desc' : 'asc'));
  };

  const value = useMemo(
    () => ({
      role,
      theme,
      transactions,
      filterKeyword,
      typeFilter,
      sortKey,
      sortDirection,
      setRole,
      setTheme,
      addTransaction,
      updateTransaction,
      setFilterKeyword,
      setTypeFilter,
      setSortKey,
      toggleSortDirection,
    }),
    [
      role,
      theme,
      transactions,
      filterKeyword,
      typeFilter,
      sortKey,
      sortDirection,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used inside AppProvider');
  }
  return context;
};
