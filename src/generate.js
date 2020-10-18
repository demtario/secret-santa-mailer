const shuffle = require('lodash/shuffle')

const USERS = require('../users.json')
const CATEGORIES = require('../categories.json')

module.exports.generate = () => {
  const from = shuffle(USERS)
  let to = shuffle(USERS)
  while (from.some(({ name }, i) => to[i].name === name)) {
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
