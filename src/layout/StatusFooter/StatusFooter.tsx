import { useSystemStatus } from '../../state/hooks/useSystemStatus';

export function StatusFooter() {
  const { monitoringState } = useSystemStatus();
  return <footer className="status-footer"><span>TRISHUL operational workspace</span><span>{monitoringState === 'DEGRADED' ? 'Coverage degraded — verify available evidence.' : 'System state is shown explicitly when data is unavailable or abstained.'}</span></footer>;
}
