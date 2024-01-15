'use client';

import usePrevious from '@myex/hooks/usePrevious';
import { useMyexSelector } from '@myex/store';
import { selectScrollTop } from '@myex/store/dom/selectors';
import { Direction } from '@myex/types/window';

export default function useScrollDirection() {
  const scrollTop = useMyexSelector(selectScrollTop);
  const previousScrollTop = usePrevious(scrollTop);

  return scrollTop && scrollTop > previousScrollTop ? Direction.Down : Direction.Up;
}
