import React from 'react';

import { faHandsHoldingDollar } from '@fortawesome/pro-duotone-svg-icons';
import MyexTooltip from '@myex/components/@mui/material/Tooltip';
import AwesomeIcon from '@myex/components/AwesomeIcon';
import Card from '@myex/components/Card';
import Money from '@myex/components/MyexFormatter/Money';
import { Balance, MyexAsset } from '@myex/types/trading';

interface Props {
  assets: MyexAsset[];
  usdBalance: Balance;
}

export default function AssetsSummary({ assets, usdBalance }: Props) {
  const totalBalance = assets.reduce((acc, asset) => acc + asset._balanceUsd, 0);
  return (
    <div className='my-4 grid grid-cols-4 gap-6'>
      <Card label='Balance (USD)'>
        <div>
          <Money value={usdBalance.available} flash nDecimals={3} />
          <div className='text-text-disabled text-base w-full my-1'>
            <MyexTooltip title='On hold: in order, or funding, or staking'>
              <div>
                <AwesomeIcon icon={faHandsHoldingDollar} size='sm' />
                {` `}
                <Money
                  value={usdBalance.total - (usdBalance.available || 0)}
                  flash
                  nDecimals={3}
                  currencySymbol=''
                />
              </div>
            </MyexTooltip>
          </div>
        </div>
      </Card>
      <Card label='Assets Worth (USD)'>
        <Money value={totalBalance} flash />
      </Card>
    </div>
  );
}
