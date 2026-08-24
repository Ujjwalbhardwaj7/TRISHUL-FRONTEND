import { useQuery } from '@tanstack/react-query';
import { getResolutionData } from '../api/getResolutionData';

export function useResolutionData(caseId: string) {
  return useQuery({ queryKey: ['secure-resolution', caseId], queryFn: () => getResolutionData(caseId) });
}
