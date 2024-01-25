'use client';

import React from 'react';

import { faChartMixed } from '@fortawesome/pro-duotone-svg-icons';
import MyexTooltip from '@myex/components/@mui/material/Tooltip';
import AwesomeIcon from '@myex/components/AwesomeIcon';
import { useMyexDispatch, useMyexSelector } from '@myex/store';
import { toggleShowTradingView } from '@myex/store/trading/actions';
import { selectShowTradingView } from '@myex/store/trading/selectors';
import { StyleVariant } from '@myex/types/common';

export default function TradingViewSwitch() {
  const showTradingView = useMyexSelector(selectShowTradingView);
  const dispatch = useMyexDispatch();
  const toggle = () => {
    dispatch(toggleShowTradingView());
  };

  return (
    <MyexTooltip title='Live price chart'>
      <div className='inline-block cursor-pointer mx-1' onClick={toggle}>
        <AwesomeIcon
          size='lg'
          icon={faChartMixed}
          variant={showTradingView ? StyleVariant.Highlight : StyleVariant.Secondary}
        />
      </div>
    </MyexTooltip>
  );
}
