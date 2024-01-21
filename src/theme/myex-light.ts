import { createTheme, Shadows } from '@mui/material/styles';
import fonts from '@myex/theme/font';

import breakpoints from './breakpoints';
import palette from './palette';

import '@mui/lab/themeAugmentation';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: breakpoints.sm,
      md: breakpoints.md,
      lg: breakpoints.lg,
      xl: breakpoints.xl,
      xxl: breakpoints.xxl,
    },
  },
  spacing: (factor: number) => `${0.4 * factor}rem`,
  shadows: ['none'].concat(
    Array(25).fill(
      '0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)',
    ),
  ) as Shadows,
  typography: {
    htmlFontSize: 10,
    fontFamily: [fonts.default.style.fontFamily, '"Source Sans Pro"', 'Roboto', 'sans-serif'].join(
      ',',
    ),
    h1: { fontSize: '4rem', fontWeight: '600' },
    h2: { fontSize: '3.4rem', fontWeight: '600' },
    h3: { fontSize: '2.8rem', fontWeight: '600' },
    h4: { fontSize: '2.4rem', fontWeight: '600' },
    h5: { fontSize: '2rem', fontWeight: '600' },
  },
  palette: {
    text: {
      primary: palette.textPrimary,
      secondary: palette.textSecondary,
      disabled: palette.textDisabled,
    },
    primary: {
      main: palette.primaryMain,
      light: palette.primary25,
      dark: palette.primaryDark,
    },
    secondary: {
      main: palette.secondaryMain,
      light: palette.secondary25,
      dark: palette.secondaryDark,
    },
    tertiary: {
      main: palette.tertiaryMain,
      dark: palette.tertiaryDark,
      contrastText: palette.white,
    },
    error: {
      main: palette.errorMain,
      light: palette.error50,
      dark: palette.errorDark,
    },
    warning: {
      main: palette.warningMain,
      dark: palette.warningDark,
      contrastText: palette.white,
    },
    info: {
      main: palette.infoMain,
      dark: palette.infoDark,
      contrastText: palette.white,
    },
    success: {
      main: palette.successMain,
      dark: palette.successDark,
      contrastText: palette.white,
    },
    highlight: {
      main: palette.highlightMain,
      dark: palette.highlightDark,
      contrastText: palette.white,
    },
    white: {
      main: palette.white,
      light: palette.white,
      dark: palette.gray200,
      contrastText: palette.textPrimary,
    },
  },
  components: {
    MuiAlert: {
      styleOverrides: {
        message: {
          padding: 0,
        },
        root: {
          color: palette.textPrimary,
        },
        standardInfo: {
          backgroundColor: palette.infoDark,
        },
        standardWarning: {
          backgroundColor: palette.warningDark,
        },
        standardError: {
          backgroundColor: palette.error50,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
          color: palette.textPrimary,
          boxShadow: 'none',
        },
      },
    },
    MuiBadge: {
      styleOverrides: {
        badge: {
          whiteSpace: 'nowrap',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          height: '3.6rem',
          lineHeight: 1,
          borderRadius: '0.2rem',
          whiteSpace: 'nowrap',
          boxShadow: 'rgba(58, 53, 65, 0.42) 0px 4px 8px -4px',
          '&:hover': {
            boxShadow: 'rgba(58, 53, 65, 0.56) 0px 6px 18px -8px',
          },
        },
        sizeLarge: {
          height: '4.4rem',
          padding: '1rem 2.2rem',
        },
        sizeSmall: {
          height: '2.7rem',
          fontSize: '1.3rem',
          padding: '0.3rem 1rem',
        },
        text: {
          height: 'auto',
          fontWeight: 700,
        },
        textSizeLarge: {
          height: 'auto',
          fontSize: '1.6rem',
        },
      },
    },
    MuiButtonGroup: {
      styleOverrides: {
        grouped: {
          fontWeight: 500,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: 'rgba(58, 53, 65, 0.1) 0px 2px 10px 0px',
          backgroundColor: palette.bgWhite,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          margin: '2.4rem 0',
          borderColor: palette.borderLight,
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          paddingLeft: '3rem',
          '&.Mui-selected': {
            backgroundColor: palette.bgLightMain,
            '& .MuiListItemIcon svg': {
              color: palette.primaryMain,
            },
            '& .MuiTypography-root': {
              color: palette.primaryMain,
            },
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: '4rem',
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {},
      },
    },
    MuiSkeleton: {
      styleOverrides: {
        root: {
          backgroundColor: palette.bgPrimary10,
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        contained: {
          marginLeft: 0,
          marginRight: 0,
          alignSelf: 'flex-start',
        },
        root: {
          lineHeight: 1.3,
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          position: 'static',
          fontSize: '1.4rem',
          transform: 'none',
          marginBottom: '0.4rem',
        },
      },
    },
    MuiMobileStepper: {
      styleOverrides: {
        root: {
          backgroundColor: palette.bgPrimary10,
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          textTransform: 'capitalize',

          '&.Mui-selected': {
            backgroundColor: palette.primaryMain,
            color: palette.white,
            fontWeight: 'bold',
            '&:hover': {
              backgroundColor: palette.primaryDark,
            },
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          height: 40,
          borderRadius: '0.4rem',
          '&.Mui-disabled': {
            border: `1px dashed ${palette.textDisabled}`,
            backgroundColor: palette.bgLightLight,
          },
        },
        multiline: {
          height: 'auto',
          padding: '10px 14px',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        elevation8: {
          boxShadow:
            '0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)',
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          borderBottom: `1px solid ${palette.borderLight}`,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          minHeight: 0,
          textTransform: 'none',
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: palette.gray900,
          color: palette.white,
        },
        arrow: {
          color: palette.gray900,
        },
      },
    },
  },
});

declare module '@mui/material/styles' {
  interface Palette {
    highlight: Palette['primary'];
    white: Palette['primary'];
    tertiary: Palette['primary'];
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    highlight?: PaletteOptions['primary'];
    white?: PaletteOptions['primary'];
    tertiary?: PaletteOptions['primary'];
  }

  interface BreakpointOverrides {
    xxl: true;
  }
}

// Update the Button's color prop options
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    highlight: true;
    white: true;
    tertiary: true;
  }
}

declare module '@mui/material/Badge' {
  interface BadgePropsColorOverrides {
    highlight: true;
    white: true;
    tertiary: true;
  }
}

declare module '@mui/material/SvgIcon' {
  interface SvgIconPropsColorOverrides {
    highlight: true;
    white: true;
    tertiary: true;
  }
}

export default theme;
