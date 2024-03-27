import React from 'react';

import { faCopy } from '@fortawesome/pro-solid-svg-icons';
import AwesomeIcon from '@myex/components/AwesomeIcon';
import Copiable from '@myex/components/Copiable';
import { Value } from '@myex/types/common';

export default function WalletAddress({ value }: { value: Value }) {
  const displayed = String(value).slice(0, 6) + '...' + String(value).slice(-4);

  return (
    <div className='flex'>
      <span className='mr-1'>{displayed}</span>
      <Copiable text={String(value)} tipText='Copy address to clipboard'>
        <AwesomeIcon icon={faCopy} size='sm' />
      </Copiable>
    </div>
  );
}
