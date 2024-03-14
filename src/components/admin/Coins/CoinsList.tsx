'use client';

import React from 'react';

import MyexTable from '@myex/components/MyexTable';
import { ColumnData } from '@myex/components/MyexTable/types';
import { ValueFormat } from '@myex/types/common';
import { Coin } from '@prisma/client';

import RemoveCoinButton from './RemoveCoinButton';
import UpdateCoinButton from './UpdateCoinButton';

interface Props {
  coins: Coin[];
}

const columns: ColumnData<Coin>[] = [
  {
    label: 'ID',
    dataKey: 'myexId',
    sortable: true,
    widthRem: 7,
  },
  {
    label: 'Icon',
    dataKey: 'icon',
    format: ValueFormat.CoinIcon,
    widthRem: 7,
  },
  {
    label: 'Name',
    dataKey: 'name',
    sortable: true,
  },
  {
    label: 'Currency',
    dataKey: 'currency',
    sortable: true,
    widthRem: 12,
  },
  {
    label: 'Rating',
    dataKey: 'rating',
    sortable: true,
    widthRem: 8,
  },
  {
    label: 'Project URL',
    dataKey: 'projectUrl',
    format: ValueFormat.Link,
  },
  {
    label: 'CMC URL',
    dataKey: 'cmcUrl',
    format: ValueFormat.Link,
  },
  {
    label: 'Exchange Symbols',
    dataKey: 'exchangeSymbols',
  },
  {
    label: 'Actions',
    dataKey: 'myexId',
    renderComponent: (value, row) => (
      <div className='grid grid-cols-2 gap-1'>
        <UpdateCoinButton coin={row} />
        <RemoveCoinButton coin={row} />
      </div>
    ),
  },
];

export default function CoinsList({ coins = [] }: Props) {
  return (
    <MyexTable<Coin>
      data={coins}
      columns={columns}
      defaultSortingField='rating'
      defaultSortingDirection='-'
    />
  );
}
