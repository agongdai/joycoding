'use client';

import React from 'react';

import MyexTable from '@myex/components/ui/MyexTable';
import { ColumnData } from '@myex/components/ui/MyexTable/types';
import { Parameter } from '@prisma/client';

import SetEnabledButton from './SetEnabledButton';

interface Props {
  parameters: Parameter[];
}

const columns: ColumnData<Parameter>[] = [
  {
    label: 'ID',
    dataKey: 'myexId',
    sortable: true,
    widthRem: 6,
  },
  {
    label: 'Name',
    dataKey: 'name',
    widthRem: 24,
    sortable: true,
  },
  {
    label: 'Description',
    dataKey: 'description',
  },
  {
    label: 'Enabled',
    dataKey: 'enabled',
    renderComponent: (value, row) => <SetEnabledButton parameter={row} />,
    widthRem: 10,
    sortable: true,
  },
];

export default function ParametersList({ parameters = [] }: Props) {
  return (
    <MyexTable<Parameter>
      uniqueKey='myexId'
      data={parameters}
      columns={columns}
      defaultSortingField='name'
    />
  );
}
