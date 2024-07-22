/**
 * Replace array items with new items by indexes.
 * @param array
 * @param indexes
 * @param items
 */
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

/**
 * Toggle an item in an array.
 * @param array
 * @param item
 */
export const toggleItemInArray = <T>(array: T[], item: T): T[] => {
  if (array.includes(item)) {
    return array.filter((f) => f !== item);
  }

  return [...array, item];
};
