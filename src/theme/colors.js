const paletteBase = {
  black: '#000',
  white: '#fff',

  primaryMain: 'rgba(234, 84, 85, 1)',
  primaryDark: 'rgba(234, 72, 73, 1)',
  primary50: 'rgba(234, 84, 85, 0.5)',
  primary25: 'rgba(234, 84, 85, 0.25)',
  primary10: 'rgba(234, 84, 85, 0.10)',
  primary5: 'rgba(234, 84, 85, 0.05)',

  secondaryMain: 'rgba(159, 145, 204, 1)',
  secondaryDark: 'rgba(147, 130, 203, 1)',
  secondary50: 'rgba(159, 145, 204, 0.5)',
  secondary25: 'rgba(159, 145, 204, 0.25)',
  secondary10: 'rgba(159, 145, 204, 0.10)',
  secondary5: 'rgba(159, 145, 204, 0.05)',

  tertiaryMain: 'rgba(58, 53, 65, 0.87)',
  tertiaryDark: 'rgba(231, 227, 252, 0.87)',

  gray50: '#fafafa',
  gray100: '#f5f5f5',
  gray200: '#eeeeee',
  gray300: '#e0e0e0',
  gray400: '#bdbdbd',
  gray500: '#9e9e9e',
  gray600: '#757575',
  gray700: '#616161',
  gray800: '#424242',
  gray900: '#212121',

  successMain: 'rgba(22, 177, 87, 1)',
  successDark: 'rgba(5, 154, 87, 1)',

  warningMain: 'rgb(255, 180, 0)',
  warningDark: 'rgb(224, 158, 0)',
  warning25: 'rgba(255, 180, 0, 0.25)',

  errorMain: 'rgba(240, 83, 89, 1)',
  errorDark: 'rgba(219, 63, 63, 1)',
  error50: 'rgba(240, 84, 84, 0.5)',
  error25: 'rgba(240, 84, 84, 0.25)',

  infoMain: 'rgba(104, 129, 255, 0.75)',
  infoDark: 'rgba(104, 129, 255, 1)',
  info10: 'rgba(104, 129, 255, 0.1)',

  bgLightLight: 'rgb(255, 255, 255)',
  bgLightMain: '#FAFBFF',
  bgLightDark: '#efefef',
  bgWhite: 'rgba(255, 255, 255, 1)',
  bgDarkMain: '#213555',
  bgDarkLight: 'rgba(45, 64, 89, 1)',
  bgDarkDark: '#1d304e',
  bgPrimary5: 'rgba(145, 85, 253, 0.05)',
  bgPrimary10: 'rgba(145, 85, 253, 0.10)',

  highlightMain: 'rgba(255, 109, 76, 0.75)',
  highlightDark: 'rgba(255, 109, 76, 1)',

  hoverBgLight: 'rgba(0, 0, 0, 0.04)',
  hoverBgDark: 'rgba(40, 56, 78, 1)',
  selectedBgLight: 'rgba(234, 84, 85, 0.12)',
  selectedBgDark: 'rgba(234, 84, 85, 0.12)',
};

// eslint-disable-next-line no-undef
module.exports = {
  ...paletteBase,

  textPrimary: paletteBase.gray800,
  textSecondary: paletteBase.gray600,
  textDisabled: paletteBase.gray500,
  textHighlight: paletteBase.primaryMain,

  textPrimary1: paletteBase.white,
  textSecondary1: paletteBase.gray300,
  textDisabled1: paletteBase.gray500,

  goUp: paletteBase.successMain,
  goDown: paletteBase.errorMain,

  link: paletteBase.primaryMain,

  borderLight: paletteBase.gray200,
  borderDark: paletteBase.secondary25,
};
