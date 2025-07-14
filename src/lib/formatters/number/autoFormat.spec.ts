import {describe, expect, it} from 'vitest'
import {autoFormat} from './autoFormat'

describe('autoFormat', () => {
  it('should return "-" for null input', () => {
    expect(autoFormat(null)).toBe('-')
  })

  it('should return "-" for NaN input', () => {
    expect(autoFormat(NaN)).toBe('-')
    expect(autoFormat('not a number')).toBe('-')
  })

  it('should return "0" for 0', () => {
    expect(autoFormat(0)).toBe('0')
    expect(autoFormat('0')).toBe('0')
  })

  it('should format numbers less than 1 with 3 significant digits', () => {
    expect(autoFormat(0.12345)).toBe('0.123')
    expect(autoFormat(-0.005678)).toBe('-0.00568')
    expect(autoFormat('0.9876')).toBe('0.988')
  })

  it('should format numbers between 1 and 100 with 4 significant digits', () => {
    expect(autoFormat(1.2345)).toBe('1.234')
    expect(autoFormat(12.345)).toBe('12.35')
    expect(autoFormat(99.9876)).toBe('99.99')
    expect(autoFormat('-50.54321')).toBe('-50.54')
  })

  it('should format large numbers by truncating and adding separators', () => {
    expect(autoFormat(12345)).toBe('12,345')
    expect(autoFormat(12345.67)).toBe('12,345')
    expect(autoFormat('9876543.21')).toBe('9,876,543')
  })

  it('should handle the noSeparator option', () => {
    expect(autoFormat(1234567, undefined, {noSeparator: true})).toBe('1234567')
  })

  it('should handle the sign option for positive numbers', () => {
    expect(autoFormat(123, undefined, {sign: true})).toBe('+123')
    expect(autoFormat(0.123, undefined, {sign: true})).toBe('+0.123')
    expect(autoFormat(-50, undefined, {sign: true})).toBe('-50')
  })

  it('should handle small numbers that round to 0 based on maxDecimals', () => {
    expect(autoFormat(0.00001, 4)).toBe('0')
  })

  it('should handle exponential format for very small numbers', () => {
    expect(autoFormat(0.00000123, 5, {exponential: true})).toBe('1.2e-6')
  })

  it('should remove trailing zeros and unnecessary decimal points', () => {
    expect(autoFormat(12.34)).toBe('12.34')
    expect(autoFormat(123.0)).toBe('123')
  })

  it('should handle string with commas', () => {
    expect(autoFormat('1,234.56')).toBe('1,234')
  })
})
