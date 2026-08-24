import React from 'react';

interface CardProps {
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  headerBorder?: boolean;
}

export const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  action,
  children,
  className = '',
  headerBorder = true,
}) => {
  return (
    <div className={`glass-card ${className}`}>
      {(title || action) && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingBottom: headerBorder && (title || subtitle) ? '0.75rem' : '0',
            marginBottom: (title || subtitle) ? '1rem' : '0',
            borderBottom: headerBorder && (title || subtitle) ? '1px solid rgba(255, 255, 255, 0.08)' : 'none',
          }}
        >
          <div>
            {title && (
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f8fafc', letterSpacing: '-0.01em' }}>
                {title}
              </h3>
            )}
            {subtitle && (
              <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.125rem' }}>
                {subtitle}
              </p>
            )}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      {children}
    </div>
  );
};
