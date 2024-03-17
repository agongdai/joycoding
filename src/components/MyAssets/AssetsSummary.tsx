import React from 'react';
import BigNumber from 'bignumber.js';

import Card from '@myex/components/Card';
import BalanceCard from '@myex/components/MyAssets/BalanceCard';
import Money from '@myex/components/MyexFormatter/Money';
import { Balance, MyexAsset } from '@myex/types/trading';

interface Props {
  assets: MyexAsset[];
  usdBalance: Balance;
  ustBalance: Balance;
}

export default function AssetsSummary({ assets, usdBalance, ustBalance }: Props) {
  const totalBalance = assets.reduce(
    (acc, asset) => BigNumber(acc).plus(asset._balanceUst),
    BigNumber(0),
  );
  return (
    <div className='my-4 grid grid-cols-4 gap-6'>
      <BalanceCard label='Balance (USD)' balance={usdBalance} />
      <BalanceCard label='Balance (UST)' balance={ustBalance} />
      <Card label='Assets Worth (UST)'>
        <Money value={totalBalance.toNumber()} flash />
      </Card>
    </div>
  );
}
