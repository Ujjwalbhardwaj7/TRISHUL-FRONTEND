import { createContext, useContext, useMemo, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import type { CaseRouteId } from '../../app/routes/routeManifest';

export type CaseTab = CaseRouteId;
interface CaseContextValue { caseId: string | null; activeTab: CaseTab | null; }
const CaseContext = createContext<CaseContextValue | null>(null);

function readCaseContext(pathname: string): Pick<CaseContextValue, 'caseId' | 'activeTab'> {
  const match = pathname.match(/^\/(cases|prediction|resolution|audit)\/([^/]+)$/);
  if (!match) return { caseId: null, activeTab: null };
  return { caseId: decodeURIComponent(match[2]), activeTab: match[1] === 'cases' ? 'case' : match[1] as CaseTab };
}

export function CaseProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  const { caseId, activeTab } = readCaseContext(location.pathname);
  const value = useMemo<CaseContextValue>(() => ({ caseId, activeTab }), [activeTab, caseId]);
  return <CaseContext.Provider value={value}>{children}</CaseContext.Provider>;
}

export function useCase(): CaseContextValue {
  const context = useContext(CaseContext);
  if (!context) throw new Error('useCase must be used inside CaseProvider');
  return context;
}
