'use client';
import React from 'react';
import { ThemeProvider } from 'next-themes';
import _debounce from 'lodash/debounce';
import { MaterialDesignContent, SnackbarProvider } from 'notistack';
import { Provider as ReduxProvider } from 'react-redux';

import styled from '@emotion/styled';
import store from '@myex/store';
import { saveState } from '@myex/store/localStorage';
import { MyexTheme } from '@myex/theme';
import colors from '@myex/theme/colors';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const StyledMaterialDesignContent = styled(MaterialDesignContent)(() => ({
  '&.notistack-MuiContent-success': {
    backgroundColor: colors.successMain,
  },
  '&.notistack-MuiContent-error': {
    backgroundColor: colors.errorMain,
  },
  '&.notistack-MuiContent-info': {
    backgroundColor: colors.infoMain,
  },
  '&.notistack-MuiContent-warning': {
    backgroundColor: colors.warningMain,
  },
}));

// here we subscribe to the store changes
store.subscribe(
  // we use debounce to save the state once each 1000ms
  // for better performances in case multiple changes occur in a short time
  _debounce(() => {
    saveState(store.getState());
  }, 1000),
);

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider store={store}>
      <SnackbarProvider
        dense
        className='text-base'
        autoHideDuration={3000}
        Components={{
          success: StyledMaterialDesignContent,
          error: StyledMaterialDesignContent,
        }}
      >
        <QueryClientProvider client={queryClient}>
          <ThemeProvider defaultTheme={MyexTheme.Dark} attribute='class'>
            {children}
          </ThemeProvider>
        </QueryClientProvider>
      </SnackbarProvider>
    </ReduxProvider>
  );
}
