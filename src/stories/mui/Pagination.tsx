import React from 'react';

import MuiPagination, { PaginationProps as MuiPaginationProps } from '@mui/material/Pagination';

type PaginationBaseProps = Pick<MuiPaginationProps, 'count' | 'shape'>;

export interface PaginationProps extends PaginationBaseProps {
  title: string;
}

export const Pagination = ({ ...rest }: PaginationProps): React.ReactElement => (
  <MuiPagination {...rest}></MuiPagination>
);

Pagination.defaultProps = {
  count: 10,
  shape: 'rounded',
};
