import React from 'react';

import { ValueFormat } from '@jses/types/common';

export interface ColumnData<T> {
  dataKey: keyof T;
  label: string | React.ReactNode;
  widthRem?: number;
  widthPercentage?: number;
  format?: ValueFormat;
  sortable?: boolean;
}
