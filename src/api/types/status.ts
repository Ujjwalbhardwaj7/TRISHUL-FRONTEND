export const SYSTEM_STATUS_VALUES = [
  'NORMAL',
  'ANOMALOUS',
  'WATCH',
  'SUSPECTED',
  'ACTIVE',
  'MONITORING',
  'PREDICT',
  'ABSTAIN',
  'CRITICAL',
  'CLOSED',
] as const;

export type SystemStatus = typeof SYSTEM_STATUS_VALUES[number];

export type MonitoringState = 'ACTIVE' | 'PAUSED' | 'DEGRADED';
