import { myexFetchUserParameters } from '@myex/app/serverActions/myexUserParameter';
import { SystemParameterSettings } from '@myex/types/system';
import { restApiFailure, restApiSuccess } from '@myex/utils/api';

export const GET = async () => {
  const userParametersRes = await myexFetchUserParameters();
  if (!userParametersRes.success || !userParametersRes.data) return restApiFailure();

  return restApiSuccess<SystemParameterSettings>(userParametersRes.data);
};
