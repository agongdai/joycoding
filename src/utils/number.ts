export const removeTrailingZeros = (num: number | string) => {
  return String(num).replace(/(\.[0-9]*[1-9])0+$|\.0*$/, '$1'); // Remove trailing zeros
};
