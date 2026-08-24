import type { ReactNode } from 'react';

export function MainViewport({ children }: { children: ReactNode }) { return <main className="main-viewport"><div className="page-container">{children}</div></main>; }
