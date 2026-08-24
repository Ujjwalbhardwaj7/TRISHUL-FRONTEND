import React, { useState } from 'react';
import { AppShell } from './components/layout/AppShell';
import { GeoIntelligencePage } from './features/geo-intelligence';
import { Compass, ShieldCheck, FileText, Database, Settings } from 'lucide-react';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('geo');

  const renderContent = () => {
    switch (activeTab) {
      case 'geo':
        return <GeoIntelligencePage />;
      case 'candidates':
        return (
          <div className="glass-card" style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>
            <Compass size={40} style={{ color: '#38bdf8', marginBottom: '1rem' }} />
            <h2 style={{ fontSize: '1.25rem', color: '#f8fafc', fontWeight: 700 }}>Candidate Hubs Directory</h2>
            <p style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>
              Detailed spatial clustering and candidate hub matrix views.
            </p>
          </div>
        );
      case 'evidence':
        return (
          <div className="glass-card" style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>
            <ShieldCheck size={40} style={{ color: '#38bdf8', marginBottom: '1rem' }} />
            <h2 style={{ fontSize: '1.25rem', color: '#f8fafc', fontWeight: 700 }}>Evidence Gate Verification Panel</h2>
            <p style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>
              Inspect signal evidence threshold parameters and gate validation logs.
            </p>
          </div>
        );
      case 'cases':
        return (
          <div className="glass-card" style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>
            <FileText size={40} style={{ color: '#38bdf8', marginBottom: '1rem' }} />
            <h2 style={{ fontSize: '1.25rem', color: '#f8fafc', fontWeight: 700 }}>Case Dossiers Register</h2>
            <p style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>
              Historical case records, audit trails, and intelligence reports.
            </p>
          </div>
        );
      case 'data':
        return (
          <div className="glass-card" style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>
            <Database size={40} style={{ color: '#38bdf8', marginBottom: '1rem' }} />
            <h2 style={{ fontSize: '1.25rem', color: '#f8fafc', fontWeight: 700 }}>Signal Data Feeds</h2>
            <p style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>
              Real-time spatial telemetry, switch streams, and Graph DB connections.
            </p>
          </div>
        );
      case 'settings':
        return (
          <div className="glass-card" style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>
            <Settings size={40} style={{ color: '#38bdf8', marginBottom: '1rem' }} />
            <h2 style={{ fontSize: '1.25rem', color: '#f8fafc', fontWeight: 700 }}>Geo-Intelligence Module Settings</h2>
            <p style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>
              Configure evidence gate thresholds, exit mode protocols, and model parameters.
            </p>
          </div>
        );
      default:
        return <GeoIntelligencePage />;
    }
  };

  return (
    <AppShell activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </AppShell>
  );
};

export default App;
