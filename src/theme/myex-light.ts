import createTheme from '@mui/material/styles/createTheme';
import { Shadows } from '@mui/material/styles/shadows';
import fonts from '@myex/theme/font';

import { muiBreakpoints } from './mui';
import palette from './palette';

import '@mui/lab/themeAugmentation';

const theme = createTheme({
  breakpoints: muiBreakpoints,
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
    MuiAccordion: {
      styleOverrides: {
        root: {
          backgroundColor: palette.bgLightDark,
          boxShadow: 'none',
          borderRadius: 0,
          border: `1px solid ${palette.borderLight}`,
          borderBottom: 0,
          '&.Mui-expanded': {
            margin: 0,
          },
          '&:last-child': {
            borderBottom: `1px solid ${palette.borderLight}`,
          },
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          padding: '1.6rem 2rem',
          '&:hover': {
            backgroundColor: palette.bgLightMain,
          },
          '&.Mui-expanded': {
            minHeight: '4.8rem',
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
    MuiDialogActions: {
      styleOverrides: {
        root: {
          borderTop: `1px solid ${palette.borderLight}`,
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          borderBottom: `1px solid ${palette.borderLight}`,
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
    MuiFilledInput: {
      styleOverrides: {
        input: {
          paddingTop: '1.7rem',
          paddingBottom: '1.7rem',
        },
        multiline: {
          height: 'auto',
          paddingTop: 0,
          paddingBottom: 0,
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          [muiBreakpoints.down('sm')]: {
            padding: '0.4rem',
          },
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
