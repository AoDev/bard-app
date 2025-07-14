export function formatPercent(numbr: string | number | undefined, withSign = false) {
  const num = Number(numbr)
  if (Number.isNaN(num)) {
    return '-'
  }

  if (Math.abs(num) < 0.001) {
    return '0'
  }

  let resultString: string

  if (Math.abs(num) < 0.1) {
    resultString = num.toPrecision(1)
  } else if (Math.abs(num) < 100) {
    resultString = num.toPrecision(3)
  } else {
    resultString = String(Math.trunc(num))
  }

  if (withSign && num > 0) {
    return `+${resultString}`
  }

  return resultString
}
