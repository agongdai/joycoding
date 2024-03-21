'use client';

import React from 'react';
import cx from 'classnames';
import _upperFirst from 'lodash/upperFirst';
import TradingViewWidget from 'react-tradingview-widget';

import { Collapse } from '@mui/material';
import useMyexTheme from '@myex/hooks/useMyexTheme';
import { useMyexSelector } from '@myex/store';
import { selectCurrentPair, selectShowTradingView } from '@myex/store/trading/selectors';
import { pairToTradingViewSymbol } from '@myex/utils/trading';

export default function TradingView() {
  const { theme } = useMyexTheme();
  const currentPair = useMyexSelector(selectCurrentPair);
  const showTradingView = useMyexSelector(selectShowTradingView);

  return (
    <Collapse in={showTradingView} timeout='auto'>
      <div className={cx('h-[50rem] my-6')}>
        <TradingViewWidget
          theme={_upperFirst(theme || 'Dark')}
          autosize
          symbol={`Bitfinex:${pairToTradingViewSymbol(currentPair)}UST`}
        />
      </div>
    </Collapse>
  );
}
