const BillsPage = () => {
  return (
    <div className="page-grid">
      <section className="section-block glass pro-section">
        <div className="section-header">
          <div>
            <p className="section-subtitle">Bills</p>
            <h3>Payables & due dates</h3>
          </div>
          <p className="section-note">Track upcoming bills, overdue alerts, and payment schedules with professional clarity.</p>
        </div>

        <div className="stats-grid pro-stats">
          {[
            { label: 'Due this week', value: 9650, icon: '📅', color: 'warning' },
            { label: 'Overdue', value: 1250, icon: '⚠️', color: 'danger' },
            { label: 'Next payment', value: 12000, icon: '💳', color: 'accent' },
          ].map((stat, index) => (
            <div key={stat.label} className={`summary-card card-small glass pro-stat-card ${stat.color}`}>
              <div className="stat-icon">{stat.icon}</div>
              <p>{stat.label}</p>
              <strong className={`pro-stat-value ${stat.color === 'danger' ? 'negative' : ''}`}>
                ₹{stat.value.toLocaleString()}
              </strong>
            </div>
          ))}
        </div>

        <div className="table-card pro-table-card">
          <table className="pro-table">
            <thead>
              <tr>
                <th>Bill</th>
                <th>Due date</th>
                <th>Status</th>
                <th className="amount-cell">Amount</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'House Rent', due: '2026-04-01', status: 'Overdue', amount: 12000, icon: '🏠' },
                { name: 'Water Bill', due: '2026-04-03', status: 'Overdue', amount: 450, icon: '💧' },
                { name: 'Electricity Bill', due: '2026-04-12', status: 'Due Today', amount: 1800, icon: '⚡' },
                { name: 'Internet Plan', due: '2026-04-15', status: 'Upcoming', amount: 799, icon: '🌐' },
              ].map((bill, index) => (
                <tr key={bill.name} className={`pro-table-row ${index % 2 === 0 ? 'even' : 'odd'}`}>
                  <td className="bill-name">
                    <span className="bill-icon">{bill.icon}</span>
                    {bill.name}
                  </td>
                  <td>{bill.due}</td>
                  <td>
                    <span className={`pro-badge ${bill.status === 'Overdue' ? 'danger' : bill.status === 'Due Today' ? 'warning' : 'success'}`}>
                      {bill.status}
                    </span>
                  </td>
                  <td className={`amount-cell pro-amount ${bill.status === 'Overdue' ? 'negative' : ''}`}>
                    ₹{bill.amount.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default BillsPage;
