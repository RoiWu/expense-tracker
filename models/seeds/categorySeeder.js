
const db = require('../../config/mongoose')

const categories = require('../category.json')
const Category = require('../Category') // 載入 todo model

db.once('open', () => {
    Category.create(Object.assign(categories.categories, categories))
    .then(() => {
      console.log('done.')
      db.close()
    })
})
