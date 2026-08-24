import React from 'react';

interface StatMetricProps {
  label: string;
  value: string | number;
  subtext?: string;
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  color?: 'default' | 'primary' | 'elevated' | 'critical' | 'muted';
}

export const StatMetric: React.FC<StatMetricProps> = ({
  label,
  value,
  subtext,
  icon,
  color = 'default',
}) => {
  let valueColor = '#f8fafc';
  if (color === 'primary') valueColor = '#60a5fa';
  if (color === 'elevated') valueColor = '#fde047';
  if (color === 'critical') valueColor = '#fca5a5';
  if (color === 'muted') valueColor = '#94a3b8';

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.25rem',
        padding: '0.75rem 1rem',
        background: 'rgba(255, 255, 255, 0.03)',
        borderRadius: '8px',
        border: '1px solid rgba(255, 255, 255, 0.05)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 500 }}>{label}</span>
        {icon && <span style={{ color: '#64748b' }}>{icon}</span>}
      </div>
      <div style={{ fontSize: '1.25rem', fontWeight: 700, color: valueColor, fontFamily: 'var(--font-mono)' }}>
        {value}
      </div>
      {subtext && (
        <span style={{ fontSize: '0.7rem', color: '#64748b' }}>
          {subtext}
        </span>
      )}
    </div>
  );
};
