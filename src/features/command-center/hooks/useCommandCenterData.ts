import { useQuery } from '@tanstack/react-query';
import { getCommandCenterData } from '../api/getCommandCenterData';

export function useCommandCenterData() {
  return useQuery({ queryKey: ['command-center'], queryFn: getCommandCenterData });
}
