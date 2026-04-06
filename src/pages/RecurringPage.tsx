const RecurringPage = () => {
  return (
    <div className="page-grid">
      <section className="section-block glass pro-section">
        <div className="section-header">
          <div>
            <p className="section-subtitle">Recurring</p>
            <h3>Automated cashflows</h3>
          </div>
          <p className="section-note">Professional overview of recurring income and expenses with timeline visualization and smart categorization.</p>
        </div>

        <div className="recurring-list pro-recurring-list">
          {[
            { title: 'Monthly Salary', category: 'Salary', frequency: 'monthly', next: '2026-04-30', amount: 85000, type: 'income', icon: '💼' },
            { title: 'House Rent', category: 'Housing', frequency: 'monthly', next: '2026-05-01', amount: 12000, type: 'expense', icon: '🏠' },
            { title: 'Netflix', category: 'Entertainment', frequency: 'monthly', next: '2026-04-20', amount: 649, type: 'expense', icon: '📺' },
          ].map((item, index) => (
            <div key={item.title} className={`recurring-card glass pro-recurring-card pro-card-hover ${item.type} ${index % 2 === 0 ? 'even' : 'odd'}`}>
              <div className="recurring-icon">{item.icon}</div>
              <div className="recurring-content">
                <div className="recurring-header">
                  <p className="recurring-title">{item.title}</p>
                  <span className={`recurring-badge ${item.type}`}>{item.category} • {item.frequency}</span>
                </div>
                <div className="recurring-timeline">
                  <div className="timeline-dot" />
                  <span className="timeline-label">Next: {item.next}</span>
                </div>
              </div>
              <div className="recurring-amount">
                <strong className={`pro-amount ${item.type}`}>
                  {item.type === 'expense' ? '-' : '+'}₹{item.amount.toLocaleString()}
                </strong>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default RecurringPage;
