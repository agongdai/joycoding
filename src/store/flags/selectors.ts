import { RootState } from '@myex/store';

export const selectCreateCoinModalOpen = (state: RootState) => state.flags.createCoinModalOpen;
export const selectCoinBeingUpdated = (state: RootState) => state.flags.coinBeingUpdated;
