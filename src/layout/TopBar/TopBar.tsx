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

  return (
    <header className="top-bar">
      <div className="top-bar__left">
        <button
          type="button"
          className="menu-button"
          onClick={toggleSidebar}
          aria-label="Toggle navigation"
          aria-controls="primary-navigation"
        >
          ☰
        </button>
        <div className="top-bar__dossier-label">
          <span className="top-bar__file-type">FINANCIAL INTELLIGENCE FILE</span>
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <span className="breadcrumbs__root">{APP_NAME}</span>
            {breadcrumbs.map((crumb, index) => (
              <span key={`${crumb}-${index}`}>{crumb}</span>
            ))}
          </nav>
        </div>
      </div>

      <div className="top-bar__right">
        <span className="top-bar__working-tag">WORKING DOSSIER</span>
        <span
          className={`monitoring-indicator monitoring-indicator--${monitoringState.toLowerCase()}`}
        >
          <span aria-hidden="true" />
          {monitoringState === 'ACTIVE'
            ? 'LIVE MONITORING'
            : `MONITORING ${monitoringState.toUpperCase()}`}
        </span>
      </div>
    </header>
  );
}
