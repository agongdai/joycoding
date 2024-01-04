import React from 'react';
import BigNumber from 'bignumber.js';

import { BfxEndpoints } from '@jses/api/endpoints';
import { JsesStyledPageWrapper } from '@jses/components/JsesStyled';
import JsesTable from '@jses/components/JsesTable';
import { ColumnData } from '@jses/components/JsesTable/types';
import coins from '@jses/data/coins.json';
import { BfxTradingPair } from '@jses/types/bitfinex';
import { Coin, ValueFormat } from '@jses/types/common';

export const revalidate = 60;

async function loadTradingPairs(): Promise<BfxTradingPair[]> {
  const symbolsStr = coins
    .map((coin: Coin) => `t${coin.symbol}${coin.symbol.length === 3 ? '' : ':'}USD`)
    .join(',');
  const res = await fetch(`${BfxEndpoints.tickers.path}?symbols=${symbolsStr}`);
  const data = await res.json();
  return data.map((pair: (string | number)[]) => ({
    symbol: pair[0],
    bid: pair[1],
    bidSize: pair[2],
    ask: pair[3],
    askSize: pair[4],
    dailyChange: pair[5],
    dailyChangePerc: pair[6],
    lastPrice: pair[7],
    volume: pair[8],
    _volumeAmount: BigNumber(pair[8]).multipliedBy(BigNumber(pair[7])).toNumber(),
    high: pair[9],
    low: pair[10],
  }));
}

const columns: ColumnData<BfxTradingPair>[] = [
  {
    width: 80,
    label: 'Name',
    dataKey: 'symbol',
    format: ValueFormat.Coin,
  },
  {
    width: 120,
    label: 'Price',
    dataKey: 'lastPrice',
    format: ValueFormat.Price,
  },
  {
    width: 50,
    label: '24H Change',
    dataKey: 'dailyChange',
    format: ValueFormat.Price,
  },
  {
    width: 50,
    label: '24H Change %',
    dataKey: 'dailyChangePerc',
    format: ValueFormat.Percentage,
  },
  {
    width: 100,
    label: 'Daily Volume',
    dataKey: '_volumeAmount',
    format: ValueFormat.Volume,
  },
];

export default async function MarketsPage() {
  const tradingPairs = await loadTradingPairs();
  return (
    <JsesStyledPageWrapper>
      <h1>Markets</h1>
      <JsesTable<BfxTradingPair> data={tradingPairs} columns={columns} />
    </JsesStyledPageWrapper>
  );
}
