'use client';
import { useEffect } from 'react';
import { enqueueSnackbar } from 'notistack';

export default function ErrorIndicator({ error }: { error: string }) {
  useEffect(() => {
    if (error) {
      enqueueSnackbar(error || 'Something wrong with our service.', { variant: 'error' });
    }
  }, [error]);

  return null;
}
