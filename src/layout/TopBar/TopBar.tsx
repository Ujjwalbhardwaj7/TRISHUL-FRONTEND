import { useLocation } from 'react-router-dom';
import { APP_NAME } from '../../lib/constants';
import { getBreadcrumbs } from '../../app/routes/routeManifest';
import { useNavigationState } from '../../state/providers/NavigationStateProvider';
import { useSystemStatus } from '../../state/hooks/useSystemStatus';

export function TopBar() {
  const { toggleSidebar } = useNavigationState();
  const { monitoringState } = useSystemStatus();
  const { pathname } = useLocation();
  const breadcrumbs = getBreadcrumbs(pathname);
  return <header className="top-bar"><div className="top-bar__identity"><button type="button" className="menu-button" onClick={toggleSidebar} aria-label="Toggle navigation" aria-controls="primary-navigation">☰</button><span className="brand-mark" aria-hidden="true">T</span><span className="brand-name">{APP_NAME}</span></div><nav className="breadcrumbs" aria-label="Breadcrumb">{breadcrumbs.map((crumb, index) => <span key={`${crumb}-${index}`}>{crumb}</span>)}</nav><span className={`monitoring-indicator monitoring-indicator--${monitoringState.toLowerCase()}`}><span aria-hidden="true" />{monitoringState === 'ACTIVE' ? 'Monitoring active' : `Monitoring ${monitoringState.toLowerCase()}`}</span></header>;
}
