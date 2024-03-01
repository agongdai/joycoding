import { BfxTradingPair, BfxWallet } from '@myex/types/bitfinex';
import { Exchange } from '@myex/types/exchange';

export type MyexAsset = BfxWallet &
  Pick<BfxTradingPair, 'dailyChangePerc' | 'lastPrice'> & {
    _balanceUsd: number;
    _exchange: Exchange;
  };

export type Balance = {
  total: number;
  available?: number;
};
