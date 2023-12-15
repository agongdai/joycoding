import { Theme } from '@mui/material';

import darkTheme from './jses-dark';
import lightTheme from './jses-light';

export * from './palette';

export enum JsesTheme {
  // eslint-disable-next-line no-unused-vars
  Light = 'light',
  // eslint-disable-next-line no-unused-vars
  Dark = 'dark',
}

export const DEFAULT_THEME = JsesTheme.Light;

export const themes: Record<JsesTheme, Theme> = {
  [JsesTheme.Light]: lightTheme,
  [JsesTheme.Dark]: darkTheme,
};
