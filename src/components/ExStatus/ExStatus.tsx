import React from 'react';

import JsesTooltip from '@jses/components/@mui/material/Tooltip';
import JsesLink from '@jses/components/JsesLink';
import { ExchangeStatus } from '@jses/types/common';
import { Button } from '@mui/material';

export default function BfxApiStatus({ status }: { status: ExchangeStatus }) {
  const offline = status === ExchangeStatus.Maintenance;
  return (
    <JsesLink href='https://bitfinex.statuspage.io/' className='no-underline'>
      <JsesTooltip title='Visit Bitfinex status page'>
        <Button
          variant='contained'
          color={offline ? 'tertiary' : 'success'}
          disabled={offline}
          size='small'
        >
          Bitfinex: {offline ? 'Offline' : 'Online'}
        </Button>
      </JsesTooltip>
    </JsesLink>
  );
}
