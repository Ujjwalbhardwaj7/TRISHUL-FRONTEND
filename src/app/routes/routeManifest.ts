export type PrimaryRouteId = 'command-center' | 'risk' | 'cases';
export type CaseRouteId = 'case' | 'prediction' | 'resolution' | 'audit';

export const primaryRoutes: Array<{ id: PrimaryRouteId; label: string; path: string }> = [
  { id: 'command-center', label: 'Command Center', path: '/command-center' },
  { id: 'risk', label: 'Payment Risk', path: '/risk' },
  { id: 'cases', label: 'Cases', path: '/cases' },
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
  if (route === 'cases') return isCaseWorkspacePath(pathname);
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
  const match = pathname.match(/^\/(cases|prediction|resolution|audit)\/([^/]+)$/);
  if (!match) return []; // unknown route — brand name is sufficient
  const label = caseTabs.find((tab) => tab.segment === match[1])?.label ?? 'Case';
  return ['Cases', decodeURIComponent(match[2]), label];
}
