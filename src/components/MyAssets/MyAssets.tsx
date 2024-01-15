import React from 'react';

import { BfxTradingPair, BfxWallet } from '@jses/types/bitfinex';

interface Props {
  bfxWallets: BfxWallet[];
  tradingPairs: BfxTradingPair[];
}

export default function MyAssets({ bfxWallets, tradingPairs }: Props) {
  return (
    <div className='shadow'>
      {JSON.stringify(bfxWallets)}
      <header className='grid grid-cols-6 bg-bg-light-light dark:bg-bg-dark-light hover:bg-hover-bg-dark py-1 text-sm border-b border-border-dark'>
        <div className='px-4'>Coin</div>
        <div className='px-4'>Amount</div>
        <div className='px-4'>Worth ($)</div>
        <div className='px-4'>Cost Price</div>
        <div className='px-4'>Current Price</div>
        <div className='px-4'>Unrealized Profit / Lost</div>
      </header>
    </div>
  );
}
