import React from 'react';
import { MapPin, Compass, ShieldAlert, FileText, Settings, Database } from 'lucide-react';

interface SidebarProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab = 'geo', onTabChange }) => {
  const navItems = [
    { id: 'geo', label: 'Geo Intelligence', icon: MapPin, active: true },
    { id: 'candidates', label: 'Candidate Hubs', icon: Compass },
    { id: 'evidence', label: 'Evidence Gate', icon: ShieldAlert },
    { id: 'cases', label: 'Case Dossiers', icon: FileText },
    { id: 'data', label: 'Signal Sources', icon: Database },
    { id: 'settings', label: 'Module Settings', icon: Settings },
  ];

  return (
    <aside
      style={{
        width: '220px',
        borderRight: '1px solid rgba(255, 255, 255, 0.08)',
        background: 'rgba(11, 15, 25, 0.95)',
        display: 'flex',
        flexDirection: 'column',
        padding: '1.25rem 0.75rem',
        gap: '0.375rem',
      }}
    >
      <div
        style={{
          fontSize: '0.6875rem',
          fontWeight: 700,
          color: '#64748b',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          padding: '0.5rem 0.75rem 0.25rem',
        }}
      >
        Navigation
      </div>

      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = item.id === activeTab;

        return (
          <button
            key={item.id}
            onClick={() => onTabChange?.(item.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.625rem 0.75rem',
              borderRadius: '8px',
              fontSize: '0.8125rem',
              fontWeight: isActive ? 600 : 500,
              color: isActive ? '#38bdf8' : '#94a3b8',
              background: isActive ? 'rgba(56, 189, 248, 0.1)' : 'transparent',
              border: isActive ? '1px solid rgba(56, 189, 248, 0.25)' : '1px solid transparent',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 150ms ease',
            }}
          >
            <Icon size={16} style={{ color: isActive ? '#38bdf8' : '#64748b' }} />
            <span>{item.label}</span>
          </button>
        );
      })}

      <div style={{ marginTop: 'auto', padding: '0.75rem', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
        <div style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 600 }}>Operational Rule</div>
        <div style={{ fontSize: '0.65rem', color: '#64748b', marginTop: '0.25rem' }}>
          Red indicator is strictly enforced for confirmed operational urgency.
        </div>
      </div>
    </aside>
  );
};
