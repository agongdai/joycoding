import React from 'react';
import BigNumber from 'bignumber.js';

import Badge from '@mui/material/Badge';
import BalanceCard from '@myex/components/MyAssets/BalanceCard';
import MyexCard from '@myex/components/ui/MyexCard';
import CoinIcon from '@myex/components/ui/MyexFormatter/CoinIcon';
import Money from '@myex/components/ui/MyexFormatter/Money';
import MyexImage from '@myex/components/ui/MyexImage';
import MyexTooltip from '@myex/components/ui/MyexTooltip';
import { FIAT_CURRENCY_SYMBOL, INITIAL_INVESTMENT } from '@myex/config';
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
  const assetsWorthBalance = assets
    .reduce((acc, asset) => BigNumber(acc).plus(asset._balanceUst), BigNumber(0))
    .plus(onChainTotalBalance);

  const investedBalance = assets
    .reduce(
      (acc, asset) =>
        BigNumber(acc).plus(
          BigNumber(asset?.myexTransaction?.openPrice || 0).multipliedBy(asset?.amount || 0),
        ),
      BigNumber(0),
    )
    .plus(onChainTotalBalance)
    .plus(ustBalance.totalAmount);

  const unclaimedGainLost = assetsWorthBalance
    .plus(ustBalance.totalAmount)
    .dividedBy(investedBalance)
    .minus(1)
    .multipliedBy(100);
  const earning = investedBalance.isGreaterThan(INITIAL_INVESTMENT);

  return (
    <div className='my-4 grid grid-cols-4 gap-6 xl:grid-cols-2 xs:grid-cols-1 lg:gap-4'>
      <MyexCard
        label='Invested Balance (UST)'
        info={`${INITIAL_INVESTMENT} UST => ${earning ? '+' : ''}${((investedBalance.toNumber() / INITIAL_INVESTMENT - 1) * 100).toFixed(2)}%`}
        infoClassName={earning ? 'bg-go-up' : 'bg-go-down'}
      >
        <Money value={investedBalance.toNumber()} flash />
      </MyexCard>
      <BalanceCard label='UST Balance' balance={ustBalance} />
      <MyexCard
        label='Assets Worth (UST)'
        info={`${unclaimedGainLost.toFixed(2)}%`}
        infoClassName={unclaimedGainLost.isNegative() ? 'bg-go-down' : 'bg-go-up'}
      >
        <Money value={assetsWorthBalance.toNumber()} flash />
      </MyexCard>
      <MyexCard
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
      </MyexCard>
    </div>
  );
}
