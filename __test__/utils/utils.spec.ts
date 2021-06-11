import { pxToRem } from '../../utils/utils'

describe('utils', () => {
  describe('pxToRem', () => {
    it('16', () => {
      expect(pxToRem(16)).toBe('1rem')
    })

    it('32', () => {
      expect(pxToRem(32)).toBe('2rem')
    })

    it('28', () => {
      expect(pxToRem(28)).toBe('1.75rem')
    })

    it('multi', () => {
      expect(pxToRem(20, 16, 16)).toBe('1.25rem 1rem 1rem')
    })

    it('0', () => {
      expect(pxToRem(0, 16, 16)).toBe('0 1rem 1rem')
    })

    it('-16', () => {
      expect(pxToRem(-16)).toBe('-1rem')
    })
  })
})
