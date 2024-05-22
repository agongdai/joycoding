import { ExchangeStatus } from '@myex/types/common';
import { BfxEndpoints } from '@myex/utils/endpoints';

export async function checkBfxApiStatus(): Promise<ExchangeStatus> {
  const res = await fetch(BfxEndpoints.status.path);
  const data = await res.json();
  return data ? data[0] : ExchangeStatus.Maintenance;
}
