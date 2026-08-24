import type { ReactNode } from 'react';

export interface MetadataItem {
  label: string;
  value: ReactNode;
}

export interface MetadataListProps {
  items: MetadataItem[];
}

export function MetadataList({ items }: MetadataListProps) {
  return <dl className="metadata-list">{items.map((item) => <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}</dl>;
}
