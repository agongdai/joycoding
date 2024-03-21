import { RootState } from '@myex/store';

export const selectFavorites = (state: RootState) => state.trading.favorites;
export const selectShowFavorites = (state: RootState) => state.trading.showFavorites;
export const selectLive = (state: RootState) => state.trading.live;
export const selectShowTradingView = (state: RootState) => state.trading.showTradingView;
export const selectCurrentPair = (state: RootState) => state.trading.currentCurrency || 'BTC';
