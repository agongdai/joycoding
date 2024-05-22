import React from 'react';

import { ValueFormat } from '@myex/types/common';

export interface ColumnData<T> {
  dataKey: keyof T;
  label: string | React.ReactNode;
  widthRem?: number;
  widthPercentage?: number;
  format?: ValueFormat;
  sortable?: boolean;
  className?: string;
  responsiveClassName?: string;
  renderComponent?: (value: T[keyof T], row: T) => React.ReactNode;
}
