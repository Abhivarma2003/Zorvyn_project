import { NavLink } from 'react-router-dom';

const navItems = [
  { label: 'Overview', path: '/', icon: 'home' },
  { label: 'Transactions', path: '/transactions', icon: 'list' },
  { label: 'Insights', path: '/insights', icon: 'chart' },
  { label: 'Bills', path: '/bills', icon: 'bill' },
  { label: 'Goals', path: '/goals', icon: 'target' },
  { label: 'Recurring', path: '/recurring', icon: 'repeat' },
  { label: 'Settings', path: '/settings', icon: 'settings' },
];

const iconShapes: Record<string, string> = {
  home: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z',
  list: 'M4 6h16M4 12h16M4 18h16',
  chart: 'M4 17h3V10H4v7zm6 0h3V4h-3v13zm6 0h3v-7h-3v7z',
  bill: 'M6 3h12a1 1 0 011 1v16a1 1 0 01-1 1H6a1 1 0 01-1-1V4a1 1 0 011-1zm2 4h8v2H8V7zm0 4h8v2H8v-2z',
  target: 'M12 2a10 10 0 100 20 10 10 0 000-20zm0 4a6 6 0 110 12 6 6 0 010-12zm0 2a4 4 0 100 8 4 4 0 000-8z',
  repeat: 'M4 4v6h6M20 20v-6h-6M6 14a6 6 0 009 4.2M18 10a6 6 0 00-9-4.2',
  settings: 'M12 8a4 4 0 100 8 4 4 0 000-8zm8.9 5h-2.1a6.98 6.98 0 00-1.2 2.6l1.5 1.4-2.1 2.1-1.4-1.5A6.98 6.98 0 0012 19.1V21h-2v-1.9a6.98 6.98 0 00-2.6-1.2L5.9 19.4 3.8 17.3l1.5-1.4A6.98 6.98 0 004.9 13H2.8V11H4.9a6.98 6.98 0 001.2-2.6L4.6 7A8.003 8.003 0 017.2 3.9l1.4 1.5A6.98 6.98 0 0011 4.9V3h2v1.9a6.98 6.98 0 002.6 1.2l1.4-1.5A8.003 8.003 0 0119.4 7l-1.5 1.4A6.98 6.98 0 0019.1 11h2.1v2z',
};

const Sidebar = () => {
  return (
    <aside className="sidebar-panel">
      <div className="brand-block">
        <div className="brand-mark">Z</div>
        <div>
          <h1>Zorvyn</h1>
          <p>Finance HQ</p>
        </div>
      </div>

      <nav className="nav-list">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
          >
            <span className="nav-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d={iconShapes[item.icon]} />
              </svg>
            </span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <p>Insights, goals, and recurring plans — all in one place.</p>
      </div>
    </aside>
  );
};

export default Sidebar;
