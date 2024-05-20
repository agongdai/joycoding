'use client';

import React from 'react';
import BigNumber from 'bignumber.js';

import Money from '@myex/components/MyexFormatter/Money';
import Percentage from '@myex/components/MyexFormatter/Percentage';
import MyexTable from '@myex/components/MyexTable';
import ExchangeIcons from '@myex/components/MyexTable/ExchangeIcons';
import { ColumnData } from '@myex/components/MyexTable/types';
import EditableTxCost from '@myex/components/MyexTransaction/EditableTxCost';
import EditableTxOpenPrice from '@myex/components/MyexTransaction/EditableTxOpenPrice';
import TradingView from '@myex/components/TradingView';
import { useMyexDispatch, useMyexSelector } from '@myex/store';
import { setCurrentCurrency } from '@myex/store/trading/actions';
import { selectShowTradingView } from '@myex/store/trading/selectors';
import { CoinInMarket } from '@myex/types/coin';
import { ValueFormat } from '@myex/types/common';
import { Balance, MyexAsset } from '@myex/types/trading';
import { Wallet } from '@myex/types/wallet';

import AssetsSummary from './AssetsSummary';

interface Props {
  marketCoins: CoinInMarket[];
  onChainBalances: Wallet[];
  myexAssets: MyexAsset[];
  ustBalance: Balance;
}

const columns: ColumnData<MyexAsset>[] = [
  {
    label: 'Coin',
    dataKey: 'currency',
    format: ValueFormat.Coin,
    sortable: true,
    widthRem: 25,
  },
  {
    label: '24H Change %',
    dataKey: 'priceChangePercentage24h',
    format: ValueFormat.Percentage,
    sortable: true,
  },
  {
    label: 'Current Price / Cost',
    dataKey: 'price',
    renderComponent: (value, row) => (
      <EditableTxOpenPrice price={String(value)} tx={row?.myexTransaction} />
    ),
    sortable: true,
    widthRem: 18,
  },
  {
    label: 'Amount',
    dataKey: 'amount',
    format: ValueFormat.Number,
  },
  {
    label: 'Worth / Cost',
    dataKey: '_balanceUst',
    renderComponent: (value, row) => (
      <EditableTxCost price={row?.price} tx={row?.myexTransaction} />
    ),
    sortable: true,
  },
  {
    label: 'Exchanges',
    dataKey: 'wallets',
    renderComponent: (value, row) => (
      <ExchangeIcons wallets={value as MyexAsset['wallets']} myexAsset={row} />
    ),
  },
  {
    label: 'Gain / Loss',
    dataKey: 'price',
    renderComponent: (value, row) => (
      <Money
        value={
          row?.myexTransaction?.openPrice
            ? BigNumber(String(value))
                .minus(BigNumber(row?.myexTransaction?.openPrice))
                .multipliedBy(row.amount)
                .toFixed(0)
                .toString()
            : null
        }
      />
    ),
    className: 'text-lg',
  },
  {
    label: 'Gain / Loss %',
    dataKey: 'price',
    renderComponent: (value, row) => (
      <Percentage
        value={
          row?.myexTransaction?.openPrice
            ? BigNumber(String(value))
                .dividedBy(BigNumber(row?.myexTransaction?.openPrice))
                .minus(1)
                .multipliedBy(100)
                .toNumber()
            : null
        }
      />
    ),
  },
];

export default function MyAssets({ marketCoins, onChainBalances, myexAssets, ustBalance }: Props) {
  const dispatch = useMyexDispatch();
  const showTradingView = useMyexSelector(selectShowTradingView);

  const onSetCurrentCurrency = (row: MyexAsset) => {
    dispatch(setCurrentCurrency(row.currency));
  };

  const totalBalance = myexAssets.reduce((acc, asset) => acc.plus(asset._balanceUst), BigNumber(0));

  const walletsWithBalance = onChainBalances.map((wallet) => ({
    ...wallet,
    _balanceUst: BigNumber(wallet.amount).multipliedBy(
      BigNumber(
        marketCoins.find((coin) => coin.currency.toLowerCase() === wallet.currency.toLowerCase())
          ?.price || 0,
      ),
    ),
  }));

  const onChainTotalBalance = walletsWithBalance.reduce(
    (acc, asset) => BigNumber(acc).plus(asset?._balanceUst || 0),
    BigNumber(0),
  );

  return (
    <>
      <h1 className='mb-8'>
        Assets &#8776;{' '}
        <Money
          value={totalBalance.plus(ustBalance.totalAmount).plus(onChainTotalBalance).toNumber()}
          flash
        />
      </h1>
      <AssetsSummary
        assets={myexAssets}
        ustBalance={ustBalance}
        onChainWallets={walletsWithBalance}
      />
      <TradingView />
      <MyexTable<MyexAsset>
        data={myexAssets}
        columns={columns}
        defaultSortingField='_balanceUst'
        defaultSortingDirection='-'
        onRowClick={showTradingView ? onSetCurrentCurrency : undefined}
      />
    </>
  );
}
