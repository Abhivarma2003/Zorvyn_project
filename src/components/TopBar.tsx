import { useAppContext } from '../context/AppContext';

const TopBar = () => {
  const { role, setRole, theme, setTheme } = useAppContext();

  return (
    <header className="topbar">
      <div className="topbar-title">
        <div>
          <p className="page-tag">Overview</p>
          <h2>Good evening, Samyak</h2>
        </div>
        <p className="topbar-subtitle">Here’s your financial summary for today.</p>
      </div>

      <div className="topbar-actions">
        <label className="select-pill">
          <span>INR</span>
          <select>
            <option>INR</option>
            <option>USD</option>
            <option>EUR</option>
          </select>
        </label>

        <button type="button" className="button-secondary">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Export
        </button>

        <label className="select-pill role-pill">
          <span>Role</span>
          <select value={role} onChange={(e) => setRole(e.target.value as 'viewer' | 'admin')}>
            <option value="viewer">Viewer</option>
            <option value="admin">Admin</option>
          </select>
        </label>

        <button type="button" className="icon-button" aria-label="Notifications">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8a6 6 0 00-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 01-3.46 0" />
          </svg>
          <span className="badge-pill">9</span>
        </button>

        <button
          className={`theme-toggle ${theme === 'dark' ? 'active' : ''}`}
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          aria-label="Toggle theme"
          title="Toggle dark/light mode"
        >
          {theme === 'light' ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
            </svg>
          )}
        </button>
      </div>
    </header>
  );
};

export default TopBar;
