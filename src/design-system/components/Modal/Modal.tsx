import { useEffect, useId, useRef, type ReactNode } from 'react';
import { Button } from '../Button/Button';

export interface ModalProps { open: boolean; title: string; children: ReactNode; onClose: () => void; }

export function Modal({ open, title, children, onClose }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);
  return <dialog className="modal" ref={dialogRef} aria-labelledby={titleId} onClose={onClose} onCancel={onClose}>
    <header><h2 id={titleId}>{title}</h2><Button variant="quiet" aria-label="Close dialog" onClick={onClose}>×</Button></header><div>{children}</div>
  </dialog>;
}
