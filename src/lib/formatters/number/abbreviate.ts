export function formatAbbreviated(numbr: number | string, suffix = '', withSign = false) {
  const num = Number(numbr)
  const result = `${Number(num.toPrecision(3)).toString()}${suffix}`
  return withSign && num > 0 ? `+${result}` : result
}

/**
 * Format and round a number so that it is limited to 4 digits in all cases, adding T, B, M, K
 * for Trillion, Billion, Million, and Thousand respectively.
 * 130000 -> 130K | 1300000 -> 1.3M
 */
export function abbreviate(
  numbr: string | number | null | undefined,
  maxDecimals = 5,
  withSign = false
): string {
  if (numbr === null || numbr === undefined) {
    return '-'
  }
  const num = typeof numbr === 'string' ? Number(numbr.replace(/,/g, '')) : numbr
  const absNum = Math.abs(num)
  if (Number.isNaN(num)) {
    return '-'
  }
  if (num === 0) {
    return '0'
  }
  if (maxDecimals && Math.abs(num) < 10 ** -maxDecimals) {
    return '0'
  }
  if (absNum < 1000) {
    return formatAbbreviated(num, '', withSign)
  }
  if (absNum < 10 ** 6) {
    return formatAbbreviated(num / 1000, 'K', withSign)
  }
  if (absNum < 10 ** 9) {
    return formatAbbreviated(num / 10 ** 6, 'M', withSign)
  }
  return formatAbbreviated(num / 10 ** 9, 'B', withSign)
}
