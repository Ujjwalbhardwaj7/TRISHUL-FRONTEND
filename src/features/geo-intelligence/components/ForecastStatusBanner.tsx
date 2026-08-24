import React from 'react';
import { ForecastState, EvidenceCoverage } from '../../../types/geo';
import { AlertCircle, Eye, ShieldAlert } from 'lucide-react';

interface ForecastStatusBannerProps {
  state: ForecastState;
  stateReason: string;
  evidenceCoverage: EvidenceCoverage;
}

export const ForecastStatusBanner: React.FC<ForecastStatusBannerProps> = ({
  state,
  stateReason,
  evidenceCoverage,
}) => {
  if (state === 'ABSTAIN') {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '1rem',
          padding: '1rem 1.25rem',
          background: 'rgba(100, 116, 139, 0.12)',
          border: '1px solid rgba(100, 116, 139, 0.3)',
          borderRadius: '10px',
          marginBottom: '1.25rem',
        }}
      >
        <div style={{ color: '#cbd5e1', marginTop: '0.125rem' }}>
          <AlertCircle size={22} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>FORECAST WITHHELD (ABSTAIN STATE)</span>
            <span style={{ fontSize: '0.75rem', fontWeight: 500, color: '#cbd5e1' }}>
              Coverage: {evidenceCoverage.overallPercent}% / {evidenceCoverage.minRequiredPercent}% Required
            </span>
          </div>
          <p style={{ fontSize: '0.8125rem', color: '#94a3b8', marginTop: '0.25rem', lineHeight: '1.4' }}>
            {stateReason || 'Geo-spatial forecast withheld due to insufficient evidence gate coverage. Map visualization is disabled to prevent premature or unverified field action.'}
          </p>
        </div>
      </div>
    );
  }

  if (state === 'MONITORING') {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '1rem',
          padding: '1rem 1.25rem',
          background: 'rgba(59, 130, 246, 0.1)',
          border: '1px solid rgba(59, 130, 246, 0.25)',
          borderRadius: '10px',
          marginBottom: '1.25rem',
        }}
      >
        <div style={{ color: '#60a5fa', marginTop: '0.125rem' }}>
          <Eye size={22} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>SIGNAL MONITORING ACTIVE</span>
            <span style={{ fontSize: '0.75rem', fontWeight: 500, color: '#93c5fd' }}>
              Evidence Coverage: {evidenceCoverage.overallPercent}% (Sufficient)
            </span>
          </div>
          <p style={{ fontSize: '0.8125rem', color: '#cbd5e1', marginTop: '0.25rem', lineHeight: '1.4' }}>
            {stateReason || 'Observational monitoring in effect. Geo-spatial prediction hubs highlighted for passive tracking and signal verification.'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '1rem',
        padding: '1rem 1.25rem',
        background: 'rgba(239, 68, 68, 0.15)',
        border: '1px solid rgba(239, 68, 68, 0.4)',
        borderRadius: '10px',
        marginBottom: '1.25rem',
      }}
    >
      <div style={{ color: '#fca5a5', marginTop: '0.125rem' }}>
        <ShieldAlert size={22} />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span>CONFIRMED HIGH-CONFIDENCE VECTOR (OPERATIONAL URGENCY)</span>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#fca5a5' }}>
            Evidence Coverage: {evidenceCoverage.overallPercent}%
          </span>
        </div>
        <p style={{ fontSize: '0.8125rem', color: '#fecdd3', marginTop: '0.25rem', lineHeight: '1.4' }}>
          {stateReason || 'Multi-signal evidence verification complete. High probability cash-out zone vector confirmed for operational action.'}
        </p>
      </div>
    </div>
  );
};
