import React from 'react';

import MyexTooltip from '@myex/components/@mui/material/Tooltip';
import MyexImage from '@myex/components/MyexImage';
import { Exchange } from '@myex/types/exchange';

interface Props {
  exchange: Exchange;
  tooltip: string;
}

export default function ExchangeIcon({ exchange, tooltip }: Props) {
  return (
    <div className='mx-1'>
      <MyexTooltip title={tooltip || exchange}>
        <div>
          <MyexImage
            src={`/exchanges/${exchange.toLowerCase()}-icon.svg`}
            alt={exchange}
            width={28}
            height={28}
          />
        </div>
      </MyexTooltip>
    </div>
  );
}
