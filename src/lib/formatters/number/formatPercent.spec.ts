import {describe, expect, it} from 'vitest'

import {formatPercent} from './formatPercent'

describe('formatPercent', () => {
  it('should return "-" for non-numeric input', () => {
    expect(formatPercent('abc')).toBe('-')
  })

  it('should return "0" for numbers very close to zero', () => {
    expect(formatPercent(0.0001)).toBe('0')
    expect(formatPercent(-0.0005)).toBe('0')
    expect(formatPercent('0.000999')).toBe('0')
  })

  it('should format numbers with 1 significant digit for |n| < 0.1', () => {
    expect(formatPercent(0.001)).toBe('0.001')
    expect(formatPercent(0.0123)).toBe('0.01')
    expect(formatPercent(0.0987)).toBe('0.1')
    expect(formatPercent(-0.056)).toBe('-0.06')
  })

  it('should format numbers with 3 significant digits for |n| < 100', () => {
    expect(formatPercent(0.1)).toBe('0.100')
    expect(formatPercent(1.2345)).toBe('1.23')
    expect(formatPercent(12.345)).toBe('12.3')
    expect(formatPercent(99.99)).toBe('100')
    expect(formatPercent(-54.321)).toBe('-54.3')
  })

  it('should format numbers as integers for |n| >= 100', () => {
    expect(formatPercent(100)).toBe('100')
    expect(formatPercent(123.45)).toBe('123')
    expect(formatPercent(-250.8)).toBe('-250')
  })

  it('should handle the withSign option', () => {
    expect(formatPercent(50, true)).toBe('+50.0')
    expect(formatPercent(0.05, true)).toBe('+0.05')
    expect(formatPercent(-25, true)).toBe('-25.0')
    expect(formatPercent(0, true)).toBe('0')
  })

  it('should handle string number inputs', () => {
    expect(formatPercent('12.345')).toBe('12.3')
    expect(formatPercent('-0.056')).toBe('-0.06')
    expect(formatPercent('150.7', true)).toBe('+150')
  })
})
