import type { ResolutionData } from '../resolution.types';

/** Development-only capability fixture. No identity document data is included. */
export function getResolutionFixture(caseId: string): ResolutionData {
  return {
    caseId,
    caseState: 'ACTIVE',
    tracedReference: 'DEV-TRX-000184',
    tracedAccount: '•••• 9038',
    institution: 'Development institution',
    credential: {
      role: 'Authorised investigator',
      purpose: 'Case-linked identity-resolution request',
      issuer: 'Development credential issuer',
      state: 'GRANTED',
      verification: 'VERIFIED',
      requirements: ['Case-linked purpose', 'Valid investigator credential', 'Institution approval'],
    },
    request: {
      targetInstitution: 'Development institution',
      purpose: 'Resolve the traced account only for the active case context.',
      action: 'Identity-resolution request recorded',
      requestedAt: '2026-08-25T10:14:00+05:30',
      state: 'PENDING',
      auditReference: 'DEV-AUD-RES-0142',
    },
    result: {
      state: 'PENDING',
      permittedInformation: [],
      rationale: 'The institution has not returned a permitted result for this scoped request.',
    },
    accessRationale: 'The credential is verified for a case-linked purpose; institution approval is still required before a result can be returned.',
  };
}
