import { BookField, BookSide } from '@myex/types/book';

const fields: BookField[] = ['count', 'amount', 'total', 'price'];

export const getFieldsForSide = (side: BookSide) => {
  return side === BookSide.Bids ? fields : fields.slice().reverse();
};
