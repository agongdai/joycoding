'use client';

import usePrevious from '@jses/hooks/usePrevious';
import { useJsesSelector } from '@jses/store';
import { selectScrollTop } from '@jses/store/dom/selectors';
import { Direction } from '@jses/types/window';

export default function useScrollDirection() {
  const scrollTop = useJsesSelector(selectScrollTop);
  const previousScrollTop = usePrevious(scrollTop);

  return scrollTop && scrollTop > previousScrollTop ? Direction.Down : Direction.Up;
}
