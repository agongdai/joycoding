import React from 'react';

import Button from '@mui/material/Button';
import MyexLink from '@myex/components/ui/MyexLink';
import MyexTooltip from '@myex/components/ui/MyexTooltip';
import { ExchangeStatus } from '@myex/types/common';

export default function ExStatus({ status }: { status: ExchangeStatus }) {
  const offline = status === ExchangeStatus.Maintenance;
  return (
    <MyexLink href='https://bitfinex.statuspage.io/' className='no-underline'>
      <MyexTooltip title='At your service'>
        <Button
          variant='contained'
          color={offline ? 'tertiary' : 'success'}
          disabled={offline}
          size='small'
        >
          Bitfinex: {offline ? 'Offline' : 'Online'}
        </Button>
      </MyexTooltip>
    </MyexLink>
  );
}
