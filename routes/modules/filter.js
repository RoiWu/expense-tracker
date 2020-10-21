const express = require('express')
const router = express.Router()

const Record = require('../../models/Record')
const Category = require('../../models/Category') // 載入 todo model

router.get('/:category', (req, res) => {
  const { category } = req.params
  console.log("category=", category)
  if (category === "all") {
    res.redirect("/")
  } else {
    Record.find({ category: category })
      .lean()
      .then(todolists => {
        let sum = 0
        for (let todo of todolists) {
          sum += todo.amount
        }

        Category.find().lean()
        .then(categories => res.render('index', { sum, todolists, category, categories}))
        .catch(error => console.error(error)) // 錯誤處理

      }) // 將資料傳給 index 樣板
      .catch(error => console.error(error)) // 錯誤處理
    console.log(req.params)
  }

})

module.exports = router