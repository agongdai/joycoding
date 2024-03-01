import React from 'react';

import MyexTooltip from '@myex/components/@mui/material/Tooltip';
import MyexImage from '@myex/components/MyexImage';
import MyexLink from '@myex/components/MyexLink';
import exchanges from '@myex/data/exchanges.json';
import { Value } from '@myex/types/common';

interface Props {
  value: Value;
}

export default function Exchange({ value }: Props) {
  const exchange = exchanges.find((e) => e.exchangeId === value);
  return exchange ? (
    <MyexTooltip title={exchange.name}>
      <div className='flex'>
        <MyexLink href={exchange.url}>
          <MyexImage src={exchange.icon} alt={exchange.name} height={28} width={28} />
        </MyexLink>
      </div>
    </MyexTooltip>
  ) : null;
}
