import {describe, expect, it} from 'vitest'
import {shorten} from './shorten'

const mockAddress = '0x3e486F1e4d411F68e3dd5f2FFcA3C9EF60A78cB2'

describe('hash formatters', () => {
  describe('shorten()', () => {
    it('should shorten using 6 chars at the beginning and 4 at the end by default', () => {
      expect(shorten(mockAddress)).toBe('0x3e48…8cB2')
    })

    it('should shorten using the beginning and end chars parameter', () => {
      expect(shorten(mockAddress, 5, 5)).toBe('0x3e4…78cB2')
    })

    it('should shorten the empty string properly', () => {
      expect(shorten('')).toBe('')
      expect(shorten('', 5, 5)).toBe('')
    })

    it('should handle strings shorter than the char count parameters', () => {
      expect(shorten('0x3e486F1', 10, 10)).toBe('0x3e486F1')
      expect(shorten('0x3e486F1e4d411F68e', 10, 10)).toBe('0x3e486F1e')
    })
  })
})
