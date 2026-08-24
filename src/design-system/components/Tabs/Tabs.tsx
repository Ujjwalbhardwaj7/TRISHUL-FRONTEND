import { NavLink } from 'react-router-dom';

export interface TabItem { id: string; label: string; to: string; }
export interface TabsProps { items: TabItem[]; activeId: string; label: string; }

/** Visual tabs for route-level navigation; not ARIA tab-panels. */
export function Tabs({ items, activeId, label }: TabsProps) {
  return <nav className="tabs" aria-label={label}>{items.map((item) => <NavLink key={item.id} end to={item.to} className={item.id === activeId ? 'is-active' : undefined} aria-current={item.id === activeId ? 'page' : undefined}>{item.label}</NavLink>)}</nav>;
}
