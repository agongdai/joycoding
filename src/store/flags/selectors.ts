import { RootState } from '@myex/store';

export const selectCreateCoinModalOpen = (state: RootState) => state.flags.createCoinModalOpen;
export const selectCreateWalletModalOpen = (state: RootState) => state.flags.createWalletModalOpen;
export const selectCreateParameterModalOpen = (state: RootState) =>
  state.flags.createParameterModalOpen;
export const selectCoinBeingUpdated = (state: RootState) => state.flags.coinBeingUpdated;
export const selectWalletBeingUpdated = (state: RootState) => state.flags.walletBeingUpdated;
export const selectParameterBeingUpdated = (state: RootState) => state.flags.parameterBeingUpdated;
