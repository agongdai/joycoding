import { RootState } from '@myex/store';

export const selectCreateCoinModalOpen = (state: RootState) => state.flags.createCoinModalOpen;
export const selectCoinBeingUpdated = (state: RootState) => state.flags.coinBeingUpdated;
export const selectUpsertWalletModalOpen = (state: RootState) => state.flags.upsertWalletModalOpen;
export const selectWalletBeingUpdated = (state: RootState) => state.flags.walletBeingUpdated;
