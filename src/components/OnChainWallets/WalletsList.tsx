'use client';

import React from 'react';

import MyexTable from '@myex/components/ui/MyexTable';
import { ColumnData } from '@myex/components/ui/MyexTable/types';
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
    widthRem: 3,
  },
  {
    label: 'Coin',
    dataKey: 'coinMyexId',
    format: ValueFormat.Coin,
    widthRem: 16,
  },
  {
    label: 'Name',
    dataKey: 'name',
    sortable: true,
    widthRem: 18,
  },
  {
    label: 'Address',
    dataKey: 'address',
    format: ValueFormat.WalletAddress,
  },
  {
    label: 'Amount',
    dataKey: 'amount',
    format: ValueFormat.Number,
  },
  {
    label: 'Protocol',
    dataKey: 'protocol',
    sortable: true,
    widthRem: 10,
  },
  {
    label: 'Network',
    dataKey: 'network',
    sortable: true,
    widthRem: 10,
  },
  {
    label: 'Added Time',
    dataKey: 'addedTimestamp',
    format: ValueFormat.DateTime,
    widthRem: 14,
  },
  {
    label: 'Provider',
    dataKey: 'provider',
    widthRem: 14,
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
      uniqueKey='myexId'
      data={wallets}
      columns={columns}
      defaultSortingField='name'
      defaultSortingDirection='-'
    />
  );
}
