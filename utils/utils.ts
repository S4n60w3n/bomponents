export const pxToRem = (...amounts: number[]) =>
  amounts.map((amount) => `${amount / 16}${amount ? 'rem' : ''}`).join(' ')
