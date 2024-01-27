import { BfxTradingPair, BfxWallet } from '@myex/types/bitfinex';

export type MyexAsset = BfxWallet &
  Pick<BfxTradingPair, 'dailyChangePerc' | 'lastPrice'> & {
    _balanceUsd: number;
  };

export type Balance = {
  total: number;
  available?: number;
};
