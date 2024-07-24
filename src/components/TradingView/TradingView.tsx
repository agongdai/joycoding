'use client';

import React from 'react';
import cx from 'classnames';
import _upperFirst from 'lodash/upperFirst';
import TradingViewWidget from 'react-tradingview-widget';

import Collapse from '@mui/material/Collapse';
import useMyexTheme from '@myex/hooks/useMyexTheme';
import useTradingView from '@myex/hooks/useTradingView';

/**
 * The trading view is on client-side only, no SSR
 * @constructor
 */
export default function TradingView() {
  const { theme } = useMyexTheme();
  const { currentCurrency, showTradingView } = useTradingView();

  return (
    <Collapse in={showTradingView} timeout='auto'>
      <div className={cx('h-[50rem] my-6')}>
        <TradingViewWidget
          theme={_upperFirst(theme || 'Dark')}
          autosize
          symbol={`Binance:${currentCurrency}USDT`}
        />
      </div>
    </Collapse>
  );
}
