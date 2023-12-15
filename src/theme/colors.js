const paletteBase = {
  black: '#000',
  white: '#fff',

  primaryMain: 'rgba(234, 84, 85, 1)',
  primaryDark: 'rgba(234, 72, 73, 1)',
  primary50: 'rgba(234, 84, 85, 0.5)',
  primary25: 'rgba(234, 84, 85, 0.25)',
  primary10: 'rgba(234, 84, 85, 0.10)',
  primary5: 'rgba(234, 84, 85, 0.05)',

  secondaryMain: 'rgba(255, 148, 148, 1)',
  secondaryDark: 'rgba(235, 137, 137, 1)',
  secondary50: 'rgba(255, 148, 148, 0.5)',
  secondary25: 'rgba(255, 148, 148, 0.25)',
  secondary10: 'rgba(255, 148, 148, 0.10)',
  secondary5: 'rgba(255, 148, 148, 0.05)',

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

  successMain: 'rgba(50, 160, 80, 0.75)',
  successDark: 'rgba(50, 160, 80, 1)',

  warningMain: 'rgb(255, 180, 0)',
  warningDark: 'rgb(224, 158, 0)',
  warning25: 'rgba(255, 180, 0, 0.25)',

  errorMain: 'rgba(255, 109, 76, 0.75)',
  errorDark: 'rgba(255, 109, 76, 1)',
  error50: 'rgba(255, 109, 76, 50)',

  infoMain: 'rgba(104, 129, 255, 0.75)',
  infoDark: 'rgba(104, 129, 255, 1)',
  info10: 'rgba(104, 129, 255, 0.1)',

  bgLightLight: 'rgb(255, 255, 255)',
  bgLightMain: '#FAFBFF',
  bgWhite: 'rgba(255, 255, 255, 1)',
  bgDarkMain: '#213555',
  bgDarkLight: 'rgba(45, 64, 89, 1)',
  bgPrimary5: 'rgba(145, 85, 253, 0.05)',
  bgPrimary10: 'rgba(145, 85, 253, 0.10)',

  highlightMain: 'rgba(255, 109, 76, 0.75)',
  highlightDark: 'rgba(255, 109, 76, 1)',
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

  link: paletteBase.primaryMain,

  borderLight: paletteBase.gray200,
  borderDark: paletteBase.primary25,
};
