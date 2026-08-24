import type { SystemStatus } from '../../api/types/status';

export type EvidenceAvailability = 'AVAILABLE' | 'PARTIAL' | 'UNAVAILABLE';
export type CasePriority = 'HIGH' | 'STANDARD' | 'LOW';
export type InterventionPhase = 'ACTIVE_WINDOW' | 'ELEVATED_HORIZON' | 'MONITORING' | 'CASH_OUT_MAY_HAVE_OCCURRED' | 'CLOSED_OUTCOME_KNOWN';

export interface ExposureRange {
  minimum: number;
  maximum: number;
  currency: string;
}

export interface CaseForecast {
  status: Extract<SystemStatus, 'PREDICT' | 'ABSTAIN' | 'MONITORING'>;
  exitMode?: string;
  topZone?: string;
  timeHorizon?: string;
  evidence: EvidenceAvailability;
}

export interface CommandCenterCase {
  id: string;
  operationalStatus: Extract<SystemStatus, 'ACTIVE' | 'MONITORING' | 'CLOSED'>;
  riskStatus: Extract<SystemStatus, 'NORMAL' | 'ANOMALOUS' | 'WATCH' | 'SUSPECTED' | 'CRITICAL'>;
  exposure?: ExposureRange;
  forecast: CaseForecast;
  priority: CasePriority;
  lastUpdated: string;
}

export interface WatchActivityEvent {
  id: string;
  caseId: string;
  status: Extract<SystemStatus, 'WATCH' | 'ANOMALOUS'>;
  title: string;
  detail: string;
  occurredAt: string;
}

export interface InterventionRecord {
  id: string;
  caseId: string;
  status: Extract<SystemStatus, 'ACTIVE' | 'MONITORING' | 'CLOSED'>;
  phase: InterventionPhase;
  detail: string;
  updatedAt: string;
}

export interface RecentActivityEvent {
  id: string;
  caseId: string;
  title: string;
  detail: string;
  occurredAt: string;
}

export interface CommandCenterData {
  cases: CommandCenterCase[];
  watchActivity: WatchActivityEvent[];
  interventions: InterventionRecord[];
  recentActivity: RecentActivityEvent[];
  dataCompleteness: 'COMPLETE' | 'PARTIAL';
  dataNotice?: string;
}
