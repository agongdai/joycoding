import { createBreakpoints } from '@mui/system';
import breakpoints from '@myex/theme/breakpoints';

export const muiBreakpoints = createBreakpoints({
  values: {
    xs: 0,
    sm: breakpoints.sm,
    md: breakpoints.md,
    lg: breakpoints.lg,
    xl: breakpoints.xl,
    xxl: breakpoints.xxl,
  },
});
