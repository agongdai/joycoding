import { RootState } from '@myex/store';

export const selectFavorites = (state: RootState) => state.trading.favorites;
export const selectShowFavorites = (state: RootState) => state.trading.showFavorites;
