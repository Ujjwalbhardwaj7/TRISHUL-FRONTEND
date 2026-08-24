import { useEffect, useState } from 'react';

export type Breakpoint = 'mobile' | 'tablet' | 'desktop';

const desktopQuery = '(min-width: 1024px)';
const tabletQuery = '(min-width: 768px)';

function readBreakpoint(): Breakpoint {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return 'desktop';
  if (window.matchMedia(desktopQuery).matches) return 'desktop';
  return window.matchMedia(tabletQuery).matches ? 'tablet' : 'mobile';
}

function subscribe(query: MediaQueryList, listener: () => void): () => void {
  if (typeof query.addEventListener === 'function') {
    query.addEventListener('change', listener);
    return () => query.removeEventListener('change', listener);
  }
  query.addListener(listener);
  return () => query.removeListener(listener);
}

export function useBreakpoint(): Breakpoint {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>(() => readBreakpoint());

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return undefined;
    const desktop = window.matchMedia(desktopQuery);
    const tablet = window.matchMedia(tabletQuery);
    const update = () => {
      const next = desktop.matches ? 'desktop' : tablet.matches ? 'tablet' : 'mobile';
      setBreakpoint((current) => current === next ? current : next);
    };
    update();
    const unsubscribeDesktop = subscribe(desktop, update);
    const unsubscribeTablet = subscribe(tablet, update);
    return () => { unsubscribeDesktop(); unsubscribeTablet(); };
  }, []);

  return breakpoint;
}
