import React from 'react';
import BigNumber from 'bignumber.js';
import _upperFirst from 'lodash/upperFirst';

import Exchange from '@myex/components/ui/MyexFormatter/Exchange';
import { MyexAsset } from '@myex/types/trading';

interface Props {
  wallets: MyexAsset['wallets'];
  myexAsset: MyexAsset;
}

export default function ExchangeIcons({ wallets, myexAsset }: Props) {
  return wallets ? (
    <div className='flex'>
      {wallets.map((wallet) => (
        <Exchange
          key={wallet.exchange}
          className='mr-2 last:mr-0'
          value={wallet.exchange}
          currency={myexAsset.currency}
          tooltip={`${_upperFirst(wallet.exchange)}: ${BigNumber(wallet.totalAmount).multipliedBy(myexAsset.price).toFixed(0).toString()} USDT`}
        />
      ))}
    </div>
  ) : null;
}
