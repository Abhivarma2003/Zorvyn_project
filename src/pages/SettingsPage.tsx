import { useAppContext } from '../context/AppContext';

const SettingsPage = () => {
  const { role, theme, setRole, setTheme } = useAppContext();

  return (
    <div className="page-grid">
      <section className="section-block">
        <div className="section-header">
          <div>
            <p className="section-subtitle">Settings</p>
            <h3>Personalize your experience</h3>
          </div>
          <p className="section-note">Adapt the dashboard for your role and display preferences.</p>
        </div>

        <div className="settings-card glass">
          <div className="settings-row">
            <div>
              <h4>Controls available in top bar</h4>
              <p>Role and theme toggles are now icon buttons in TopBar for cleaner UI.</p>
            </div>
          </div>
          <div className="settings-note">
            <p>Data persists in browser localStorage. Role: {role === 'admin' ? 'Admin (add/edit)' : 'Viewer (read-only)'}. Theme: {theme} mode.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SettingsPage;
