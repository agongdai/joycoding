import { useEffect, useState } from 'react';

import { Value } from '@myex/types/common';

import usePrevious from './usePrevious';

export default function useFlashOnChange(value: Value) {
  const [diff, setDiff] = useState<number | null>(null);
  const prevValue = usePrevious(value);

  useEffect(() => {
    if (value === prevValue) {
      return;
    }
    setDiff(Number(value) - Number(prevValue));
  }, [prevValue, value]);

  useEffect(() => {
    if (!diff) {
      return;
    }
    const timer = setTimeout(() => setDiff(0), 500);

    return () => clearTimeout(timer);
  }, [diff]);

  if (!diff) {
    return '';
  }

  return diff > 0 ? 'bg-go-up' : 'bg-go-down';
}
