'use client';

import React from 'react';
import BigNumber from 'bignumber.js';

import EditableTxCost from '@myex/components/MyexTransaction/EditableTxCost';
import EditableTxOpenPrice from '@myex/components/MyexTransaction/EditableTxOpenPrice';
import TradingView from '@myex/components/TradingView';
import Money from '@myex/components/ui/MyexFormatter/Money';
import Percentage from '@myex/components/ui/MyexFormatter/Percentage';
import MyexTable from '@myex/components/ui/MyexTable';
import ExchangeIcons from '@myex/components/ui/MyexTable/ExchangeIcons';
import { ColumnData } from '@myex/components/ui/MyexTable/types';
import useTradingView from '@myex/hooks/useTradingView';
import { MarketCoin } from '@myex/types/coin';
import { ValueFormat } from '@myex/types/common';
import { Balance, MyexAsset } from '@myex/types/trading';
import { Wallet } from '@myex/types/wallet';

import AssetsSummary from './AssetsSummary';

interface Props {
  marketCoins: MarketCoin[];
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
    responsiveClassName: 'md:!basis-[12rem] xs:!basis-[6rem]',
  },
  {
    label: '24H Change %',
    dataKey: 'priceChangePercentage24h',
    format: ValueFormat.Percentage,
    sortable: true,
    responsiveClassName: 'lg:hidden',
  },
  {
    label: 'Current Price / Cost',
    dataKey: 'price',
    renderComponent: (value, row) => (
      <EditableTxOpenPrice price={String(value)} tx={row?.myexTransaction} />
    ),
    sortable: true,
    widthRem: 18,
    responsiveClassName: 'md:!basis-[15rem] xs:!basis-[10rem] xs:px-0',
  },
  {
    label: 'Amount',
    dataKey: 'amount',
    format: ValueFormat.Number,
    responsiveClassName: 'xxl:hidden',
  },
  {
    label: 'Worth / Cost',
    dataKey: '_balanceUst',
    renderComponent: (value, row) => (
      <EditableTxCost price={row?.price} tx={row?.myexTransaction} />
    ),
    sortable: true,
    responsiveClassName: 'sm:hidden',
    widthRem: 13,
  },
  {
    label: 'Trade',
    dataKey: 'wallets',
    renderComponent: (value, row) => (
      <ExchangeIcons wallets={value as MyexAsset['wallets']} myexAsset={row} />
    ),
    responsiveClassName: 'xl:hidden',
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
    responsiveClassName: 'xxl:hidden',
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
  const { showTradingView, setCurrentCurrencySync } = useTradingView();

  const onSetCurrentCurrency = (row: MyexAsset) => {
    setCurrentCurrencySync(row.currency);
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
        <span className='xs:hidden'>Assets &#8776; </span>
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
        uniqueKey='currency'
        data={myexAssets}
        columns={columns}
        defaultSortingField='_balanceUst'
        defaultSortingDirection='-'
        onRowClick={showTradingView ? onSetCurrentCurrency : undefined}
      />
    </>
  );
}
