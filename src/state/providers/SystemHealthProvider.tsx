import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import type { MonitoringState } from '../../api/types/status';

interface SystemHealthContextValue { monitoringState: MonitoringState; setMonitoringState: (state: MonitoringState) => void; }
const SystemHealthContext = createContext<SystemHealthContextValue | null>(null);

export function SystemHealthProvider({ children }: { children: ReactNode }) {
  const [monitoringState, setMonitoringState] = useState<MonitoringState>('ACTIVE');
  const announcement = monitoringState === 'ACTIVE' ? 'Monitoring active' : `Monitoring ${monitoringState.toLowerCase()}`;
  const value = useMemo(() => ({ monitoringState, setMonitoringState }), [monitoringState]);
  return <SystemHealthContext.Provider value={value}><span className="sr-only" aria-live="polite">{announcement}</span>{children}</SystemHealthContext.Provider>;
}

export function useSystemHealth(): SystemHealthContextValue {
  const context = useContext(SystemHealthContext);
  if (!context) throw new Error('useSystemHealth must be used inside SystemHealthProvider');
  return context;
}
