import _ from 'lodash'

/**
 * Express ratio between two numbers in percentage
 * @param  {Number} num1
 * @param  {Number} num2
 * @param  {Number} precision
 * @return {Number} Between 0 and 100
 */
function percentage (num1, num2, precision) {
  const percentage = (num1 / num2) * 100
  return _.isNumber(precision) ? _.round(percentage, precision) : percentage
}

/**
 * Get ratio between two numbers
 * @param {Number} num1
 * @param {Number} num2
 * @param {Number} precision
 * @return {Number} Between 0 and 1
 */
function ratio (num1, num2, precision) {
  const ratio = num1 / num2
  return _.isNumber(precision) ? _.round(ratio, precision) : ratio
}

/**
 * Return the increase (or decrease) in percentage, between two numbers
 * @param  {Number} num1
 * @param  {Number} num2
 * @param  {Number} precision
 * @return {Number}
 */
function percentageGain (num1, num2, precision) {
  return percentage(num1, num2, precision) - 100
}

export default {
  percentage,
  percentageGain,
  ratio,
}
