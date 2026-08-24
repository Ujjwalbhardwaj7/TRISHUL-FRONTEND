import { useQuery } from '@tanstack/react-query';
import { getCaseIntelligence } from '../api/getCaseIntelligence';

export function useCaseIntelligence(caseId: string) {
  return useQuery({ queryKey: ['case-intelligence', caseId], queryFn: () => getCaseIntelligence(caseId) });
}
