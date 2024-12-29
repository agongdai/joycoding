import { RootState } from '@myex/store';

export const selectWssLive = (state: RootState) => state.wss.live;
