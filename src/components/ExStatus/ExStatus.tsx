import React from 'react';

import { Button } from '@mui/material';
import MyexTooltip from '@myex/components/@mui/material/Tooltip';
import MyexLink from '@myex/components/MyexLink';
import { ExchangeStatus } from '@myex/types/common';

export default function BfxApiStatus({ status }: { status: ExchangeStatus }) {
  const offline = status === ExchangeStatus.Maintenance;
  return (
    <MyexLink href='https://bitfinex.statuspage.io/' className='no-underline'>
      <MyexTooltip title='Visit Bitfinex status page'>
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
