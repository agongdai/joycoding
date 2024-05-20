import React from 'react';
import BigNumber from 'bignumber.js';

import { faHandsHoldingDollar } from '@fortawesome/pro-duotone-svg-icons';
import MyexTooltip from '@myex/components/@mui/material/Tooltip';
import AwesomeIcon from '@myex/components/AwesomeIcon';
import Card from '@myex/components/Card';
import Money from '@myex/components/MyexFormatter/Money';
import { IGNORED_USD_THRESHOLD } from '@myex/config';
import { Balance } from '@myex/types/trading';

interface Props {
  label: string;
  balance: Balance;
}

export default function BalanceCard({ label, balance }: Props) {
  if (!balance) return null;
  if (BigNumber(balance.totalAmount).isLessThan(IGNORED_USD_THRESHOLD)) return null;

  return (
    <Card label={label}>
      <div className='leading-none'>
        <Money value={BigNumber(balance.availableAmount).toNumber()} flash nDecimals={3} />
        <div className='text-text-disabled text-base w-full m-1'>
          <MyexTooltip title='On hold: in order, or funding, or staking' placement='left'>
            <div>
              <AwesomeIcon icon={faHandsHoldingDollar} size='sm' />
              {` `}
              <Money
                value={BigNumber(balance.totalAmount)
                  .minus(balance.availableAmount || 0)
                  .toNumber()}
                flash
                nDecimals={3}
                currencySymbol=''
              />
            </div>
          </MyexTooltip>
        </div>
      </div>
    </Card>
  );
}
