'use client';

import React from 'react';
import cx from 'classnames';
import _sortBy from 'lodash/sortBy';
import { TableComponents, TableVirtuoso } from 'react-virtuoso';

import { faSortDown, faSortUp } from '@fortawesome/pro-duotone-svg-icons';
import AwesomeIcon from '@jses/components/AwesomeIcon';
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

type Props<T> = {
  data: T[];
  columns: ColumnData<T>[];
  defaultSortingField?: keyof T;
  defaultSortingDirection?: '' | '-';
};

export default function JsesTable<T>({
  data,
  columns,
  defaultSortingField,
  defaultSortingDirection = '',
}: Props<T>) {
  const [sortingField, setSortingField] = React.useState<keyof T | undefined>(defaultSortingField);
  const [sortingDirection, setSortingDirection] = React.useState<'' | '-'>(defaultSortingDirection);

  React.useEffect(() => {
    if (defaultSortingField) {
      setSortingField(defaultSortingField);
    }
  }, [defaultSortingField]);

  React.useEffect(() => {
    if (defaultSortingDirection) {
      setSortingDirection(defaultSortingDirection);
    }
  }, [defaultSortingDirection]);

  const sortedData = React.useMemo(() => {
    if (!sortingField) return data;

    const sorted = _sortBy(data, sortingField);
    return sortingDirection === '-' ? sorted.reverse() : sorted;
  }, [sortingDirection, sortingField, data]);

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

  const sortByField =
    (field: keyof T, sortable: boolean = false) =>
    () => {
      if (!sortable) return;

      if (sortingField === field) {
        setSortingDirection(sortingDirection === '-' ? '' : '-');
      } else {
        setSortingField(field);
        setSortingDirection('');
      }
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
            className={cx({ 'cursor-pointer hover:opacity-50': column.sortable })}
            onClick={sortByField(column.dataKey, column.sortable)}
          >
            <div>
              {column.label}
              {sortingField === column.dataKey && (
                <AwesomeIcon
                  size='sm'
                  icon={sortingDirection === '-' ? faSortUp : faSortDown}
                  className={`ml-1`}
                />
              )}
            </div>
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
    <div className='my-6' style={{ height: `${sortedData.length * 6 + 3}rem` }}>
      <TableVirtuoso
        style={{ height: '100%' }}
        data={sortedData}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent}
      />
    </div>
  );
}
