import React from 'react';
import { Card } from '../../../components/common/Card';
import { EvidenceCoverage, EvidenceGateStatus } from '../../../types/geo';
import { ShieldCheck, ShieldAlert } from 'lucide-react';

interface EvidenceGateCardProps {
  coverage: EvidenceCoverage;
  gate: EvidenceGateStatus;
}

export const EvidenceGateCard: React.FC<EvidenceGateCardProps> = ({ coverage, gate }) => {
  const isPass = coverage.isCoverageSufficient;

  return (
    <Card
      title="Evidence Gate & Coverage"
      subtitle={`Min Threshold: ${coverage.minRequiredPercent}% | Current: ${coverage.overallPercent}%`}
      action={
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.75rem', fontWeight: 600, color: isPass ? '#60a5fa' : '#cbd5e1' }}>
          {isPass ? <ShieldCheck size={16} /> : <ShieldAlert size={16} />}
          <span>{gate.status}</span>
        </div>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {/* Main Progress Bar */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.375rem' }}>
            <span style={{ color: '#94a3b8' }}>Verified Signals ({coverage.verifiedFeaturesCount}/{coverage.totalFeaturesCount})</span>
            <span style={{ color: isPass ? '#60a5fa' : '#fde047', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
              {coverage.overallPercent}%
            </span>
          </div>
          <div style={{ height: '8px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '4px', overflow: 'hidden', position: 'relative' }}>
            {/* Required threshold marker line */}
            <div
              style={{
                position: 'absolute',
                left: `${coverage.minRequiredPercent}%`,
                top: 0,
                bottom: 0,
                width: '2px',
                background: '#fde047',
                zIndex: 2,
              }}
              title={`Required Threshold: ${coverage.minRequiredPercent}%`}
            />
            <div
              style={{
                height: '100%',
                width: `${coverage.overallPercent}%`,
                background: isPass
                  ? 'linear-gradient(90deg, #2563eb, #38bdf8)'
                  : 'linear-gradient(90deg, #64748b, #94a3b8)',
                transition: 'width 300ms ease',
              }}
            />
          </div>
        </div>

        {/* Signal Category Breakdown */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.625rem' }}>
          {Object.entries(coverage.featureBreakdown).map(([key, val]) => {
            const labelMap: Record<string, string> = {
              spatialSignals: 'Spatial Signals',
              temporalPattern: 'Temporal Pattern',
              behavioralAnomalies: 'Behavioral Anomalies',
              networkGraphLinkage: 'Network Linkage',
            };
            return (
              <div
                key={key}
                style={{
                  padding: '0.5rem 0.625rem',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  borderRadius: '6px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#94a3b8' }}>
                  <span>{labelMap[key] || key}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: '#f8fafc' }}>{val}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
};
