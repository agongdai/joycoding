import { apiFailure, apiSuccess } from '@myex/api/utils';
import { auth } from '@myex/auth';
import { ApiHandler, HttpStatusCode } from '@myex/types/api';

export const GET = auth((req) => {
  if (req.auth) {
    return apiSuccess('Protected data');
  }

  return apiFailure(HttpStatusCode.Unauthorized);
}) as ApiHandler<string>;
