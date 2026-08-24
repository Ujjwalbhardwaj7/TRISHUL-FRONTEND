import React from 'react';
import { Card } from '../../../components/common/Card';
import { Badge } from '../../../components/common/Badge';
import { CashOutZone } from '../../../types/geo';
import { MapPin } from 'lucide-react';

interface CashOutZonesListProps {
  zones: CashOutZone[];
  selectedZoneId?: string | null;
  onSelectZone?: (id: string) => void;
}

export const CashOutZonesList: React.FC<CashOutZonesListProps> = ({
  zones,
  selectedZoneId,
  onSelectZone,
}) => {
  return (
    <Card
      title="Top-K Cash-Out Target Zones"
      subtitle="Ranked geographic prediction hubs by confidence & volume density"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {zones.map((zone, idx) => {
          const isSelected = zone.id === selectedZoneId;
          return (
            <div
              key={zone.id}
              onClick={() => onSelectZone?.(zone.id)}
              style={{
                padding: '0.875rem 1rem',
                background: isSelected ? 'rgba(56, 189, 248, 0.12)' : 'rgba(255, 255, 255, 0.025)',
                border: isSelected ? '1px solid rgba(56, 189, 248, 0.4)' : '1px solid rgba(255, 255, 255, 0.06)',
                borderRadius: '8px',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                cursor: 'pointer',
                transition: 'all 150ms ease',
                boxShadow: isSelected ? '0 0 12px rgba(56, 189, 248, 0.15)' : 'none',
              }}
            >
              {/* Top row: Rank, Zone Code, Name, Risk Badge */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                  <span
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: isSelected ? '#38bdf8' : 'rgba(56, 189, 248, 0.15)',
                      color: isSelected ? '#0f172a' : '#38bdf8',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    #{idx + 1}
                  </span>
                  <div>
                    <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#f8fafc' }}>
                      {zone.name}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: '#94a3b8', marginLeft: '0.5rem' }}>
                      ({zone.district})
                    </span>
                  </div>
                </div>

                <Badge type="risk" value={zone.riskLevel} />
              </div>

              {/* Middle row: Metrics */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', marginTop: '0.25rem' }}>
                <div style={{ background: 'rgba(0, 0, 0, 0.2)', padding: '0.375rem 0.5rem', borderRadius: '4px' }}>
                  <div style={{ fontSize: '0.65rem', color: '#64748b' }}>Confidence Score</div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#38bdf8', fontFamily: 'var(--font-mono)' }}>
                    {zone.confidenceScore}%
                  </div>
                </div>

                <div style={{ background: 'rgba(0, 0, 0, 0.2)', padding: '0.375rem 0.5rem', borderRadius: '4px' }}>
                  <div style={{ fontSize: '0.65rem', color: '#64748b' }}>Est. Volume</div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#f8fafc', fontFamily: 'var(--font-mono)' }}>
                    {zone.cashVolumeEstimate}
                  </div>
                </div>

                <div style={{ background: 'rgba(0, 0, 0, 0.2)', padding: '0.375rem 0.5rem', borderRadius: '4px' }}>
                  <div style={{ fontSize: '0.65rem', color: '#64748b' }}>ATM Density</div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#cbd5e1' }}>
                    {zone.atmClusterDensity}
                  </div>
                </div>
              </div>

              {/* Bottom row: Signal note */}
              <div style={{ fontSize: '0.725rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                <MapPin size={12} style={{ color: '#38bdf8' }} />
                <span>{zone.primarySignal}</span>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
