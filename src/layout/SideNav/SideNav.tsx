import { Link, useLocation } from 'react-router-dom';
import { getCaseRoutePath, isPrimaryRouteActive, primaryRoutes } from '../../app/routes/routeManifest';
import { useNavigationState } from '../../state/providers/NavigationStateProvider';
import { useBreakpoint } from '../../state/hooks/useBreakpoint';
import { useCaseContext } from '../../state/hooks/useCaseContext';
import trishulMark from '../../assets/trishul-mark.png';

export function SideNav() {
  const { sidebarCollapsed, setSidebarCollapsed } = useNavigationState();
  const breakpoint = useBreakpoint();
  const { caseId } = useCaseContext();
  const location = useLocation();
  const isOpen = breakpoint !== 'mobile' || !sidebarCollapsed;
  const closeOnMobile = () => {
    if (breakpoint === 'mobile') setSidebarCollapsed(true);
  };
  const currentPath = location.pathname;

  return (
    <aside
      className={`side-nav ${sidebarCollapsed ? 'side-nav--collapsed' : ''} ${isOpen ? 'side-nav--open' : ''}`}
    >
      <nav id="primary-navigation" aria-labelledby="workspace-navigation-heading">
        <div className="side-nav__brand">
          <div className="side-nav__brand-header">
            <img className="side-nav__brand-icon" src={trishulMark} alt="" />
            <div>
              <strong className="side-nav__brand-title">TRISHUL</strong>
              <span className="side-nav__brand-descriptor">CANDIDATE DOSSIER ENGINE</span>
            </div>
          </div>
          <div className="side-nav__brand-dossier">
            <span>TRISHUL / FRAUD INTELLIGENCE / 2026</span>
            <span>CASE-TO-CASH-OUT SYSTEM</span>
          </div>
        </div>

        <div className="side-nav__section-heading">
          <h2 id="workspace-navigation-heading" className="side-nav__label">
            YOUR WORKSPACES
          </h2>
          <span className="side-nav__count">06 SECTIONS</span>
        </div>

        <div className="side-nav__links">
          {primaryRoutes.map((route) => {
            const active = isPrimaryRouteActive(route.id, currentPath);
            const targetPath = caseId && (route.id === 'cases' || route.id === 'prediction' || route.id === 'resolution' || route.id === 'audit')
              ? getCaseRoutePath(caseId, route.id === 'cases' ? 'case' : route.id)
              : route.path;

            return (
              <Link
                key={route.id}
                to={targetPath}
                onClick={closeOnMobile}
                aria-current={active ? 'page' : undefined}
                className={`side-nav__link ${active ? 'is-active' : ''}`}
              >
                <div className="side-nav__link-main">
                  <span className="side-nav__index" aria-hidden="true">
                    {route.index}
                  </span>
                  <div className="side-nav__link-text">
                    <span className="side-nav__link-title">{route.label}</span>
                    <span className="side-nav__link-desc">
                      {route.id === 'command-center' && 'Active cases & overview'}
                      {route.id === 'risk' && 'Trust & behavioural verification'}
                      {route.id === 'cases' && 'Evidence graph & provenance'}
                      {route.id === 'prediction' && 'Zone & cash-out forecast'}
                      {route.id === 'resolution' && 'Scoped identity access'}
                      {route.id === 'audit' && 'Ledger & outcome verification'}
                    </span>
                  </div>
                </div>
                {route.status && (
                  <span className="side-nav__status-tag">{route.status}</span>
                )}
              </Link>
            );
          })}
        </div>

        <div className="side-nav__footer">
          <div className="side-nav__footer-row">
            <span>Method</span>
            <strong>Deterministic ordering</strong>
          </div>
          <div className="side-nav__footer-row">
            <span>Engine</span>
            <code>engine-0.2.0</code>
          </div>
        </div>
      </nav>
    </aside>
  );
}
