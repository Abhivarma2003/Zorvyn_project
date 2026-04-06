import { Transaction } from '../types';

const sortArrow = (isActive: boolean, direction: 'asc' | 'desc') => {
  if (!isActive) return '↕';
  return direction === 'asc' ? '↑' : '↓';
};

const TransactionTable = ({
  transactions,
  sortKey,
  sortDirection,
  onSortChange,
}: {
  transactions: Transaction[];
  sortKey: 'date' | 'amount';
  sortDirection: 'asc' | 'desc';
  onSortChange: (key: 'date' | 'amount') => void;
}) => {
  return (
    <div className="table-card">
      <table>
        <thead>
          <tr>
            <th className="sortable" onClick={() => onSortChange('date')}>
              Date <span className="sort-indicator">{sortArrow(sortKey === 'date', sortDirection)}</span>
            </th>
            <th>Description</th>
            <th>Category</th>
            <th>Type</th>
            <th className="amount-cell sortable" onClick={() => onSortChange('amount')}>
              Amount <span className="sort-indicator">{sortArrow(sortKey === 'amount', sortDirection)}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.date}</td>
              <td>{transaction.description}</td>
              <td>
                <span className="category-pill">{transaction.category}</span>
              </td>
              <td>
                <span className={`badge ${transaction.type}`}>
                  {transaction.type === 'income' ? '+' : '-'} {transaction.type}
                </span>
              </td>
              <td className={`amount-cell ${transaction.type}`}>
                {transaction.type === 'expense' ? '-' : '+'}₹{transaction.amount.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
