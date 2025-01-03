export const removeTrailingZeros = (num: number | string) => {
  return String(num).replace(/(\.[0-9]*[1-9])0+$|\.0*$/, '$1'); // Remove trailing zeros
};

/**
 * Shorten a number to K, M, B
 * @param str
 */
export const shortenNumber = (str: string) => {
  const n = Number(str);
  if (isNaN(n)) {
    return [0, ''];
  }

  if (n < 100) {
    return [n, ''];
  }
  if (n < 1_000_000) {
    return [n / 1000, 'K'];
  }
  if (n < 1_000_000_000) {
    return [n / 1_000_000, 'M'];
  }

  return [n / 1_000_000_000, 'B'];
};

/**
 * Automatically determine the number of decimal places
 * @param num
 */
export const autoDecimal = (num: number | string) => {
  const n = Number(num);
  if (isNaN(n)) {
    return 0;
  }

  if (n < 0.0001) {
    return 8;
  }

  if (n < 0.01) {
    return 6;
  }

  if (n < 1) {
    return 4;
  }

  if (n < 10) {
    return 3;
  }

  if (n < 100) {
    return 2;
  }

  if (n < 1000) {
    return 1;
  }

  return 0;
};
