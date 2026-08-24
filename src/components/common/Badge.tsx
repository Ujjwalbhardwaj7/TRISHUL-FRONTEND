import React from 'react';
import { ForecastState, RiskLevel, GateStatus } from '../../types/geo';

interface BadgeProps {
  type: 'state' | 'risk' | 'gate';
  value: ForecastState | RiskLevel | GateStatus | string;
  label?: string;
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({ type, value, label, icon }) => {
  const displayLabel = label || value;

  let className = 'badge ';

  if (type === 'state') {
    switch (value) {
      case 'ABSTAIN':
        className += 'badge-abstain';
        break;
      case 'MONITORING':
        className += 'badge-monitoring';
        break;
      case 'CONFIRMED':
        className += 'badge-critical';
        break;
      default:
        className += 'badge-abstain';
    }
  } else if (type === 'risk') {
    switch (value) {
      case 'MONITORED':
        className += 'badge-monitoring';
        break;
      case 'ELEVATED':
        className += 'badge-elevated';
        break;
      case 'CRITICAL':
        className += 'badge-critical';
        break;
      default:
        className += 'badge-abstain';
    }
  } else if (type === 'gate') {
    switch (value) {
      case 'VERIFIED':
        className += 'badge-monitoring';
        break;
      case 'OPEN':
        className += 'badge-elevated';
        break;
      case 'GATE_RESTRICTED':
        className += 'badge-abstain';
        break;
      default:
        className += 'badge-abstain';
    }
  }

  return (
    <span className={className}>
      {value === 'CONFIRMED' || value === 'CRITICAL' ? (
        <span className="urgent-beacon" />
      ) : null}
      {icon}
      {displayLabel}
    </span>
  );
};
