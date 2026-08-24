import React from 'react';
import { TimeHorizonHours } from '../../../types/geo';
import { Clock } from 'lucide-react';

interface TimeHorizonSelectorProps {
  selectedHorizon: TimeHorizonHours;
  onSelectHorizon: (horizon: TimeHorizonHours) => void;
}

export const TimeHorizonSelector: React.FC<TimeHorizonSelectorProps> = ({
  selectedHorizon,
  onSelectHorizon,
}) => {
  const horizons: TimeHorizonHours[] = [1, 6, 12, 24, 48];

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.75rem 1rem',
        background: 'rgba(17, 24, 39, 0.6)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '10px',
        marginBottom: '1.25rem',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8125rem', color: '#94a3b8', fontWeight: 600 }}>
        <Clock size={16} style={{ color: '#38bdf8' }} />
        <span>Prediction Time Horizon:</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
        {horizons.map((h) => {
          const isSelected = h === selectedHorizon;
          return (
            <button
              key={h}
              onClick={() => onSelectHorizon(h)}
              style={{
                padding: '0.375rem 0.75rem',
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
              +{h}h
            </button>
          );
        })}
      </div>
    </div>
  );
};
