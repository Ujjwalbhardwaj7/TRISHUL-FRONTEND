import type { ReactNode } from 'react';

export interface MarginNoteProps {
  marker?: string;
  title: string;
  children: ReactNode;
}

export function MarginNote({ marker, title, children }: MarginNoteProps) {
  return <aside className="margin-note">{marker && <span className="section-marker">{marker}</span>}<strong className="margin-note__title">{title}</strong><p>{children}</p></aside>;
}
