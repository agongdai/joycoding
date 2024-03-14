import _maxBy from 'lodash/maxBy';

import { AccountSnapshotType, Spot } from '@binance/connector-typescript';
import { HttpStatusCode } from '@myex/types/api';
import { BinanceWallet } from '@myex/types/binance';

export const getBalances = async (): Promise<BinanceWallet[]> => {
  const client = new Spot(
    'Cz2PYDbTHBW3HJkfRUEyF4xetsH5dL83HmBN1S6QX6ub3ZvzOWRtt165MkDWOpub',
    'reEk2sMO3s4Cf4lQdJcKYWWu6MnqOGDQQynZfDzs1ytaZOs1SXCtD8aojlac9NZo',
  );

  // @doc https://binance.github.io/binance-connector-node/module-Wallet.html
  const res = await client.dailyAccountSnapshot(AccountSnapshotType.SPOT);
  if (res.code === HttpStatusCode.Ok) {
    return _maxBy(res.snapshotVos, 'updateTime')?.data?.balances || [];
  }
  return [];
};
