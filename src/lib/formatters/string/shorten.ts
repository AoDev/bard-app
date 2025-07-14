/**
 * @example
 * shorten('0x1234567890', 4, 2) // '0x12…90'
 */
export function shorten(str: string, charsAtBeginning = 6, charsAtEnd = 4) {
  if (str === '') {
    return ''
  }
  let shortenedStr = str.substring(0, charsAtBeginning)
  if (charsAtBeginning + charsAtEnd < str.length) {
    shortenedStr = `${shortenedStr}…${str.substring(str.length - charsAtEnd)}`
  }
  return shortenedStr
}
