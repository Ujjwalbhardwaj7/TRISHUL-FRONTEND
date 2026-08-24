import type { CommandCenterData } from '../commandCenter.types';

/** Development-only fixture. It does not represent a production backend response. */
export const commandCenterFixture: CommandCenterData = {
  cases: [
    {
      id: 'CC-1042',
      operationalStatus: 'ACTIVE',
      riskStatus: 'SUSPECTED',
      exposure: { minimum: 10000, maximum: 30000, currency: 'INR' },
      forecast: { status: 'PREDICT', exitMode: 'Cash-out route', topZone: 'Zone supplied by development fixture', timeHorizon: 'Next 45 minutes', evidence: 'PARTIAL' },
      priority: 'HIGH',
      lastUpdated: '2026-08-25T10:12:00+05:30',
    },
    {
      id: 'CC-1047',
      operationalStatus: 'ACTIVE',
      riskStatus: 'WATCH',
      exposure: { minimum: 5000, maximum: 12000, currency: 'INR' },
      forecast: { status: 'ABSTAIN', evidence: 'UNAVAILABLE' },
      priority: 'HIGH',
      lastUpdated: '2026-08-25T10:04:00+05:30',
    },
    {
      id: 'CC-1039',
      operationalStatus: 'MONITORING',
      riskStatus: 'ANOMALOUS',
      forecast: { status: 'MONITORING', exitMode: 'Monitoring for additional evidence', evidence: 'PARTIAL' },
      priority: 'STANDARD',
      lastUpdated: '2026-08-25T09:48:00+05:30',
    },
  ],
  watchActivity: [
    { id: 'watch-1', caseId: 'CC-1042', status: 'WATCH', title: 'Receiver behavioural risk increased', detail: 'Recent pass-through activity increased relative to the available baseline.', occurredAt: '2026-08-25T10:12:00+05:30' },
    { id: 'watch-2', caseId: 'CC-1047', status: 'ANOMALOUS', title: 'New downstream transfer observed', detail: 'A new transfer hop is available for analyst review.', occurredAt: '2026-08-25T10:04:00+05:30' },
  ],
  interventions: [
    { id: 'intervention-1', caseId: 'CC-1042', status: 'ACTIVE', phase: 'ACTIVE_WINDOW', detail: 'Partner intervention window is active for the currently available evidence.', updatedAt: '2026-08-25T10:12:00+05:30' },
    { id: 'intervention-2', caseId: 'CC-1047', status: 'MONITORING', phase: 'ELEVATED_HORIZON', detail: 'Monitoring remains active while further transaction evidence is collected.', updatedAt: '2026-08-25T10:04:00+05:30' },
    { id: 'intervention-3', caseId: 'CC-1031', status: 'CLOSED', phase: 'CLOSED_OUTCOME_KNOWN', detail: 'Outcome is recorded; no active intervention window remains.', updatedAt: '2026-08-25T09:31:00+05:30' },
  ],
  recentActivity: [
    { id: 'activity-1', caseId: 'CC-1042', title: 'Forecast recomputed', detail: 'A development fixture forecast summary is available with partial evidence coverage.', occurredAt: '2026-08-25T10:12:00+05:30' },
    { id: 'activity-2', caseId: 'CC-1047', title: 'Exposure range updated', detail: 'Attributable exposure remains a range after available flow analysis.', occurredAt: '2026-08-25T10:04:00+05:30' },
    { id: 'activity-3', caseId: 'CC-1039', title: 'Monitoring continued', detail: 'Additional evidence is required before a forecast can be made.', occurredAt: '2026-08-25T09:48:00+05:30' },
  ],
  dataCompleteness: 'PARTIAL',
  dataNotice: 'Forecast coverage is partial. Cases with ABSTAIN intentionally withhold geographic detail until sufficient evidence is available.',
};
