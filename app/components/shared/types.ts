import type { ReactNode } from "react";

export interface ColumnDef<T> {
  key: string;
  label: string;
  render?: (row: T) => ReactNode;
  className?: string;
}

export interface DataTableProps<T> {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  onActionClick?: () => void;
  columns: ColumnDef<T>[];
  data: T[];
  keyExtractor: (row: T) => string;
}
