import React from 'react';
import { ForecastState, CashOutZone } from '../../../types/geo';
import { ShieldOff, MapPin, Navigation, Radar, Layers } from 'lucide-react';

interface MapPlaceholderProps {
  state: ForecastState;
  zones: CashOutZone[];
  exitModeActive: boolean;
  selectedZoneId?: string | null;
  onSelectZone?: (id: string) => void;
}

export const MapPlaceholder: React.FC<MapPlaceholderProps> = ({
  state,
  zones,
  exitModeActive,
  selectedZoneId,
  onSelectZone,
}) => {
  // CRITICAL REQUIREMENT: Map MUST NOT be displayed when geo forecast is withheld/ABSTAIN!
  if (state === 'ABSTAIN') {
    return (
      <div
        style={{
          height: '420px',
          background: 'rgba(15, 23, 42, 0.9)',
          border: '1px dashed rgba(100, 116, 139, 0.4)',
          borderRadius: '12px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          textAlign: 'center',
          gap: '1rem',
        }}
      >
        <div
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: 'rgba(100, 116, 139, 0.15)',
            color: '#94a3b8',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid rgba(100, 116, 139, 0.3)',
          }}
        >
          <ShieldOff size={28} />
        </div>

        <div style={{ maxWidth: '440px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f8fafc', marginBottom: '0.5rem' }}>
            Map Visualization Withheld (ABSTAIN State)
          </h3>
          <p style={{ fontSize: '0.8125rem', color: '#94a3b8', lineHeight: '1.5' }}>
            In compliance with TRISHUL evidence gate protocols, geo-spatial map rendering is suppressed when evidence coverage is insufficient. This prevents premature spatial field intervention.
          </p>
        </div>

        <div
          style={{
            padding: '0.375rem 0.875rem',
            background: 'rgba(255, 255, 255, 0.04)',
            borderRadius: '20px',
            fontSize: '0.75rem',
            color: '#cbd5e1',
            fontFamily: 'var(--font-mono)',
          }}
        >
          Minimum Required Evidence Gate: 75%
        </div>
      </div>
    );
  }

  // Active Spatial Canvas Rendering for MONITORING / CONFIRMED
  return (
    <div
      style={{
        height: '420px',
        background: 'radial-gradient(circle at 50% 50%, #0f172a 0%, #090d16 100%)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '12px',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: 'inset 0 0 40px rgba(0, 0, 0, 0.8)',
      }}
    >
      {/* Grid Pattern overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />

      {/* Radar sweep indicator */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.375rem 0.75rem',
          background: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '6px',
          fontSize: '0.75rem',
          color: '#38bdf8',
          zIndex: 10,
        }}
      >
        <Radar size={14} className="animate-spin" />
        <span>SPATIAL VECTOR ACTIVE ({state})</span>
      </div>

      {/* Exit mode indicator overlay */}
      {exitModeActive && (
        <div
          style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.375rem 0.75rem',
            background: 'rgba(239, 68, 68, 0.2)',
            border: '1px solid rgba(239, 68, 68, 0.4)',
            borderRadius: '6px',
            fontSize: '0.75rem',
            fontWeight: 700,
            color: '#fca5a5',
            zIndex: 10,
          }}
        >
          <Navigation size={14} />
          <span>EXIT MODE PERIMETER ENGAGED</span>
        </div>
      )}

      {/* Simulated Map Zone Nodes */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {zones.map((zone, idx) => {
          const isSelected = zone.id === selectedZoneId;
          const offsets = [
            { top: '35%', left: '42%' },
            { top: '55%', left: '68%' },
            { top: '65%', left: '30%' },
          ];
          const pos = offsets[idx % offsets.length];

          return (
            <div
              key={zone.id}
              onClick={() => onSelectZone?.(zone.id)}
              style={{
                position: 'absolute',
                top: pos.top,
                left: pos.left,
                transform: 'translate(-50%, -50%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                zIndex: isSelected ? 20 : 5,
              }}
            >
              <div
                style={{
                  width: isSelected ? '44px' : '36px',
                  height: isSelected ? '44px' : '36px',
                  borderRadius: '50%',
                  background: state === 'CONFIRMED' ? 'rgba(239, 68, 68, 0.25)' : isSelected ? 'rgba(56, 189, 248, 0.35)' : 'rgba(56, 189, 248, 0.15)',
                  border: state === 'CONFIRMED' ? '2px solid #ef4444' : isSelected ? '2px solid #38bdf8' : '1px solid rgba(56, 189, 248, 0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: isSelected ? '#38bdf8' : '#fff',
                  boxShadow: state === 'CONFIRMED' ? '0 0 18px rgba(239, 68, 68, 0.7)' : isSelected ? '0 0 20px rgba(56, 189, 248, 0.8)' : '0 0 12px rgba(56, 189, 248, 0.3)',
                  transition: 'all 200ms ease',
                }}
              >
                <MapPin size={isSelected ? 22 : 18} />
              </div>
              <div
                style={{
                  marginTop: '0.375rem',
                  padding: '0.25rem 0.5rem',
                  background: isSelected ? 'rgba(30, 41, 59, 0.95)' : 'rgba(15, 23, 42, 0.95)',
                  border: isSelected ? '1px solid #38bdf8' : '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '4px',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  color: isSelected ? '#38bdf8' : '#f8fafc',
                  whiteSpace: 'nowrap',
                }}
              >
                #{idx + 1} {zone.name} ({zone.confidenceScore}%)
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer controls on map */}
      <div
        style={{
          position: 'absolute',
          bottom: '12px',
          left: '12px',
          right: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.5rem 0.75rem',
          background: 'rgba(15, 23, 42, 0.85)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '8px',
          fontSize: '0.725rem',
          color: '#94a3b8',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Layers size={14} style={{ color: '#38bdf8' }} />
          <span>Spatial Layer: <strong>TRISHUL Tactical Grid v4</strong></span>
        </div>
        <div style={{ fontFamily: 'var(--font-mono)' }}>
          Lat: 28.6139° N | Lng: 77.2090° E
        </div>
      </div>
    </div>
  );
};
