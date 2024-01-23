export const replaceArrayIndexes = <T>(array: T[], indexes: number[], items: T[]): T[] => {
  if (!Array.isArray(array) || !Array.isArray(indexes) || !Array.isArray(items)) {
    console.warn('[dev] wrong parameters for function replaceArrayIndexes');
    return [];
  }

  if (indexes.length !== items.length || indexes.find((i) => i < 0 || i >= array.length)) {
    console.warn('[dev] wrong parameters for function replaceArrayIndexes');
    return [];
  }

  for (let i: number = 0; i < indexes.length; i++) {
    array[indexes[i]] = items[i];
  }

  return [...array];
};
