import { pxToRem } from '../utils/utils'

export const theme = {
  font: {
    weight: {
      bold: '700',
      semibold: '600',
      medium: '500',
      regular: '400',
      light: '200',
    },
  },
  color: {
    darkOpa: 'rgba(0, 0, 0, 0.35)',
    blue: '#1D5486',
    lightBlue: '#3675AE',
    darkBlue: '#1A4B78',
    red: '#CF0707',
    white: '#ffffff',
    dark: 'rgba(56, 56, 56, 1)',
    black: '#000000',
    medium: '#646464',
    gray: '#D0D0D0',
    gray2: '#c4c4c4',
    light: '#D0D0D0',
    superLightGray: '#EFEFEF',
    lighter: '#E4E4E4',
    highlight: '#E9B09B',
    orange: '#E9B09B',
    lightOrange: '#e8c6b9',
    lighterOrange: '#F4D7CC',
  },
  radius: {
    super: '2rem',
    small: '0.25rem',
  },
  boxShadow: {
    default: '0 1.5rem 3.125rem rgba(0, 0, 0, 0.1)',
  },
  textShadow: {},
  breakpoint: {
    tabletV: pxToRem(640),
    tabletH: pxToRem(960),
    laptop: pxToRem(1280),
    desktop: pxToRem(1600),
  },
}
