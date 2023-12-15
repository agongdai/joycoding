'use client';
import React, { useCallback, useEffect } from 'react';

import { useJsesDispatch, useJsesSelector } from '@jses/store';
import { setScrollTop } from '@jses/store/actions';
import { selectScrollTop } from '@jses/store/dom/selectors';

interface Props {
  children: React.ReactNode;
}

export default function ScrollTopHolder({ children }: Props) {
  const dispatch = useJsesDispatch();
  const holderRef = React.useRef<HTMLDivElement>(null);
  const scrollTop = useJsesSelector(selectScrollTop);

  const setScrollTopEvent = useCallback(() => {
    if (holderRef.current) {
      dispatch(setScrollTop(holderRef.current.scrollTop));
    }
  }, [dispatch]);

  useEffect(() => {
    const holder = holderRef?.current;
    if (holder) {
      holder.addEventListener('scroll', setScrollTopEvent);

      return () => {
        if (holder) {
          holder.removeEventListener('scroll', setScrollTopEvent);
        }
      };
    }
  }, [setScrollTopEvent]);

  useEffect(() => {
    if (holderRef.current && holderRef.current.scrollTop !== scrollTop) {
      holderRef.current.scrollTop = scrollTop;
    }
  }, [scrollTop]);

  return (
    <div className='flex-1 px-4 jses-scrollbar lg:p-0' ref={holderRef}>
      {children}
    </div>
  );
}
