import { ValueFormat } from '@jses/types/common';

export interface ColumnData<T> {
  dataKey: keyof T;
  label: string;
  width: number;
  format?: ValueFormat;
  sortable?: boolean;
}
