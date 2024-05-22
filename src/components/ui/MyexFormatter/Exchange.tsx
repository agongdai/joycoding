import React from 'react';
import cx from 'classnames';

import MyexImage from '@myex/components/ui/MyexImage';
import MyexLink from '@myex/components/ui/MyexLink';
import MyexTooltip from '@myex/components/ui/MyexTooltip';
import exchanges from '@myex/data/exchanges.json';
import { Value } from '@myex/types/common';

interface Props {
  value: Value;
  currency?: string;
  tooltip?: string;
  className?: string;
}

export default function Exchange({ value, currency, tooltip, className = '' }: Props) {
  const exchange = exchanges.find((e) => e.exchangeId === value);
  return exchange ? (
    <MyexTooltip title={tooltip || exchange.name}>
      <div className={cx('flex', className)}>
        <MyexLink
          href={
            currency
              ? exchange.tradeUrl.replace('${currency}', currency.toUpperCase())
              : exchange.url
          }
        >
          <MyexImage src={exchange.icon} alt={exchange.name} height={28} width={28} />
        </MyexLink>
      </div>
    </MyexTooltip>
  ) : null;
}
