'use client';
import { useEffect, useState } from 'react';

export default function JsesScrollToHash() {
  const [isMounted, setMounted] = useState(false);

  useEffect(() => {
    if (isMounted) {
      if (window.location.hash) {
        document.getElementById(window.location.hash.replace('#', ''))?.scrollIntoView();
      }
    } else {
      setMounted(true);
    }
  }, [isMounted]);

  return null;
}
