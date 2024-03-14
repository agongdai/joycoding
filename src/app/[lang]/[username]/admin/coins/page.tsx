import React from 'react';

import { myexFetchCoins } from '@myex/app/serverActions/myexCoin';
import CoinsList from '@myex/components/admin/Coins';
import CreateCoinButton from '@myex/components/admin/Coins/CreateCoinButton';
import CreateCoinModal from '@myex/components/modals/CreateCoinModal';
import UpdateCoinModal from '@myex/components/modals/UpdateCoinModal';

export default async function Coins() {
  const coins = await myexFetchCoins();
  return (
    <div>
      <div className='flex justify-between items-center'>
        <h1>Coins / Tokens</h1>
        <CreateCoinButton />
      </div>
      <CoinsList coins={coins} />
      <CreateCoinModal />
      <UpdateCoinModal />
    </div>
  );
}
