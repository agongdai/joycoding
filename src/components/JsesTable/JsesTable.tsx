'use client';

import React from 'react';
import { TableComponents, TableVirtuoso } from 'react-virtuoso';

import JsesFormatter from '@jses/components/JsesFormatter';
import { Value, ValueFormat } from '@jses/types/common';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

import { ColumnData } from './types';

export default function JsesTable<T>({ data, columns }: { data: T[]; columns: ColumnData<T>[] }) {
  const VirtuosoTableComponents: TableComponents<T> = {
    /* eslint-disable react/display-name */
    Scroller: React.forwardRef<HTMLDivElement>((props, ref) => (
      <TableContainer component={Paper} {...props} ref={ref} />
    )),
    Table: (props) => (
      <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />
    ),
    TableHead,
    TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
    TableBody: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
      <TableBody {...props} ref={ref} />
    )),
  };

  function fixedHeaderContent() {
    return (
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={String(column.dataKey)}
            variant='head'
            align={'left'}
            style={{ width: column.width }}
          >
            {column.label}
          </TableCell>
        ))}
      </TableRow>
    );
  }

  function rowContent(_index: number, row: T) {
    return (
      <React.Fragment>
        {columns.map((column) => (
          <TableCell key={String(column.dataKey)} align={'left'}>
            <JsesFormatter
              value={row[column.dataKey] as Value}
              format={column.format || ValueFormat.String}
            />
          </TableCell>
        ))}
      </React.Fragment>
    );
  }

  return (
    <div className='my-6' style={{ height: `${data.length * 6 + 3}rem` }}>
      <TableVirtuoso
        style={{ height: '100%' }}
        data={data}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent}
      />
    </div>
  );
}
