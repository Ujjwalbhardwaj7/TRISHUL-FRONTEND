import React from 'react';
import { Badge } from '../../../components/common/Badge';
import { ForecastData, ForecastState } from '../../../types/geo';
import { ShieldCheck, ShieldAlert, Navigation, RefreshCw, ChevronDown } from 'lucide-react';

interface GeoHeaderProps {
  forecast: ForecastData;
  availableCases: string[];
  onSwitchCase: (caseId: string) => void;
  onToggleExitMode: () => void;
  onStateChange: (state: ForecastState) => void;
  onRefresh: () => void;
  isRefreshing?: boolean;
}

export const GeoHeader: React.FC<GeoHeaderProps> = ({
  forecast,
  availableCases,
  onSwitchCase,
  onToggleExitMode,
  onStateChange,
  onRefresh,
  isRefreshing = false,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        padding: '1rem 1.25rem',
        background: 'rgba(17, 24, 39, 0.7)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '12px',
        marginBottom: '1.25rem',
      }}
    >
      {/* Case Selector Dropdown & Gate Info */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        <div>
          <div style={{ fontSize: '0.6875rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>
            Active Intelligence Case
          </div>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <select
              value={forecast.caseId}
              onChange={(e) => onSwitchCase(e.target.value)}
              style={{
                appearance: 'none',
                WebkitAppearance: 'none',
                padding: '0.375rem 2rem 0.375rem 0.75rem',
                background: 'rgba(30, 41, 59, 0.9)',
                border: '1px solid rgba(56, 189, 248, 0.3)',
                borderRadius: '6px',
                color: '#38bdf8',
                fontSize: '1rem',
                fontWeight: 800,
                fontFamily: 'var(--font-mono)',
                cursor: 'pointer',
                outline: 'none',
              }}
            >
              {availableCases.map((id) => (
                <option key={id} value={id} style={{ background: '#0f172a', color: '#f8fafc' }}>
                  {id}
                </option>
              ))}
            </select>
            <ChevronDown size={14} style={{ position: 'absolute', right: '0.625rem', top: '50%', transform: 'translateY(-50%)', color: '#38bdf8', pointerEvents: 'none' }} />
          </div>
        </div>

        <div style={{ height: '32px', width: '1px', background: 'rgba(255, 255, 255, 0.1)' }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Forecast State</div>
          <Badge type="state" value={forecast.state} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Evidence Gate</div>
          <Badge
            type="gate"
            value={forecast.evidenceGate.status}
            icon={forecast.evidenceGate.status === 'VERIFIED' ? <ShieldCheck size={12} /> : <ShieldAlert size={12} />}
          />
        </div>

        <button
          onClick={onRefresh}
          disabled={isRefreshing}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.375rem',
            padding: '0.375rem 0.625rem',
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '6px',
            color: '#94a3b8',
            fontSize: '0.75rem',
            cursor: isRefreshing ? 'wait' : 'pointer',
            transition: 'all 150ms ease',
          }}
          title="Re-run Engine Simulation"
        >
          <RefreshCw size={12} style={{ animation: isRefreshing ? 'spin 1s linear infinite' : 'none' }} />
          <span>Re-Run Engine</span>
        </button>
      </div>

      {/* State Preview Controls & Exit Mode Toggle */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        {/* Blueprint State Switcher for Verification & Preview */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
            background: 'rgba(0, 0, 0, 0.3)',
            padding: '0.25rem',
            borderRadius: '8px',
            border: '1px solid rgba(255, 255, 255, 0.05)',
          }}
        >
          <span style={{ fontSize: '0.6875rem', color: '#64748b', padding: '0 0.5rem' }}>Preview State:</span>
          <button
            onClick={() => onStateChange('ABSTAIN')}
            style={{
              padding: '0.25rem 0.5rem',
              borderRadius: '6px',
              fontSize: '0.7rem',
              fontWeight: 600,
              background: forecast.state === 'ABSTAIN' ? 'rgba(100, 116, 139, 0.3)' : 'transparent',
              color: forecast.state === 'ABSTAIN' ? '#cbd5e1' : '#64748b',
              border: forecast.state === 'ABSTAIN' ? '1px solid rgba(100, 116, 139, 0.5)' : 'none',
              cursor: 'pointer',
            }}
          >
            ABSTAIN
          </button>
          <button
            onClick={() => onStateChange('MONITORING')}
            style={{
              padding: '0.25rem 0.5rem',
              borderRadius: '6px',
              fontSize: '0.7rem',
              fontWeight: 600,
              background: forecast.state === 'MONITORING' ? 'rgba(59, 130, 246, 0.3)' : 'transparent',
              color: forecast.state === 'MONITORING' ? '#93c5fd' : '#64748b',
              border: forecast.state === 'MONITORING' ? '1px solid rgba(59, 130, 246, 0.5)' : 'none',
              cursor: 'pointer',
            }}
          >
            MONITORING
          </button>
          <button
            onClick={() => onStateChange('CONFIRMED')}
            style={{
              padding: '0.25rem 0.5rem',
              borderRadius: '6px',
              fontSize: '0.7rem',
              fontWeight: 600,
              background: forecast.state === 'CONFIRMED' ? 'rgba(239, 68, 68, 0.3)' : 'transparent',
              color: forecast.state === 'CONFIRMED' ? '#fca5a5' : '#64748b',
              border: forecast.state === 'CONFIRMED' ? '1px solid rgba(239, 68, 68, 0.5)' : 'none',
              cursor: 'pointer',
            }}
          >
            CONFIRMED
          </button>
        </div>

        {/* Exit Mode Trigger Button */}
        <button
          onClick={onToggleExitMode}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            fontSize: '0.8125rem',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 200ms ease',
            background: forecast.exitMode.isActive
              ? 'linear-gradient(135deg, #dc2626, #991b1b)'
              : 'rgba(30, 41, 59, 0.8)',
            color: forecast.exitMode.isActive ? '#ffffff' : '#cbd5e1',
            border: forecast.exitMode.isActive
              ? '1px solid rgba(239, 68, 68, 0.5)'
              : '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: forecast.exitMode.isActive ? '0 0 16px rgba(239, 68, 68, 0.4)' : 'none',
          }}
        >
          <Navigation size={16} />
          <span>Exit Mode: {forecast.exitMode.isActive ? 'ACTIVE' : 'STANDBY'}</span>
        </button>
      </div>
    </div>
  );
};
