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
