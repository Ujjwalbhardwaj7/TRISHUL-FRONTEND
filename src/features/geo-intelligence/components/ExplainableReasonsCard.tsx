import React from 'react';
import { Card } from '../../../components/common/Card';
import { ExplainableReason } from '../../../types/geo';
import { Network, Clock, MapPin, Cpu } from 'lucide-react';

interface ExplainableReasonsCardProps {
  reasons: ExplainableReason[];
}

export const ExplainableReasonsCard: React.FC<ExplainableReasonsCardProps> = ({ reasons }) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'TEMPORAL':
        return <Clock size={14} style={{ color: '#38bdf8' }} />;
      case 'SPATIAL':
        return <MapPin size={14} style={{ color: '#34d399' }} />;
      case 'NETWORK':
        return <Network size={14} style={{ color: '#a855f7' }} />;
      default:
        return <Cpu size={14} style={{ color: '#f59e0b' }} />;
    }
  };

  return (
    <Card
      title="Explainable Prediction Rationale"
      subtitle="Transparent signal attributions & evidence weight factorization"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
        {reasons.map((reason) => (
          <div
            key={reason.id}
            style={{
              padding: '0.875rem',
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              borderRadius: '8px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.375rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {getCategoryIcon(reason.category)}
                <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#f8fafc' }}>
                  {reason.title}
                </span>
                <span
                  style={{
                    fontSize: '0.65rem',
                    padding: '0.125rem 0.375rem',
                    background: 'rgba(255, 255, 255, 0.06)',
                    borderRadius: '4px',
                    color: '#94a3b8',
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  {reason.category}
                </span>
              </div>

              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#38bdf8', fontFamily: 'var(--font-mono)' }}>
                Weight: {reason.importanceWeight}%
              </div>
            </div>

            <p style={{ fontSize: '0.8rem', color: '#94a3b8', lineHeight: '1.4', marginBottom: '0.5rem' }}>
              {reason.description}
            </p>

            {/* Feature Weight Progress Bar */}
            <div style={{ height: '4px', background: 'rgba(255, 255, 255, 0.06)', borderRadius: '2px', overflow: 'hidden' }}>
              <div
                style={{
                  height: '100%',
                  width: `${reason.importanceWeight}%`,
                  background: 'linear-gradient(90deg, #3b82f6, #06b6d4)',
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
