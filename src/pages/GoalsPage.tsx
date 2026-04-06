const GoalsPage = () => {
  return (
    <div className="page-grid">
      <section className="section-block glass pro-section">
        <div className="section-header">
          <div>
            <p className="section-subtitle">Goals</p>
            <h3>Financial milestones</h3>
          </div>
          <p className="section-note">Visualize progress toward savings goals and stay on track with professional tracking.</p>
        </div>

        <div className="goal-grid">
          {[
            { title: 'Emergency Fund', saved: 62000, target: 150000, color: 'purple', icon: '🏦', days: 270 },
            { title: 'Europe Vacation', saved: 22000, target: 80000, color: 'amber', icon: '✈️', days: 149 },
            { title: 'New Laptop', saved: 45000, target: 90000, color: 'teal', icon: '💻', days: 86 },
            { title: 'Home Down Payment', saved: 120000, target: 500000, color: 'rose', icon: '🏠', days: 422 },
          ].map((goal) => {
            const progress = Math.round((goal.saved / goal.target) * 100);
            return (
<div key={goal.title} className="goal-card glass pro-card-hover">
                <div className="goal-header">
                  <div className="goal-icon-wrapper">
                    <span className="goal-icon">{goal.icon}</span>
                    <div>
                      <p>{goal.title}</p>
                      <strong className="pro-progress-label">{progress}%</strong>
                    </div>
                  </div>
                  <span className={`goal-dot ${goal.color}`} />
                </div>
                <p className="goal-subtitle">₹{goal.saved.toLocaleString()} / ₹{goal.target.toLocaleString()}</p>
                <div className="goal-progress pro-progress">
                  <div 
                    className={`pro-progress-fill ${goal.color}`} 
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="goal-note pro-status">
                  <span className="pro-days-left">{goal.days}</span> days left •{' '}
                  <span className={`pro-rate ${progress > 70 ? 'positive' : progress > 40 ? 'warning' : 'negative'}`}>
                    {progress > 70 ? 'On track' : progress > 40 ? 'Moderate' : 'Behind'}
                  </span>
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default GoalsPage;
