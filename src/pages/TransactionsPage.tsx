import { FormEvent, useMemo, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import TransactionTable from '../components/TransactionTable';
import EmptyState from '../components/EmptyState';
import { TransactionType } from '../types';

const TransactionsPage = () => {
  const {
    transactions,
    filterKeyword,
    typeFilter,
    setFilterKeyword,
    setTypeFilter,
    addTransaction,
    role,
  } = useAppContext();

  const [sortKey, setSortKey] = useState<'date' | 'amount'>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [newDescription, setNewDescription] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [newCategory, setNewCategory] = useState('Utilities');
  const [newType, setNewType] = useState<TransactionType>('expense');
  const [newDate, setNewDate] = useState(() => new Date().toISOString().slice(0, 10));

  const handleSortChange = (key: 'date' | 'amount') => {
    if (sortKey === key) {
      setSortDirection((current) => (current === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDirection('desc');
    }
  };

  const filteredTransactions = useMemo(() => {
    return transactions
      .filter((transaction) => {
        const keyword = filterKeyword.toLowerCase();
        const matchesKeyword =
          transaction.description.toLowerCase().includes(keyword) ||
          transaction.category.toLowerCase().includes(keyword);
        const matchesType = typeFilter === 'all' || transaction.type === typeFilter;
        return matchesKeyword && matchesType;
      })
      .sort((a, b) => {
        if (sortKey === 'amount') {
          return sortDirection === 'asc'
            ? a.amount - b.amount
            : b.amount - a.amount;
        }
        return sortDirection === 'asc'
          ? new Date(a.date).getTime() - new Date(b.date).getTime()
          : new Date(b.date).getTime() - new Date(a.date).getTime();
      });
  }, [transactions, filterKeyword, typeFilter, sortKey, sortDirection]);

  const handleAddTransaction = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const amountValue = Number(newAmount);
    if (!newDescription || !newAmount || Number.isNaN(amountValue)) {
      return;
    }
    addTransaction({
      date: newDate,
      description: newDescription,
      category: newCategory,
      amount: amountValue,
      type: newType,
    });
    setNewDescription('');
    setNewAmount('');
  };

  return (
    <div className="page-grid">
      <section className="section-block">
        <div className="section-header">
          <div>
            <p className="section-subtitle">Transactions</p>
            <h3>Manage your flows</h3>
          </div>
          <p className="section-note">Search, filter, and add new entries for your finance activity.</p>
        </div>

        <div className="panel-row">
          <input
            type="text"
            placeholder="Search description or category"
            value={filterKeyword}
            onChange={(event) => setFilterKeyword(event.target.value)}
          />
          <select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value as 'all' | TransactionType)}>
            <option value="all">All types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          {role === 'admin' && (
            <button className="primary" type="button" onClick={() => null}>
              + Add Transaction
            </button>
          )}
        </div>

        {role === 'admin' && (
          <form className="transaction-form" onSubmit={handleAddTransaction}>
            <div className="form-grid">
              <label>
                Description
                <input
                  value={newDescription}
                  onChange={(event) => setNewDescription(event.target.value)}
                  placeholder="e.g. Freelance payout"
                />
              </label>
              <label>
                Category
                <select value={newCategory} onChange={(event) => setNewCategory(event.target.value)}>
                  <option>Utilities</option>
                  <option>Groceries</option>
                  <option>Housing</option>
                  <option>Health</option>
                  <option>Investment</option>
                  <option>Food</option>
                </select>
              </label>
              <label>
                Amount
                <input
                  type="number"
                  value={newAmount}
                  onChange={(event) => setNewAmount(event.target.value)}
                  placeholder="0.00"
                />
              </label>
              <label>
                Date
                <input type="date" value={newDate} onChange={(event) => setNewDate(event.target.value)} />
              </label>
              <label>
                Type
                <select value={newType} onChange={(event) => setNewType(event.target.value as TransactionType)}>
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
              </label>
              <button type="submit" className="primary full-width">
                Add transaction
              </button>
            </div>
          </form>
        )}

        {filteredTransactions.length === 0 ? (
          <EmptyState message="No transactions matched your filters. Adjust the search or add a new record." />
        ) : (
          <TransactionTable
            transactions={filteredTransactions}
            sortKey={sortKey}
            sortDirection={sortDirection}
            onSortChange={handleSortChange}
          />
        )}
      </section>
    </div>
  );
};

export default TransactionsPage;
