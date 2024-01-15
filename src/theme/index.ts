import { Theme } from '@mui/material';

import darkTheme from './myex-dark';
import lightTheme from './myex-light';

export * from './palette';

export enum MyexTheme {
  // eslint-disable-next-line no-unused-vars
  Light = 'light',
  // eslint-disable-next-line no-unused-vars
  Dark = 'dark',
}

export const DEFAULT_THEME = MyexTheme.Light;

export const themes: Record<MyexTheme, Theme> = {
  [MyexTheme.Light]: lightTheme,
  [MyexTheme.Dark]: darkTheme,
};
