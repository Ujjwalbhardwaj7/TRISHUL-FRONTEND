import React from 'react';
import { Shield, Radio, Activity, Cpu } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header
      style={{
        height: '60px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        background: 'rgba(17, 24, 39, 0.8)',
        backdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 1.5rem',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, #2563eb, #0891b2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            boxShadow: '0 0 12px rgba(37, 99, 235, 0.4)',
          }}
        >
          <Shield size={18} />
        </div>
        <div>
          <div style={{ fontSize: '0.95rem', fontWeight: 800, letterSpacing: '0.05em', color: '#f8fafc' }}>
            TRISHUL <span style={{ color: '#38bdf8', fontWeight: 400, fontSize: '0.75rem' }}>v2.6</span>
          </div>
          <div style={{ fontSize: '0.65rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Geo-Spatial & Prediction Intelligence
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: '#94a3b8' }}>
          <Activity size={14} style={{ color: '#10b981' }} />
          <span>Engine Status: <strong style={{ color: '#f8fafc' }}>ONLINE</strong></span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: '#94a3b8' }}>
          <Radio size={14} style={{ color: '#38bdf8' }} />
          <span>Real-time Stream: <strong style={{ color: '#f8fafc' }}>ACTIVE</strong></span>
        </div>

        <div
          style={{
            padding: '0.25rem 0.625rem',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '6px',
            fontSize: '0.75rem',
            fontFamily: 'var(--font-mono)',
            color: '#cbd5e1',
            display: 'flex',
            alignItems: 'center',
            gap: '0.375rem',
          }}
        >
          <Cpu size={14} style={{ color: '#a855f7' }} />
          <span>MODEL: TRISHUL-GEO-v4</span>
        </div>
      </div>
    </header>
  );
};
