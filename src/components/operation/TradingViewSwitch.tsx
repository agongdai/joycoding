'use client';

import React from 'react';

import { faChartMixed } from '@fortawesome/pro-solid-svg-icons';
import AwesomeIcon from '@myex/components/AwesomeIcon';
import MyexTooltip from '@myex/components/ui/MyexTooltip';
import useTradingView from '@myex/hooks/useTradingView';
import { StyleVariant } from '@myex/types/common';

interface Props {
  showTradingViewServer: boolean;
  currentCurrencyServer: string;
}

export default function TradingViewSwitch({ showTradingViewServer, currentCurrencyServer }: Props) {
  const { showTradingView, toggleShowTradingViewSync } = useTradingView(
    showTradingViewServer,
    currentCurrencyServer,
  );

  return (
    <MyexTooltip title='Live price chart'>
      <div className='inline-block cursor-pointer mx-1' onClick={toggleShowTradingViewSync}>
        <AwesomeIcon
          size='lg'
          icon={faChartMixed}
          variant={showTradingView ? StyleVariant.Highlight : StyleVariant.Secondary}
        />
      </div>
    </MyexTooltip>
  );
}
