import { Link, useLocation } from 'react-router-dom';
import { isPrimaryRouteActive, primaryRoutes } from '../../app/routes/routeManifest';
import { useNavigationState } from '../../state/providers/NavigationStateProvider';
import { useBreakpoint } from '../../state/hooks/useBreakpoint';

export function SideNav() {
  const { sidebarCollapsed, setSidebarCollapsed } = useNavigationState();
  const breakpoint = useBreakpoint();
  const location = useLocation();
  const isOpen = breakpoint !== 'mobile' || !sidebarCollapsed;
  const closeOnMobile = () => { if (breakpoint === 'mobile') setSidebarCollapsed(true); };
  const currentPath = location.pathname;
  return <aside className={`side-nav ${sidebarCollapsed ? 'side-nav--collapsed' : ''} ${isOpen ? 'side-nav--open' : ''}`}><nav id="primary-navigation" aria-labelledby="workspace-navigation-heading"><h2 id="workspace-navigation-heading" className="side-nav__label">Workspace</h2>{primaryRoutes.map((route) => { const active = isPrimaryRouteActive(route.id, currentPath); return <Link key={route.id} to={route.path} onClick={closeOnMobile} aria-current={active ? 'page' : undefined} className={`side-nav__link ${active ? 'is-active' : ''}`}><span className="side-nav__icon" aria-hidden="true">{route.label[0]}</span><span>{route.label}</span></Link>; })}</nav></aside>;
}
