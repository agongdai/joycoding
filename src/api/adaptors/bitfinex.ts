import BigNumber from 'bignumber.js';

import { BfxTradingPair } from '@myex/types/bitfinex';
import { symbolToCurrency } from '@myex/utils/trading';

export const bfxResponseToTradingPair = (pair: (string | number)[]): BfxTradingPair =>
  ({
    symbol: pair[0],
    _currency: symbolToCurrency(String(pair[0])),
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
  }) as BfxTradingPair;
