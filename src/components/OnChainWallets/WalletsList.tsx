'use client';

import React from 'react';

import MyexTable from '@myex/components/MyexTable';
import { ColumnData } from '@myex/components/MyexTable/types';
import { ValueFormat } from '@myex/types/common';
import { WalletWithCoin } from '@myex/types/wallet';

import RemoveWalletButton from './RemoveWalletButton';
import UpdateWalletButton from './UpdateWalletButton';

interface Props {
  wallets: WalletWithCoin[];
}

const columns: ColumnData<WalletWithCoin>[] = [
  {
    label: 'ID',
    dataKey: 'myexId',
    sortable: true,
    widthRem: 4,
  },
  {
    label: 'Coin',
    dataKey: 'coinMyexId',
    format: ValueFormat.Coin,
    widthRem: 20,
  },
  {
    label: 'Name',
    dataKey: 'name',
    sortable: true,
  },
  {
    label: 'Address',
    dataKey: 'address',
    format: ValueFormat.WalletAddress,
  },
  {
    label: 'Protocol',
    dataKey: 'protocol',
    sortable: true,
    widthRem: 12,
  },
  {
    label: 'Network',
    dataKey: 'network',
    sortable: true,
    widthRem: 12,
  },
  {
    label: 'Added Time',
    dataKey: 'addedTimestamp',
    format: ValueFormat.DateTime,
    widthRem: 16,
  },
  {
    label: 'Provider',
    dataKey: 'provider',
    widthRem: 10,
  },
  {
    label: 'Actions',
    dataKey: 'myexId',
    renderComponent: (value, row) => (
      <div className='grid grid-cols-2 gap-1'>
        <UpdateWalletButton wallet={row} />
        <RemoveWalletButton wallet={row} />
      </div>
    ),
    widthRem: 8,
  },
];

export default function WalletsList({ wallets = [] }: Props) {
  return (
    <MyexTable<WalletWithCoin>
      data={wallets}
      columns={columns}
      defaultSortingField='name'
      defaultSortingDirection='-'
    />
  );
}
