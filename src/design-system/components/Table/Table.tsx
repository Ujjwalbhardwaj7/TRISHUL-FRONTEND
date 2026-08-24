import type { KeyboardEvent, ReactNode } from 'react';

export interface DataTableColumn<T> { key: string; header: string; render: (row: T) => ReactNode; }
export interface DataTableProps<T> { columns: DataTableColumn<T>[]; rows: T[]; getRowKey: (row: T) => string; onRowActivate?: (row: T) => void; caption?: string; }

export function DataTable<T>({ columns, rows, getRowKey, onRowActivate, caption }: DataTableProps<T>) {
  function onRowKeyDown(event: KeyboardEvent<HTMLTableRowElement>, row: T) {
    if (onRowActivate && (event.key === 'Enter' || event.key === ' ')) { event.preventDefault(); onRowActivate(row); }
  }
  return <div className="table-scroll"><table className="data-table">
    {caption && <caption>{caption}</caption>}
    <thead><tr>{columns.map((column) => <th key={column.key} scope="col">{column.header}</th>)}</tr></thead>
    <tbody>{rows.map((row) => <tr key={getRowKey(row)} tabIndex={onRowActivate ? 0 : undefined} onClick={onRowActivate ? () => onRowActivate(row) : undefined} onKeyDown={(event) => onRowKeyDown(event, row)}>{columns.map((column) => <td key={column.key} data-label={column.header}>{column.render(row)}</td>)}</tr>)}</tbody>
  </table></div>;
}

export { DataTable as Table };
