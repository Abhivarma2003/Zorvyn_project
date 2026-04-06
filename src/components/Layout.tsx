import { ReactNode } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="app-shell">
      <Sidebar />
      <div className="main-section">
        <TopBar />
        <main className="page-body">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
