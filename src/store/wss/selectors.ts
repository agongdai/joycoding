import { WSS_CONNECTION_TRY_TIMES } from '@myex/config';
import { RootState } from '@myex/store';

export const selectWssLive = (state: RootState) => state.wss.live;
export const selectWssNTryTimes = (state: RootState) => state.wss.nTryTimes;
export const selectHasExceededMaxTrials = (state: RootState) =>
  state.wss.nTryTimes >= WSS_CONNECTION_TRY_TIMES;
