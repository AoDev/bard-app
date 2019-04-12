import _ from 'lodash'

const COMMON_NAME_MIN_LENGTH = 1
const COMMON_NAME_MAX_LENGTH = 128

const PASSWORD_MIN_LENGTH = 6
const PASSWORD_MAX_LENGTH = 120

/**
 * Checks that string has whitespace at the beginning or end
 * @function hasWhiteSpace
 * @param {String} str
 * @return {Boolean} hasWhiteSpace
 */
function hasWhiteSpace (str) {
  return _.startsWith(str, ' ') || _.endsWith(str, ' ')
}

/**
 * Checks that string has the desired length without whitespaces
 * @function isStringWithoutWhitespace
 * @param {String} str
 * @param {Number} [minLength=0]
 * @param {Number} [maxLength=Infinity]
 * @return {Boolean} shouldn't start and end with whitespace
 */
function isStringWithoutWhitespace (str, minLength = 0, maxLength = Infinity) {
  return _.isString(str) && !hasWhiteSpace(str) && _.inRange(str.length, minLength, maxLength)
}

/**
 * Some common name simple validator
 * @function isValidCommonName
 * @param {String} name
 * @return {Boolean} true is valid
 */
function isValidCommonName (name) {
  return isStringWithoutWhitespace(name, COMMON_NAME_MIN_LENGTH, PASSWORD_MAX_LENGTH)
}

/**
 * Validates passwords
 * @function isValidPassword
 * @param {String} password
 * @return {Boolean} true is valid
 */
function isValidPassword (password) {
  return isStringWithoutWhitespace(password, PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH)
}

const assert = {
  isString (arg) {
    if (!_.isString(arg)) {
      throw new TypeError('Expected a string')
    }
  },

  isBoolean (arg) {
    if (!_.isBoolean(arg)) {
      throw new TypeError('Expected a boolean')
    }
  },

  isNumber (arg) {
    if (!_.isNumber(arg)) {
      throw new TypeError('Expected a number')
    }
  },

  isObject (arg) {
    if (!_.isObject(arg)) {
      throw new TypeError('Expected an object')
    }
  },

  isArray (arg) {
    if (!_.isArray(arg)) {
      throw new TypeError('Expected an array')
    }
  },

  isNonEmptyArray (arg) {
    this.isArray(arg)
    if (_.isEmpty(arg)) {
      throw new Error('Expected non empty array')
    }
  }
}

export default {
  COMMON_NAME_MIN_LENGTH,
  COMMON_NAME_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,

  isValidCommonName,
  isValidPassword,
  assert,
}
