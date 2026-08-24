import { useNavigate } from 'react-router-dom';
import { caseTabs, getCaseRoutePath } from '../../app/routes/routeManifest';
import { Tabs } from '../../design-system/components';
import { useCaseContext } from '../../state/hooks/useCaseContext';
import { useBreakpoint } from '../../state/hooks/useBreakpoint';

export function CaseContextBar() {
  const { caseId, activeTab } = useCaseContext();
  const navigate = useNavigate();
  const breakpoint = useBreakpoint();
  if (!caseId || !activeTab) return null;
  const items = caseTabs.map((tab) => ({ id: tab.id, label: tab.label, to: getCaseRoutePath(caseId, tab.id) }));
  return <section className="case-context-bar" aria-label="Case context"><span>Case {caseId}</span>{breakpoint === 'mobile' ? <label>View<select value={activeTab} onChange={(event) => navigate(getCaseRoutePath(caseId, event.target.value as typeof activeTab))}>{items.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}</select></label> : <Tabs label="Case sections" activeId={activeTab} items={items} />}</section>;
}
