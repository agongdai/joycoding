import React from 'react';
import BigNumber from 'bignumber.js';

import Badge from '@mui/material/Badge';
import MyexTooltip from '@myex/components/@mui/material/Tooltip';
import Card from '@myex/components/Card';
import BalanceCard from '@myex/components/MyAssets/BalanceCard';
import CoinIcon from '@myex/components/MyexFormatter/CoinIcon';
import Money from '@myex/components/MyexFormatter/Money';
import MyexImage from '@myex/components/MyexImage';
import { FIAT_CURRENCY_SYMBOL } from '@myex/config';
import { Balance, MyexAsset } from '@myex/types/trading';
import { Wallet } from '@myex/types/wallet';
import { getWalletProviderImageUrl } from '@myex/utils/trading';

interface Props {
  assets: MyexAsset[];
  ustBalance: Balance;
  onChainWallets: Wallet[];
}

export default function AssetsSummary({ assets, ustBalance, onChainWallets }: Props) {
  const onChainTotalBalance = onChainWallets.reduce(
    (acc, asset) => BigNumber(acc).plus(asset?._balanceUst || 0),
    BigNumber(0),
  );
  const totalBalance = assets
    .reduce((acc, asset) => BigNumber(acc).plus(asset._balanceUst), BigNumber(0))
    .plus(onChainTotalBalance);

  return (
    <div className='my-4 grid grid-cols-4 gap-6'>
      <BalanceCard label='Balance (UST)' balance={ustBalance} />
      <Card label='Assets Worth (UST)'>
        <Money value={totalBalance.toNumber()} flash />
      </Card>
      <Card
        label={
          'Cold Assets: ' + FIAT_CURRENCY_SYMBOL + ' ' + onChainTotalBalance.toNumber().toFixed(2)
        }
      >
        <div className='flex flex-wrap justify-center'>
          {onChainWallets.map((wallet) => (
            <MyexTooltip
              key={wallet.address}
              title={`${wallet.name}: ${FIAT_CURRENCY_SYMBOL} ${wallet._balanceUst?.toFixed(2)}`}
            >
              <div className='mx-2 my-1'>
                <Badge
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  badgeContent={
                    <MyexImage
                      alt=''
                      src={getWalletProviderImageUrl(wallet.provider)}
                      width={16}
                      height={16}
                    />
                  }
                >
                  <CoinIcon coin={wallet?.myexCoin} size={36} />
                </Badge>
              </div>
            </MyexTooltip>
          ))}
        </div>
      </Card>
    </div>
  );
}
