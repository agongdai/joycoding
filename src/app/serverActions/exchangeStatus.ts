import { BfxEndpoints } from '@myex/api/endpoints';
import { ExchangeStatus } from '@myex/types/common';

export async function checkBfxApiStatus(): Promise<ExchangeStatus> {
  const res = await fetch(BfxEndpoints.status.path);
  const data = await res.json();
  return data ? data[0] : ExchangeStatus.Maintenance;
}
