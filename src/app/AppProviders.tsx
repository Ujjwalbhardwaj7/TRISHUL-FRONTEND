import type { ReactNode } from 'react';
import { ErrorBoundary, ErrorState } from '../design-system/components';
import { CaseProvider } from '../state/providers/CaseProvider';
import { NavigationStateProvider } from '../state/providers/NavigationStateProvider';
import { QueryProvider } from '../state/providers/QueryProvider';
import { SystemHealthProvider } from '../state/providers/SystemHealthProvider';

export function AppProviders({ children }: { children: ReactNode }) {
  return <ErrorBoundary fallback={(error) => <ErrorState error={error} fullPage />}><QueryProvider><SystemHealthProvider><NavigationStateProvider><CaseProvider>{children}</CaseProvider></NavigationStateProvider></SystemHealthProvider></QueryProvider></ErrorBoundary>;
}
