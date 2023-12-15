const paletteBase = {
  black: '#000',
  white: '#fff',

  primaryMain: 'rgb(145, 85, 253)',
  primaryDark: 'rgb(128, 75, 223)',
  primary50: 'rgba(145, 85, 253, 0.5)',
  primary25: 'rgba(145, 85, 253, 0.25)',
  primary10: 'rgba(145, 85, 253, 0.10)',
  primary5: 'rgba(145, 85, 253, 0.05)',

  secondaryMain: 'rgba(117, 117, 117, 1)',
  secondaryDark: 'rgba(97, 97, 97, 1)',
  secondary50: 'rgba(117, 117, 117, 0.5)',
  secondary25: 'rgba(117, 117, 117, 0.25)',
  secondary10: 'rgba(117, 117, 117, 0.10)',
  secondary5: 'rgba(117, 117, 117, 0.05)',

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

  successMain: 'rgb(86, 202, 0)',
  successDark: 'rgb(76, 178, 0)',

  warningMain: 'rgb(255, 180, 0)',
  warningDark: 'rgb(224, 158, 0)',
  warning25: 'rgba(255, 180, 0, 0.25)',

  errorMain: 'rgb(255, 76, 81)',
  errorDark: 'rgb(224, 67, 71)',
  error50: 'rgba(255, 76, 81, 0.5)',

  infoMain: 'rgb(22, 177, 255)',
  infoDark: 'rgb(19, 156, 224)',
  info10: 'rgba(19, 156, 224, 0.10)',

  bgLightLight: 'rgb(255, 255, 255)',
  bgLightMain: 'rgb(250, 250, 250)',
  bgWhite: 'rgba(255, 255, 255, 1)',
  bgDarkMain: 'rgba(40, 36, 61, 1)',
  bgDarkLight: 'rgb(49, 45, 75)',
  bgPrimary5: 'rgba(145, 85, 253, 0.05)',
  bgPrimary10: 'rgba(145, 85, 253, 0.10)',

  highlightMain: 'rgb(255, 76, 81)',
  highlightDark: 'rgb(224, 67, 71)',

  caseRedPrimary: '#F02EA5',
};

// eslint-disable-next-line no-undef
module.exports = {
  ...paletteBase,

  textPrimary: paletteBase.gray800,
  textSecondary: paletteBase.gray600,
  textDisabled: paletteBase.gray500,
  textHighlight: paletteBase.successMain,

  textPrimary1: paletteBase.white,
  textSecondary1: paletteBase.gray300,
  textDisabled1: paletteBase.gray500,

  link: paletteBase.primaryMain,

  borderLight: paletteBase.gray200,
  borderDark: paletteBase.primary25,
};
