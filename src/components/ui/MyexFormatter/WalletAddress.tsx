import React from 'react';

import { faCopy } from '@fortawesome/pro-solid-svg-icons';
import AwesomeIcon from '@myex/components/AwesomeIcon';
import MyexCopiable from '@myex/components/ui/MyexCopiable';
import { Value } from '@myex/types/common';

export default function WalletAddress({ value }: { value: Value }) {
  const displayed = String(value).slice(0, 6) + '...' + String(value).slice(-4);

  return (
    <div className='flex'>
      <span className='mr-1'>{displayed}</span>
      <MyexCopiable text={String(value)} tipText='Copy address to clipboard'>
        <AwesomeIcon icon={faCopy} size='sm' />
      </MyexCopiable>
    </div>
  );
}
