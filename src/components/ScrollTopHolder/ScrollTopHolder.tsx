'use client';
import React, { useCallback, useEffect } from 'react';

import { useMyexDispatch, useMyexSelector } from '@myex/store';
import { setScrollTop } from '@myex/store/actions';
import { selectScrollTop } from '@myex/store/dom/selectors';

interface Props {
  children: React.ReactNode;
}

export default function ScrollTopHolder({ children }: Props) {
  const dispatch = useMyexDispatch();
  const holderRef = React.useRef<HTMLDivElement>(null);
  const scrollTop = useMyexSelector(selectScrollTop);

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
    <div className='flex-1 px-4 myex-scrollbar lg:p-0 flex flex-col' ref={holderRef}>
      {children}
    </div>
  );
}
