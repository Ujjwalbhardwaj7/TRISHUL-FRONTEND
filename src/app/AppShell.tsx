import { Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { ErrorBoundary, ErrorState, LoadingState } from '../design-system/components';
import { CaseContextBar } from '../layout/CaseContextBar/CaseContextBar';
import { MainViewport } from '../layout/MainViewport/MainViewport';
import { SideNav } from '../layout/SideNav/SideNav';
import { StatusFooter } from '../layout/StatusFooter/StatusFooter';
import { TopBar } from '../layout/TopBar/TopBar';
import { useNavigationState } from '../state/providers/NavigationStateProvider';

export function AppShell() {
  const { sidebarCollapsed } = useNavigationState();
  const location = useLocation();
  return <div className={`app-shell ${sidebarCollapsed ? 'app-shell--nav-collapsed' : ''}`}><TopBar /><SideNav /><div className="app-shell__content"><CaseContextBar /><MainViewport><ErrorBoundary resetKey={location.pathname} fallback={(error) => <ErrorState error={error} />}><Suspense fallback={<LoadingState variant="route" />}><Outlet /></Suspense></ErrorBoundary></MainViewport><StatusFooter /></div></div>;
}
