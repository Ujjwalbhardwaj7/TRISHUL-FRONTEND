import React from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Monitor } from 'lucide-react';

interface AppShellProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ activeTab = 'geo', onTabChange, children }) => {
  return (
    <div className="app-container">
      <Sidebar activeTab={activeTab} onTabChange={onTabChange} />
      <div className="main-content">
        <Header />
        <div className="mobile-notice">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            <Monitor size={14} />
            <span>Laptop / Desktop view recommended for tactical spatial mapping & multi-panel intelligence analysis.</span>
          </div>
        </div>
        <div className="page-wrapper">
          {children}
        </div>
      </div>
    </div>
  );
};
