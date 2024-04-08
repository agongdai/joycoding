import createTheme from '@mui/material/styles/createTheme';
import { Shadows } from '@mui/material/styles/shadows';
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
      primary: palette.textPrimary1,
      secondary: palette.textSecondary1,
      disabled: palette.textDisabled1,
    },
    primary: {
      main: palette.primaryMain,
      light: palette.primary25,
      dark: palette.primaryDark,
    },
    secondary: {
      main: palette.textSecondary1,
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
      light: palette.infoDark,
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
    MuiAccordion: {
      styleOverrides: {
        root: {
          backgroundColor: palette.bgDarkDark,
          boxShadow: 'none',
          borderRadius: 0,
          border: `1px solid ${palette.borderDark}`,
          borderBottom: 0,
          '&.Mui-expanded': {
            margin: 0,
          },
          '&:last-child': {
            borderBottom: `1px solid ${palette.borderDark}`,
          },
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          padding: '1.6rem 2rem',
          '&:hover': {
            backgroundColor: palette.bgDarkMain,
          },
          '&.Mui-expanded': {
            minHeight: '4.8rem',
            backgroundColor: palette.bgDarkMain,
          },
        },
        content: {
          margin: 0,
          '&.Mui-expanded': {
            margin: 0,
          },
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          padding: '1rem 3rem 3rem',
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        message: {
          padding: 0,
        },
        root: {
          color: palette.white,
          '& .MuiAlert-icon': {
            color: palette.white,
          },
        },
        standardInfo: {
          backgroundColor: palette.infoDark,
        },
        standardWarning: {
          backgroundColor: palette.warningDark,
        },
        standardError: {
          backgroundColor: palette.error25,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
          color: palette.textPrimary1,
          boxShadow: 'none',
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
          '&.Mui-disabled': {
            color: palette.textDisabled1,
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
    MuiDialogActions: {
      styleOverrides: {
        root: {
          borderTop: `1px solid ${palette.borderDark}`,
          padding: '1rem',
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          borderBottom: `1px solid ${palette.borderDark}`,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          margin: '2.4rem 0',
          borderColor: palette.borderDark,
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        input: {
          paddingTop: '1.7rem',
          paddingBottom: '1.7rem',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          paddingLeft: '3rem',
          '&.Mui-selected': {
            backgroundColor: palette.bgDarkMain,
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
          alignItems: 'center',
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: palette.bgDarkLight,
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: palette.textPrimary1,
          '&:hover': {
            backgroundColor: 'rgba(231, 227, 252, 0.04)',
          },
          '&.Mui-selected': {
            backgroundColor: palette.bgDarkMain,
          },
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: palette.tertiaryDark,

          '&.MuiSvgIcon-colorHighlight': {
            color: palette.highlightMain,
          },

          '&.MuiSvgIcon-colorSuccess': {
            color: palette.successMain,
          },
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
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          height: 40,
          borderRadius: '0.4rem',
          '&.Mui-disabled': {
            border: `1px dashed ${palette.textDisabled}`,
            backgroundColor: palette.bgDarkMain,
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
        root: {
          backgroundColor: palette.bgDarkDark,
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: palette.bgDarkDark,
          color: palette.white,
        },
        arrow: {
          color: palette.bgDarkDark,
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
