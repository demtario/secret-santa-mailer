const isEqual = require('lodash/isEqual')

const hasArraySameElements = (arr1, arr2, sortFn) => isEqual(arr1.sort(sortFn), arr2.sort(sortFn))

module.exports.hasArraySameElements = hasArraySameElements
