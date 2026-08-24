import type { AuditOutcomeData } from '../audit.types';

/** Development-only audit fixture. Hashes and outcome data are placeholders, not production evidence. */
export function getAuditFixture(caseId: string): AuditOutcomeData {
  return {
    caseId,
    graphVersion: 'DEV-GRAPH-07',
    latestEventAt: '2026-08-25T10:14:00+05:30',
    caseState: 'MONITORING',
    evidenceIntegrity: { evidenceId: 'DEV-EVID-0142', evidenceHash: 'dev-sha256-7d54f4c1', anchorState: 'ANCHORED', verification: 'VERIFIED', detail: 'The fixture records a matching evidence digest and anchor reference. It does not represent blockchain storage of case data.' },
    comparison: { predictedExitMode: 'Monitoring continued', predictedZone: null, predictedTimeHorizon: 'Next 45 minutes', actualExitMode: null, actualZoneOrTime: null, result: 'No actual outcome has been recorded; no exact forecast conclusion was issued.' },
    outcome: { state: 'MONITORING', recordedHistory: null },
    history: [
      { id: 'audit-1', occurredAt: '2026-08-25T09:42:00+05:30', actor: 'Payment ingestion', action: 'Transaction anchor recorded', provenance: 'Development event log', status: 'RECORDED', auditReference: 'DEV-AUD-001' },
      { id: 'audit-2', occurredAt: '2026-08-25T09:45:00+05:30', actor: 'Credential verifier', action: 'Investigator credential verified', provenance: 'Development credential event', status: 'VERIFIED', auditReference: 'DEV-AUD-002' },
      { id: 'audit-3', occurredAt: '2026-08-25T10:04:00+05:30', actor: 'Graph analysis', action: 'Evidence range refreshed', provenance: 'Development graph analysis', status: 'RECORDED', auditReference: 'DEV-AUD-003' },
      { id: 'audit-4', occurredAt: '2026-08-25T10:12:00+05:30', actor: 'Prediction service', action: 'Monitoring forecast recorded', provenance: 'Development prediction event', status: 'RECORDED', auditReference: 'DEV-AUD-004' },
      { id: 'audit-5', occurredAt: '2026-08-25T10:14:00+05:30', actor: 'Resolution workflow', action: 'Identity-resolution request recorded', provenance: 'Development resolution event', status: 'PENDING', auditReference: 'DEV-AUD-RES-0142' },
    ],
  };
}
