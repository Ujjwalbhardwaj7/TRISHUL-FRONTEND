import { useQuery } from '@tanstack/react-query';
import { getAuditOutcome } from '../api/getAuditOutcome';

export function useAuditOutcome(caseId: string) {
  return useQuery({ queryKey: ['audit-outcome', caseId], queryFn: () => getAuditOutcome(caseId) });
}
