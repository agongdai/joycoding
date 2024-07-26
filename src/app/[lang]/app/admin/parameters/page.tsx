import React from 'react';

import { myexFetchParameters } from '@myex/app/serverActions/myexParameter';
import CreateParameterButton from '@myex/components/admin/Parameters/CreateParameterButton';
import ParametersList from '@myex/components/admin/Parameters/ParametersList';
import CreateParameterModal from '@myex/components/modals/CreateParameterModal';
import UpdateParameterModal from '@myex/components/modals/UpdateParameterModal';

export default async function Parameters() {
  const res = await myexFetchParameters();
  return (
    <div>
      <div className='flex justify-between items-center'>
        <h1>Parameters</h1>
        <CreateParameterButton />
      </div>
      {res.success && res?.data && <ParametersList parameters={res?.data} />}
      <CreateParameterModal />
      <UpdateParameterModal />
    </div>
  );
}
