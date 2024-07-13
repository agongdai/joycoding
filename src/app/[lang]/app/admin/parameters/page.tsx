import React from 'react';

import { myexFetchParameters } from '@myex/app/serverActions/myexParameter';
import CreateCoinButton from '@myex/components/admin/Coins/CreateCoinButton';
import ParametersList from '@myex/components/admin/Parameters/ParametersList';
import CreateCoinModal from '@myex/components/modals/CreateCoinModal';
import UpdateCoinModal from '@myex/components/modals/UpdateCoinModal';

export default async function Parameters() {
  const parameters = await myexFetchParameters();
  return (
    <div>
      <div className='flex justify-between items-center'>
        <h1>Parameters</h1>
        <CreateCoinButton />
      </div>
      <ParametersList parameters={parameters} />
      <CreateCoinModal />
      <UpdateCoinModal />
    </div>
  );
}
