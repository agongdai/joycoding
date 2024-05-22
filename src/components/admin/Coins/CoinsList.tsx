'use client';

import React from 'react';

import MyexLink from '@myex/components/MyexLink';
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
    widthRem: 6,
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
    widthRem: 20,
  },
  {
    label: 'Currency',
    dataKey: 'currency',
    sortable: true,
    widthRem: 10,
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
    widthRem: 10,
  },
  {
    label: 'CMC URL',
    dataKey: 'cmcUrl',
    format: ValueFormat.Link,
    widthRem: 10,
  },
  {
    label: 'CoinGecko URL',
    dataKey: 'coinGeckoId',
    renderComponent: (value) => (
      <MyexLink href={`https://www.coingecko.com/en/coins/${String(value)}`}>{value}</MyexLink>
    ),
    widthRem: 20,
  },
  {
    label: 'Exchanges',
    dataKey: 'exchanges',
    format: ValueFormat.Exchange,
    sortable: true,
    widthRem: 11,
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
    widthRem: 8,
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
