import _ from 'lodash'

/**
 * @param {Array.Number} - array of number
 * @param {Number} goal - find the closest value to this one
 * @returns {Number}
 */
function findClosest(array, goal) {
  if (array.length === 0) {
    return
  }
  let result = array[0]
  if (array.length > 1) {
    for (let i = 1; i < array.length; i++) {
      if (Math.abs(array[i] - goal) < Math.abs(result - goal)) {
        result = array[i]
      }
    }
  }
  return result
}

/**
 * @param {Array.Object} - array of objects
 * @param {Number} goal - find the closest value to this one
 * @param {String} prop - key mapping the prop value we want to check
 * @returns {Number}
 */
function findClosestProp(array, goal, prop) {
  if (array.length === 0) {
    return
  }
  let result = array[0]
  if (array.length > 1) {
    for (let i = 1; i < array.length; i++) {
      if (Math.abs(array[i][prop] - goal) < Math.abs(result[prop] - goal)) {
        result = array[i]
      }
    }
  }
  return result
}

/**
 * Create an array from an object (map) properties
 * {a: 'a', b: 'b'} => ['a', 'b']
 * @param {*} obj
 * @returns array
 */
function mapToArray(obj) {
  return _.flatMap(obj, (item) => item)
}

/**
 * @param {Array} collection
 * @param {String} property
 */
function findMinMaxBy(collection, property) {
  if (_.size(collection) < 1) {
    return
  }
  return _.reduce(
    collection,
    (acc, item) => {
      const itemValue = item[property]
      if (itemValue < acc[0]) {
        acc[0] = itemValue
      }
      if (itemValue > acc[1]) {
        acc[1] = itemValue
      }
      return acc
    },
    [collection[0][property], collection[0][property]]
  )
}

/**
 * Order a collection of objects by a property expected to be number
 * -Infinity is used as fallback if the property is undefined
 * @param {Array[]} collection
 * @param {String} sortBy
 * @param {String} sortOrder - asc | desc
 */
function orderByNumber(collection, sortBy, sortOrder) {
  return _.orderBy(
    collection,
    [(item) => (_.isNumber(item[sortBy]) ? item[sortBy] : -Infinity)],
    [sortOrder]
  )
}

/**
 * Extract distinct props from an array of objects
 * @param {Array<Object>} array
 * @param {String} prop
 * @param {Number} max
 */
function distinctByProp(array, prop, max = Infinity) {
  let i = 0
  let j = 0
  const result = []
  const distinctProps = []
  while (i < max && j < array.length) {
    if (!_.includes(distinctProps, array[j][prop])) {
      result.push(array[j])
      distinctProps.push(array[j][prop])
      i++
    }
    j++
  }
  return result
}

/**
 * Extract distinct props from an array of objects
 * @param {Array<Object>} array
 * @param {String} prop
 * @param {Number} max
 */
function distinctByPropRight(array, prop, max = Infinity) {
  let i = max
  let j = array.length - 1
  const result = []
  const distinctProps = []
  while (i > 0 && j > 0) {
    if (!_.includes(distinctProps, array[j][prop])) {
      result.push(array[j])
      distinctProps.push(array[j][prop])
      i--
    }
    j--
  }
  return result
}

/**
 *
 * @param {Array<Function>} filterFunctions
 * @returns {Boolean}
 */
function composeFilters(filterFunctions) {
  return function (item) {
    for (let i = 0; i < filterFunctions.length; i++) {
      if (!filterFunctions[i](item)) {
        return false
      }
    }
    return true
  }
}

export default {
  composeFilters,
  distinctByProp,
  distinctByPropRight,
  findClosest,
  findClosestProp,
  findMinMaxBy,
  mapToArray,
  orderByNumber,
}
