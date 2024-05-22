import { auth } from '@myex/auth';
import { ApiHandler, HttpStatusCode } from '@myex/types/api';
import { apiFailure, apiSuccess } from '@myex/utils/api';

export const GET = auth((req) => {
  if (req.auth) {
    return apiSuccess('Protected data');
  }

  return apiFailure(HttpStatusCode.Unauthorized);
}) as ApiHandler<string>;
