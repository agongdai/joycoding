import { RootState } from '@myex/store';
import { Exchange } from '@myex/types/exchange';

export const selectFavorites = (state: RootState) => state.trading.favorites;
export const selectShowFavorites = (state: RootState) => state.trading.showFavorites;
export const selectWsLive = (state: RootState) => state.trading.wsLive;
export const selectExchangeWsLive = (exchange: Exchange) => (state: RootState) =>
  (state?.trading?.wsLive || {})[exchange];
export const selectShowTradingView = (state: RootState) => state.trading.showTradingView;
export const selectCurrentCurrency = (state: RootState) => state.trading.currentCurrency || 'BTC';
