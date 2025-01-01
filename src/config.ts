import { HttpStatusCode } from '@myex/types/api';

export const IS_PROD: boolean = process.env.NODE_ENV === 'production';

export const MOBILE_QUERY: string = '(max-width: 768px)';

/** Side bar width in rem */
export const SIDEBAR_WIDTH_DESKTOP: number = 21;
export const SIDEBAR_WIDTH_TABLET: number = 5.5;

export const FIAT_CURRENCY_SYMBOL: string = '$';

export const PRICE_MAX_DECIMAL_PLACES: number = 8;
export const PRICE_DEFAULT_DECIMAL_PLACES: number = 3;
export const NUMBER_DECIMALS_FOR_SHORTENED: number = 3;

export const IGNORED_USD_THRESHOLD: number = 1;

export const HttpStatusMessage: Record<HttpStatusCode, string> = {
  [HttpStatusCode.Ok]: 'Ok',
  [HttpStatusCode.Created]: 'Created',
  [HttpStatusCode.BadRequest]: 'Bad request',
  [HttpStatusCode.Unauthorized]: 'Unauthorized',
  [HttpStatusCode.NotFound]: 'Not found',
  [HttpStatusCode.InternalServerError]: 'Internal server error',
  [HttpStatusCode.Conflict]: 'Conflict',
  [HttpStatusCode.UnprocessableEntity]: 'Unprocessable entity',
  [HttpStatusCode.TooManyRequests]: 'Too many requests',
  [HttpStatusCode.AlreadyReported]: 'Already reported',
  [HttpStatusCode.Redirect]: 'Redirect',
  [HttpStatusCode.PreconditionFailed]: 'Precondition failed',
  [HttpStatusCode.NotAcceptable]: 'Not acceptable',
  [HttpStatusCode.Forbidden]: 'Forbidden',
};

export const BLOCK_DAEMON_API_BASE = 'https://svc.blockdaemon.com/universal/v1';

export const INITIAL_INVESTMENT = 70000; // @todo to move it into db.
