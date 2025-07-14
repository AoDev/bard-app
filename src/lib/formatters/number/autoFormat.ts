/**
 * "Smart" format. Tries to use the best number of decimals depending on the number.
 * Optionally can show a '+' sign in front of positive numbers and format number with separators.
 * NOTE: use it ONLY TO DISPLAY values, NOT FOR INPUTS
 */
export function autoFormat(
  numbr: string | number | null | undefined,
  maxDecimals?: number,
  opts?: {sign?: boolean; noSeparator?: boolean; exponential?: boolean}
) {
  if (numbr === null || numbr === undefined) {
    return '-'
  }

  const num = typeof numbr === 'string' ? Number(numbr.replace(/,/g, '')) : numbr

  if (Number.isNaN(num)) {
    return '-'
  }

  if (num === 0) {
    return '0'
  }

  if (maxDecimals && Math.abs(num) < 10 ** -maxDecimals) {
    if (opts?.exponential) {
      return num.toExponential(1)
    }
    return '0'
  }

  let result: string

  if (Math.abs(num) < 1) {
    result = Number(num.toPrecision(3)).toString()
  } else if (Math.abs(num) < 100) {
    result = Number(num.toPrecision(4)).toString()
  } else {
    const truncated = Math.trunc(num)
    if (opts?.noSeparator) {
      result = truncated.toString()
    } else {
      result = truncated.toLocaleString('en-US')
    }
  }

  if (result.includes('.') && !result.includes('e')) {
    result = result.replace(/0+$/, '')
    if (result.endsWith('.')) {
      result = result.slice(0, -1)
    }
  }

  if (opts?.sign && num > 0) {
    return `+${result}`
  }

  return result
}
