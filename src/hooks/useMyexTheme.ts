'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

export default function useMyexTheme() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return { theme: undefined, setTheme };
  }

  return { theme, setTheme };
}
