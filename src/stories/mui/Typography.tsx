import React from 'react';

import { Typography as MuiTypography, TypographyProps as MuiTypographyProps } from '@mui/material';

type TypographyPartialProps = Pick<MuiTypographyProps, 'variant'>;

export interface TypographyStoryProps extends TypographyPartialProps {
  children: React.ReactNode;
}

export const Typography = ({ children, ...rest }: TypographyStoryProps): React.ReactElement => (
  <MuiTypography {...rest}>{children}</MuiTypography>
);

Typography.defaultProps = {
  variant: 'h1',
};
