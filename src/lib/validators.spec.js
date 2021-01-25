import validators from './validators.js'

describe('validators', () => {
  describe('hasWhiteSpace()', () => {
    it('should pass', () => {
      expect(validators.hasWhiteSpace('')).toBe(false)
      expect(validators.hasWhiteSpace('aa')).toBe(false)
      expect(validators.hasWhiteSpace(' ')).toBe(true)
      expect(validators.hasWhiteSpace(' aa')).toBe(true)
      expect(validators.hasWhiteSpace('aa ')).toBe(true)
      expect(validators.hasWhiteSpace(' aa ')).toBe(true)
      expect(validators.hasWhiteSpace('          aa')).toBe(true)
      expect(validators.hasWhiteSpace('aa      ')).toBe(true)
    })
  })

  describe('isStringWithoutWhitespace()', () => {
    it('should pass', () => {
      expect(validators.isStringWithoutWhitespace('aa', 2, 2)).toBe(true)
      expect(validators.isStringWithoutWhitespace('aa', 2)).toBe(true)
      expect(validators.isStringWithoutWhitespace('aaa', 2)).toBe(true)
      expect(validators.isStringWithoutWhitespace('aaa', 2, 3)).toBe(true)
      expect(validators.isStringWithoutWhitespace(' a', 2, 2)).toBe(false)
      expect(validators.isStringWithoutWhitespace('a ', 2, 2)).toBe(false)
      expect(validators.isStringWithoutWhitespace('a', 2)).toBe(false)
      expect(validators.isStringWithoutWhitespace('aa', 3)).toBe(false)
      expect(validators.isStringWithoutWhitespace('aaa', 1, 2)).toBe(false)
    })
  })

  describe('isValidUsername()', () => {
    it('should validate username', () => {
      expect(validators.isValidUsername('')).toBe(false)
      expect(validators.isValidUsername('1')).toBe(false)
      expect(validators.isValidUsername('12')).toBe(true)
      expect(validators.isValidUsername('12345678901')).toBe(true)
      expect(validators.isValidUsername('123456789010')).toBe(false)
    })
  })
})
