import { useMemo } from 'react';
import { useAppContext } from '../context/AppContext';
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { Transaction } from '../types';

  const formatCurrency = (value: number | undefined) => `₹${(value ?? 0).toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;
const formatPercentage = (value: number) => `${value.toFixed(1)}%`;

const InsightsPage = () => {
  const { transactions } = useAppContext();

  const totalIncome = useMemo(
    () => transactions.filter((t) => t.type === 'income').reduce((sum, t) => sum + t.amount, 0),
    [transactions]
  );

  const totalExpenses = useMemo(
    () => transactions.filter((t) => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0),
    [transactions]
  );

  const netSavings = totalIncome - totalExpenses;
  const savingsRate = totalIncome > 0 ? (netSavings / totalIncome) * 100 : 0;
  const spendingScore = Math.min(95, Math.max(20, 80 + (savingsRate / 2) - (totalExpenses / totalIncome || 1) * 20));

  const categoryData = useMemo(() => {
    const categories = transactions
      .filter((t: Transaction) => t.type === 'expense')
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
      }, {} as Record<string, number>);

    return Object.entries(categories)
      .map(([name, value]) => ({ name, value, percentage: (value / Math.max(totalExpenses, 1)) * 100 }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 7);
  }, [transactions, totalExpenses]);

  const monthlyTrendData = useMemo(() => {
    const monthKey = (dateString: string) => new Date(dateString).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    const monthMap = transactions.reduce((acc, t) => {
      const key = monthKey(t.date);
      const amount = t.type === 'income' ? t.amount : -t.amount;
      acc[key] = (acc[key] || 0) + amount;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(monthMap)
      .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
      .slice(-12)
      .map(([month, value]) => ({ month, value: Number(value.toFixed(0)) }));
  }, [transactions]);

  const topCategoryWarning = categoryData[0] ? `⚠️ ${categoryData[0].name} takes ${formatPercentage(categoryData[0].percentage)} of expenses` : '';

  const forecast = savingsRate > 20 ? 'Excellent trajectory—projected to reach savings goals ahead of schedule.' :
                   savingsRate > 0 ? 'Steady progress; maintain discipline for optimal results.' :
                   'Review spending; adjust habits to flip to positive savings rate.';

  const COLORS = ['var(--primary)', '#ec4899', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6', '#06b6d4'];

  return (
    <div className="page-grid">
      {/* Hero Metrics */}
      <section className="section-block dashboard-hero glass">
        <div className="hero-top">
          <div>
            <p className="section-subtitle">Executive Insights</p>
            <h3>Financial health at a glance</h3>
          </div>
          <button className="secondary" disabled>Export Report</button>
        </div>
        <div className="hero-stats" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr)' }}>
          <div className="hero-stat-card accent">
            <span className="stat-label">Spending Score</span>
            <strong style={{ fontSize: '2.5rem', color: 'var(--accent)' }}>{spendingScore.toFixed(0)}/100</strong>
            <span className="stat-note">{spendingScore > 80 ? 'Elite' : spendingScore > 60 ? 'Strong' : 'Improve'}</span>
          </div>
          <div className="hero-stat-card">
            <span className="stat-label">Income vs Expenses</span>
            <strong>{formatCurrency(totalIncome)} <span className="positive">vs</span> {formatCurrency(totalExpenses)}</strong>
            <span className="stat-note">Net: {formatCurrency(netSavings)} ({formatPercentage(savingsRate)})</span>
          </div>
          <div className="hero-stat-card">
            <span className="stat-label">Avg Transaction</span>
            <strong>{formatCurrency(totalExpenses / Math.max(transactions.filter(t => t.type === 'expense').length, 1))}</strong>
            <span className="stat-note">Per expense item</span>
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="section-header">
          <div>
            <p className="section-subtitle">Data Visualizations</p>
            <h3>Comprehensive analytics dashboard</h3>
          </div>
          <p className="section-note">Interactive charts with precise metrics and actionable recommendations.</p>
        </div>

        <section className="section-block grid-two">
          {/* Expense Pie */}
          <div className="chart-card chart-large glass">
            <div className="card-header">
              <div>
                <p>Expense Distribution</p>
                <h4>Category breakdown</h4>
              </div>
              {topCategoryWarning && <span className="badge warning">{topCategoryWarning}</span>}
            </div>
            <div className="chart-container" style={{ height: '320px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%" cy="50%" innerRadius={40} outerRadius={80}
                    dataKey="value" nameKey="name" cornerRadius={4}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: any) => [formatCurrency(value as number), 'Amount', formatPercentage((value / totalExpenses || 0) * 100)]} />
                  <Legend layout="vertical" align="right" verticalAlign="middle" wrapperStyle={{ paddingLeft: '20px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Monthly Trend Line */}
          <div className="chart-card chart-large glass">
            <div className="card-header">
              <div>
                <p>Cash Flow Trend</p>
                <h4>Last 12 months</h4>
              </div>
              <span className="badge success">{monthlyTrendData.length > 1 ? (monthlyTrendData[monthlyTrendData.length-1].value >= monthlyTrendData[monthlyTrendData.length-2]?.value ? '↑ Improving' : '↓ Declining') : 'No data'}</span>
            </div>
            <div className="chart-container" style={{ height: '320px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyTrendData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.4} />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tickMargin={8} tick={{ fill: 'var(--text-muted)' }} />
                  <YAxis tickCount={4} axisLine={false} tickLine={false} tickMargin={8} tick={{ fill: 'var(--text-muted)' }} />
                  <Tooltip formatter={(value: any) => formatCurrency(Number(value || 0))} labelFormatter={() => 'Month'} />
                  <Line type="monotone" dataKey="value" stroke="var(--accent)" strokeWidth={3} dot={{ fill: 'var(--accent)', strokeWidth: 2 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        {/* Insights Cards */}
        <div className="insights-grid">
          <div className="insight-card full-card glass">
            <div className="card-header">
              <p>💡 Strategic Forecast</p>
              <h4>30-day projection</h4>
            </div>
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <p className="pro-note large">{forecast}</p>
              <div style={{ marginTop: '1rem' }}>
                <span className={`badge large ${savingsRate > 10 ? 'success' : 'warning'}`}>
                  Projected savings rate: {formatPercentage(savingsRate)}
                </span>
              </div>
            </div>
          </div>

          {/* Category Bar Chart */}
          {categoryData.length > 0 && (
            <div className="chart-card glass">
              <div className="card-header">
                <div>
                  <p>Top Categories vs Avg</p>
                  <h4>Benchmark analysis</h4>
                </div>
                <span className="badge small neutral">Benchmark</span>
              </div>
              <div className="chart-container" style={{ height: '200px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categoryData.slice(0,5)} layout="vertical" margin={{ top: 10, right: 20, bottom: 10, left: 80 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.3} />
                    <XAxis type="number" axisLine={false} tickLine={false} tickMargin={8} tickFormatter={formatCurrency} />
                    <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tickMargin={4} width={80} tick={{ fill: 'var(--text)' }} />
                  <Tooltip formatter={(value: any) => formatCurrency(value as number)} />
                    {categoryData.slice(0,5).map((entry, index) => (
                      <Bar key={`bar-${index}`} dataKey="value" fill={COLORS[index % COLORS.length]} barSize={24} radius={[4, 4, 4, 0]} />
                    ))}
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default InsightsPage;

