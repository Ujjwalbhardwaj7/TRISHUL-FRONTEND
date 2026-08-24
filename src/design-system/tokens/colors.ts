/**
 * CSS custom properties in styles/globals.css are the canonical TRISHUL colour
 * values. These references keep TypeScript consumers on the same token system.
 */
export const color = {
  surface: {
    base: 'var(--color-surface-base)',
    raised: 'var(--color-surface-raised)',
    sunken: 'var(--color-surface-sunken)',
    overlay: 'var(--color-surface-overlay)',
  },
  text: {
    primary: 'var(--color-text-primary)',
    secondary: 'var(--color-text-secondary)',
    muted: 'var(--color-text-muted)',
    onCritical: 'var(--color-text-on-critical)',
  },
  border: {
    subtle: 'var(--color-border-subtle)',
    strong: 'var(--color-border-strong)',
    focus: 'var(--color-border-focus)',
  },
  status: {
    normal: 'var(--color-status-normal)',
    anomalous: 'var(--color-status-anomalous)',
    watch: 'var(--color-status-watch)',
    suspected: 'var(--color-status-suspected)',
    active: 'var(--color-status-active)',
    monitoring: 'var(--color-status-monitoring)',
    predict: 'var(--color-status-predict)',
    abstain: 'var(--color-status-abstain)',
    // Red is reserved for confirmed operational urgency only.
    critical: 'var(--color-status-critical)',
    closed: 'var(--color-status-closed)',
  },
} as const;
