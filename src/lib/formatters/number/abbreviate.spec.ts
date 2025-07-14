import {describe, expect, it} from 'vitest'
import {abbreviate, formatAbbreviated} from './abbreviate'

describe('formatAbbreviated', () => {
  it('formats numbers without suffix', () => {
    expect(formatAbbreviated('123.456')).toBe('123')
    expect(formatAbbreviated('1.23456')).toBe('1.23')
    expect(formatAbbreviated('0.123456')).toBe('0.123')
  })

  it('adds suffix when provided', () => {
    expect(formatAbbreviated('123.456', 'K')).toBe('123K')
    expect(formatAbbreviated('1.23456', 'M')).toBe('1.23M')
    expect(formatAbbreviated('0.123456', 'B')).toBe('0.123B')
  })

  it('adds plus sign for positive numbers when withSign is true', () => {
    expect(formatAbbreviated('123.456', '', true)).toBe('+123')
    expect(formatAbbreviated('-123.456', '', true)).toBe('-123')
    expect(formatAbbreviated('0', '', true)).toBe('0')
  })
})

describe('abbreviate', () => {
  it('handles invalid inputs', () => {
    expect(abbreviate('invalid')).toBe('-')
    expect(abbreviate(NaN)).toBe('-')
  })

  it('handles zero and very small numbers', () => {
    expect(abbreviate(0)).toBe('0')
    expect(abbreviate('0.0000001', 5)).toBe('0')
  })

  it('formats numbers less than 1000', () => {
    expect(abbreviate(123)).toBe('123')
    expect(abbreviate(12.345)).toBe('12.3')
    expect(abbreviate(-123.45)).toBe('-123')
  })

  it('formats numbers in thousands (K)', () => {
    expect(abbreviate(1234)).toBe('1.23K')
    expect(abbreviate(12345)).toBe('12.3K')
    expect(abbreviate(123456)).toBe('123K')
  })

  it('formats numbers in millions (M)', () => {
    expect(abbreviate(1234567)).toBe('1.23M')
    expect(abbreviate(12345678)).toBe('12.3M')
    expect(abbreviate(123456789)).toBe('123M')
  })

  it('formats numbers in billions (B)', () => {
    expect(abbreviate(1234567890)).toBe('1.23B')
    expect(abbreviate(12345678901)).toBe('12.3B')
    expect(abbreviate(123456789012)).toBe('123B')
  })

  it('handles negative numbers', () => {
    expect(abbreviate(-1234)).toBe('-1.23K')
    expect(abbreviate(-1234567)).toBe('-1.23M')
    expect(abbreviate(-1234567890)).toBe('-1.23B')
  })

  it('handles string inputs', () => {
    expect(abbreviate('1234')).toBe('1.23K')
    expect(abbreviate('1234567')).toBe('1.23M')
    expect(abbreviate('1234567890')).toBe('1.23B')
  })

  it('handles BigNumber inputs', () => {
    expect(abbreviate('1234')).toBe('1.23K')
    expect(abbreviate('1234567')).toBe('1.23M')
    expect(abbreviate('1234567890')).toBe('1.23B')
  })

  it('adds plus sign for positive numbers when withSign is true', () => {
    expect(abbreviate(1234, 5, true)).toBe('+1.23K')
    expect(abbreviate(-1234, 5, true)).toBe('-1.23K')
    expect(abbreviate(0, 5, true)).toBe('0')
  })

  it('respects maxDecimals parameter', () => {
    expect(abbreviate(0.0001, 3)).toBe('0')
    expect(abbreviate(0.0001, 4)).toBe('0.0001')
  })
})
