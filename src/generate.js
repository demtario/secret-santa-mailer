const shuffle = require('lodash/shuffle')

const USERS = require('../users.json')
const CATEGORIES = require('../categories.json')
const BANNED = require('../banned.json') || []
const { hasArraySameElements } = require('./utils')

const isPairInvalid = (from, to) => {
  const isSelfGift = from.some(({ name }, i) => to[i].name === name)
  const isAnyBannedPair = from
    .map(({ name }, i) => [name, to[i].name])
    .some((pair) => BANNED.some((p) => hasArraySameElements(pair, p)))

  return isSelfGift || isAnyBannedPair
}

module.exports.generate = () => {
  const from = shuffle(USERS)
  let to = shuffle(USERS)

  while (isPairInvalid(from, to)) {
    to = shuffle(USERS)
  }

  return from.map((v, i) => {
    const shuffledCategories = shuffle(CATEGORIES)

    return {
      from: v,
      to: to[i],
      category: shuffledCategories[0],
      alternativeCategory: shuffledCategories[1],
    }
  })
}
