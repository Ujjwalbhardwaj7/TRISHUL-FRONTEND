import React from 'react';
import { Card } from '../../../components/common/Card';
import { ExitModeStatus } from '../../../types/geo';
import { Power, Radio, Target } from 'lucide-react';

interface ExitModeCardProps {
  exitMode: ExitModeStatus;
  onToggleExitMode: () => void;
  onSetRadius: (radiusKm: number) => void;
}

export const ExitModeCard: React.FC<ExitModeCardProps> = ({
  exitMode,
  onToggleExitMode,
  onSetRadius,
}) => {
  const radii = [5, 10, 15, 25];

  return (
    <Card
      title="Exit Mode Operational Protocol"
      subtitle="Perimeter containment & transit corridor vector isolation"
      action={
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.375rem',
            padding: '0.2rem 0.5rem',
            borderRadius: '4px',
            fontSize: '0.7rem',
            fontFamily: 'var(--font-mono)',
            fontWeight: 700,
            background: exitMode.isActive ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255, 255, 255, 0.05)',
            color: exitMode.isActive ? '#fca5a5' : '#94a3b8',
            border: exitMode.isActive ? '1px solid rgba(239, 68, 68, 0.4)' : '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <Radio size={12} style={{ color: exitMode.isActive ? '#ef4444' : '#64748b' }} />
          <span>STATUS: {exitMode.protocolStatus}</span>
        </div>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {/* Interactive Radius Selector Buttons */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.375rem' }}>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
              <Target size={12} style={{ color: '#38bdf8' }} />
              Containment Radius:
            </span>
            <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#f8fafc', fontFamily: 'var(--font-mono)' }}>
              {exitMode.targetRadiusKm} km
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.375rem' }}>
            {radii.map((r) => {
              const isSelected = r === exitMode.targetRadiusKm;
              return (
                <button
                  key={r}
                  onClick={() => onSetRadius(r)}
                  style={{
                    padding: '0.375rem',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    fontWeight: isSelected ? 700 : 500,
                    fontFamily: 'var(--font-mono)',
                    cursor: 'pointer',
                    transition: 'all 150ms ease',
                    background: isSelected ? 'rgba(56, 189, 248, 0.2)' : 'rgba(255, 255, 255, 0.03)',
                    color: isSelected ? '#38bdf8' : '#94a3b8',
                    border: isSelected ? '1px solid rgba(56, 189, 248, 0.4)' : '1px solid rgba(255, 255, 255, 0.05)',
                  }}
                >
                  {r} km
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Interceptions Counter */}
        <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '0.625rem', borderRadius: '6px', border: '1px solid rgba(255, 255, 255, 0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Interception Vectors Engaged</span>
          <span style={{ fontSize: '0.95rem', fontWeight: 700, color: exitMode.isActive ? '#fca5a5' : '#cbd5e1', fontFamily: 'var(--font-mono)' }}>
            {exitMode.activeInterceptionsCount} Corridors
          </span>
        </div>

        {/* Main Protocol Trigger Button */}
        <button
          onClick={onToggleExitMode}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            padding: '0.625rem',
            borderRadius: '6px',
            fontSize: '0.8125rem',
            fontWeight: 700,
            cursor: 'pointer',
            border: 'none',
            transition: 'all 150ms ease',
            background: exitMode.isActive
              ? 'linear-gradient(135deg, #dc2626, #991b1b)'
              : 'linear-gradient(135deg, #2563eb, #1d4ed8)',
            color: '#ffffff',
            boxShadow: exitMode.isActive
              ? '0 0 12px rgba(239, 68, 68, 0.3)'
              : '0 0 12px rgba(37, 99, 235, 0.3)',
          }}
        >
          <Power size={14} />
          <span>{exitMode.isActive ? 'Deactivate Exit Mode Protocol' : 'Engage Exit Mode Protocol'}</span>
        </button>
      </div>
    </Card>
  );
};
