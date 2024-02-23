import { HttpStatusMessage } from '@myex/config';
import { HttpStatusCode } from '@myex/types/api';

export const apiSuccess = <T>(data: T) =>
  Response.json({
    data,
    success: true,
    message: HttpStatusMessage[HttpStatusCode.Ok],
  });

export const apiFailure = (
  status = HttpStatusCode.InternalServerError,
  message = HttpStatusMessage[HttpStatusCode.InternalServerError],
) =>
  Response.json(
    {
      message: HttpStatusMessage[status] || message,
      status,
      success: false,
    },
    { status },
  );
