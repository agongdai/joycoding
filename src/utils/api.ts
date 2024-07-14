import { auth } from '@myex/auth';
import { HttpStatusMessage } from '@myex/config';
import { HttpStatusCode } from '@myex/types/api';

export const apiSuccess = <T>(data: T) => ({
  data,
  success: true,
  message: HttpStatusMessage[HttpStatusCode.Ok],
});

export const restApiSuccess = <T>(data: T) =>
  Response.json({
    data,
    success: true,
    message: HttpStatusMessage[HttpStatusCode.Ok],
  });

export const apiFailure = (
  status = HttpStatusCode.InternalServerError,
  message = HttpStatusMessage[HttpStatusCode.InternalServerError],
) => ({
  message: HttpStatusMessage[status] || message,
  status,
  success: false,
  data: null,
});

export const restApiFailure = (
  status = HttpStatusCode.InternalServerError,
  message = HttpStatusMessage[HttpStatusCode.InternalServerError],
) =>
  Response.json({
    message: HttpStatusMessage[status] || message,
    status,
    success: false,
  });

export const withAdmin = async (callback: () => {}) => {
  const session = await auth();
  const sessionUser = session?.user;
  if (!sessionUser?.isAdmin) {
    return apiFailure(HttpStatusCode.Unauthorized);
  }
  return callback;
};
