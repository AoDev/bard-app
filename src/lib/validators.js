import _ from 'lodash'

const COMMON_NAME_MIN_LENGTH = 1
const COMMON_NAME_MAX_LENGTH = 128

const PASSWORD_MIN_LENGTH = 6
const PASSWORD_MAX_LENGTH = 120

const USERNAME_MIN_LENGTH = 2
const USERNAME_MAX_LENGTH = 11

/**
 * Checks that string has whitespace at the beginning or end
 * @function hasWhiteSpace
 * @param {String} str
 * @return {Boolean} hasWhiteSpace
 */
function hasWhiteSpace(str) {
  return /^\s/.test(str) || /\s$/.test(str)
}

/**
 * Checks that string has the desired length without whitespaces
 * @function isStringWithoutWhitespace
 * @param {String} str
 * @param {Number} [minLength=0]
 * @param {Number} [maxLength=Infinity]
 * @return {Boolean} shouldn't start and end with whitespace
 */
function isStringWithoutWhitespace(str, minLength = 0, maxLength = Infinity) {
  return (
    _.isString(str) && !hasWhiteSpace(str) && str.length >= minLength && str.length <= maxLength
  )
}

/**
 * Some common name simple validator
 * @param {String} name
 * @return {Boolean} true is valid
 */
function isValidCommonName(name) {
  return isStringWithoutWhitespace(name, COMMON_NAME_MIN_LENGTH, PASSWORD_MAX_LENGTH)
}

/**
 * Username validator
 * @param {String} name
 * @return {Boolean} true is valid
 */
function isValidUsername(name) {
  return isStringWithoutWhitespace(name, USERNAME_MIN_LENGTH, USERNAME_MAX_LENGTH)
}

/**
 * Validates passwords
 * @function isValidPassword
 * @param {String} password
 * @return {Boolean} true is valid
 */
function isValidPassword(password) {
  return isStringWithoutWhitespace(password, PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH)
}

/**
 * @param {string} email
 * @returns {boolean}
 */
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

const assert = {
  isString(arg) {
    if (!_.isString(arg)) {
      throw new TypeError('Expected a string')
    }
    return assert
  },

  isNonEmptyString(arg) {
    if (!isStringWithoutWhitespace(arg, 1)) {
      throw new TypeError('Expected a non-empty string')
    }
    return assert
  },

  isBoolean(arg) {
    if (!_.isBoolean(arg)) {
      throw new TypeError('Expected a boolean')
    }
    return assert
  },

  isNumber(arg) {
    if (!_.isNumber(arg)) {
      throw new TypeError('Expected a number')
    }
    return assert
  },

  min(num, minValue) {
    if (num < minValue) {
      throw new Error(num + ' smaller than ' + minValue)
    }
    return assert
  },

  max(num, maxValue) {
    if (num > maxValue) {
      throw new Error(num + ' greater than ' + maxValue)
    }
    return assert
  },

  isObject(arg) {
    if (!_.isObject(arg)) {
      throw new TypeError('Expected an object')
    }
    return assert
  },

  isArray(arg) {
    if (!_.isArray(arg)) {
      throw new TypeError('Expected an array')
    }
    return assert
  },

  isNonEmptyArray(arg) {
    this.isArray(arg)
    if (_.isEmpty(arg)) {
      throw new Error('Expected non empty array')
    }
    return assert
  },

  isFunction(arg) {
    if (!_.isFunction(arg)) {
      throw new Error('Expected a function')
    }
    return assert
  },

  /**
   * @param {*[]} array
   * @param {*} value
   */
  includes(array, value) {
    if (!array.includes(value)) {
      throw new Error(`"${value}" value is not valid`)
    }
    return assert
  },
}

export default {
  COMMON_NAME_MIN_LENGTH,
  COMMON_NAME_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
  USERNAME_MAX_LENGTH,

  assert,
  hasWhiteSpace,
  isStringWithoutWhitespace,
  isValidCommonName,
  isValidEmail,
  isValidPassword,
  isValidUsername,
}
