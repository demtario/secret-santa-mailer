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
    const cat1 = CATEGORIES[Math.round(Math.random() * (CATEGORIES.length - 1))]
    let cat2 = cat1
    while (cat1 === cat2) {
      cat2 = CATEGORIES[Math.round(Math.random() * (CATEGORIES.length - 1))]
    }

    return {
      from: v,
      to: to[i],
      category: cat1,
      alternativeCategory: cat2,
    }
  })
}
