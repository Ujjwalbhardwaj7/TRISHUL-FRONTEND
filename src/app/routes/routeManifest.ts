export type PrimaryRouteId = 'command-center' | 'risk' | 'cases' | 'prediction' | 'resolution' | 'audit';
export type CaseRouteId = 'case' | 'prediction' | 'resolution' | 'audit';

export const primaryRoutes: Array<{ id: PrimaryRouteId; label: string; path: string; index: string; status?: string }> = [
  { id: 'command-center', label: 'Command Center', path: '/command-center', index: '01', status: 'ACTIVE' },
  { id: 'risk', label: 'Payment Risk', path: '/risk', index: '02', status: 'READY' },
  { id: 'cases', label: 'Cases', path: '/cases', index: '03', status: 'READY' },
  { id: 'prediction', label: 'Prediction', path: '/prediction', index: '04', status: 'MONITORING' },
  { id: 'resolution', label: 'Secure Resolution', path: '/resolution', index: '05', status: 'RESTRICTED' },
  { id: 'audit', label: 'Audit / Outcomes', path: '/audit', index: '06', status: 'LEDGER' },
];

export const caseTabs = [
  { id: 'case', label: 'Case', segment: 'cases' },
  { id: 'prediction', label: 'Prediction', segment: 'prediction' },
  { id: 'resolution', label: 'Resolution', segment: 'resolution' },
  { id: 'audit', label: 'Audit', segment: 'audit' },
] as const;

export function isCaseWorkspacePath(pathname: string): boolean {
  return /^\/(?:cases|prediction|resolution|audit)(?:\/|$)/.test(pathname);
}

export function isPrimaryRouteActive(route: PrimaryRouteId, pathname: string): boolean {
  if (route === 'cases' && pathname.startsWith('/cases')) return true;
  if (route === 'prediction' && pathname.startsWith('/prediction')) return true;
  if (route === 'resolution' && pathname.startsWith('/resolution')) return true;
  if (route === 'audit' && pathname.startsWith('/audit')) return true;
  return primaryRoutes.find((item) => item.id === route)?.path === pathname;
}

export function getCaseRoutePath(caseId: string, tab: CaseRouteId): string {
  const segment = caseTabs.find((item) => item.id === tab)?.segment ?? 'cases';
  return `/${segment}/${encodeURIComponent(caseId)}`;
}

export function getBreadcrumbs(pathname: string): string[] {
  if (pathname === '/command-center') return ['Command Center'];
  if (pathname === '/risk') return ['Payment Risk'];
  if (pathname === '/cases') return ['Cases'];
  if (pathname === '/prediction') return ['Prediction'];
  if (pathname === '/resolution') return ['Secure Resolution'];
  if (pathname === '/audit') return ['Audit / Outcomes'];
  const match = pathname.match(/^\/(cases|prediction|resolution|audit)\/([^/]+)$/);
  if (!match) return [];
  const label = caseTabs.find((tab) => tab.segment === match[1])?.label ?? 'Case';
  return ['Cases', decodeURIComponent(match[2]), label];
}
