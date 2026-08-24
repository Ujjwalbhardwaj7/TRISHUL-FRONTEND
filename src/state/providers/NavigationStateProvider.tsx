import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

interface NavigationStateContextValue { sidebarCollapsed: boolean; setSidebarCollapsed: (collapsed: boolean) => void; toggleSidebar: () => void; }
const NavigationStateContext = createContext<NavigationStateContextValue | null>(null);

function initiallyCollapsed(): boolean {
  return typeof window !== 'undefined' && typeof window.matchMedia === 'function' && window.matchMedia('(max-width: 767px)').matches;
}

export function NavigationStateProvider({ children }: { children: ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(initiallyCollapsed);
  const value = useMemo(() => ({ sidebarCollapsed, setSidebarCollapsed, toggleSidebar: () => setSidebarCollapsed((value) => !value) }), [sidebarCollapsed]);
  return <NavigationStateContext.Provider value={value}>{children}</NavigationStateContext.Provider>;
}

export function useNavigationState(): NavigationStateContextValue {
  const context = useContext(NavigationStateContext);
  if (!context) throw new Error('useNavigationState must be used inside NavigationStateProvider');
  return context;
}
