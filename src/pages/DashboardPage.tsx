import SummaryCard from '../components/SummaryCard';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { Transaction } from '../types';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const formatCurrency = (value: number) => `₹${value.toFixed(2)}`;

const buildTrend = (transactions: Transaction[]) => {
  const monthly = new Map<number, number>();
  transactions.forEach((transaction) => {
    const date = new Date(transaction.date);
    const key = date.getMonth();
    const current = monthly.get(key) ?? 0;
    monthly.set(key, current + (transaction.type === 'income' ? transaction.amount : -transaction.amount));
  });

  return Array.from({ length: 6 }, (_, index) => {
    const monthIndex = (new Date().getMonth() - 5 + index + 12) % 12;
    return {
      month: monthLabels[monthIndex],
      value: monthly.get(monthIndex) ?? 0,
    };
  });
};

const DashboardPage = () => {
  const { transactions } = useAppContext();
  const navigate = useNavigate();
  const income = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  const expenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  const balance = income - expenses;
  const trend = buildTrend(transactions);

  const categoryBreakdown = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, transaction) => {
      acc[transaction.category] = (acc[transaction.category] ?? 0) + transaction.amount;
      return acc;
    }, {} as Record<string, number>);

  const breakdownList = Object.entries(categoryBreakdown).sort(
    (a, b) => b[1] - a[1]
  );

  const averageSpend = expenses > 0 ? expenses / Math.max(transactions.filter((t) => t.type === 'expense').length, 1) : 0;

  return (
    <div className="page-grid">
      <section className="section-block dashboard-hero glass">
        <div className="hero-top">
          <div>
            <p className="section-subtitle">Good evening</p>
            <h3>Here’s your financial summary for today</h3>
          </div>
          <div className="hero-actions">
            <button type="button" className="secondary" onClick={() => navigate('/bills')}>Add Bill</button>
            <button type="button" className="secondary" onClick={() => navigate('/goals')}>Add Goal</button>
            <button type="button" className="primary">+ Transaction</button>
          </div>
        </div>
        <div className="hero-stats">
          <div className="hero-stat-card">
            <span className="stat-label">Total Balance</span>
            <strong>{formatCurrency(balance)}</strong>
            <span className="stat-note">Net position after expenses</span>
          </div>
          <div className="hero-stat-card">
            <span className="stat-label">Monthly Income</span>
            <strong>{formatCurrency(income)}</strong>
            <span className="stat-note">Improving your cash flow</span>
          </div>
          <div className="hero-stat-card">
            <span className="stat-label">Monthly Expenses</span>
            <strong>{formatCurrency(expenses)}</strong>
            <span className="stat-note">Keep an eye on spending</span>
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="section-header">
          <div>
            <p className="section-subtitle">Overview</p>
            <h3>Professional finance summary</h3>
          </div>
          <p className="section-note">Visualize your cash flow, spending mix, and growth signals in a single view.</p>
        </div>

        <div className="summary-grid">
          <SummaryCard label="Total Balance" value={formatCurrency(balance)}>
            <span className={balance >= 0 ? 'positive' : 'negative'}>
              {balance >= 0 ? 'Healthy' : 'Watch'}
            </span>
          </SummaryCard>
          <SummaryCard label="Monthly Income" value={formatCurrency(income)}>
            <span className="positive">+{((income / Math.max(expenses, 1)) * 100).toFixed(0)}%</span>
          </SummaryCard>
          <SummaryCard label="Monthly Expenses" value={formatCurrency(expenses)}>
            <span className="negative">-{((expenses / Math.max(income + expenses, 1)) * 100).toFixed(0)}%</span>
          </SummaryCard>
          <SummaryCard label="Avg expense" value={formatCurrency(averageSpend)}>
            <span className="neutral">Based on current activity</span>
          </SummaryCard>
        </div>
      </section>

      <section className="section-block grid-two">
        <div className="chart-card chart-large glass">
          <div className="card-header">
            <div>
              <p>Balanced Trend</p>
              <h4>Last 6 months</h4>
            </div>
            <div className="chart-chip">
              <span className="chip-icon positive">↑</span>
              Clear visualization
            </div>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trend} margin={{ top: 10, right: 0, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="trendColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--accent)" stopOpacity={0.4}/>
                    <stop offset="100%" stopColor="var(--accent)" stopOpacity={0.05}/>
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="value" stroke="var(--accent)" fill="url(#trendColor)" strokeWidth={2} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tickMargin={12} tick={{fontSize: 12, fill: 'var(--text-muted)'}} />
                <YAxis hide />
                <Tooltip formatter={(value: any) => [formatCurrency(Number(value || 0)), 'Balance']} />
                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="var(--border)" opacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-card glass">
          <div className="card-header">
            <div>
              <p>Spending breakdown</p>
              <h4>Top expense categories</h4>
            </div>
            <span className="badge small">Insight</span>
          </div>
          <div className="breakdown-list">
            {breakdownList.length === 0 ? (
              <p className="empty-note">No expenses yet.</p>
            ) : (
              breakdownList.slice(0, 5).map(([category, amount]) => (
                <div key={category} className="breakdown-row">
                  <div>
                    <p>{category}</p>
                    <span>{((amount / Math.max(expenses, 1)) * 100).toFixed(0)}%</span>
                  </div>
                  <div className="breakdown-bar">
                    <div style={{ width: `${(amount / Math.max(expenses, 1)) * 100}%` }} />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;
