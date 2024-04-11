import React from 'react';
import BigNumber from 'bignumber.js';

import ExchangeIcon from '@myex/components/ExchangeIcon';
import { MyexAsset } from '@myex/types/trading';

interface Props {
  wallets: MyexAsset['wallets'];
  myexAsset: MyexAsset;
}

export default function ExchangeIcons({ wallets, myexAsset }: Props) {
  return wallets ? (
    <div className='flex'>
      {wallets.map((wallet) => (
        <ExchangeIcon
          key={wallet.exchange}
          exchange={wallet.exchange}
          tooltip={`${BigNumber(wallet.totalAmount).multipliedBy(myexAsset.price).toFixed(0).toString()} USDT`}
        />
      ))}
    </div>
  ) : null;
}
