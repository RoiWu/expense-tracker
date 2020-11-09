const express = require('express')
const router = express.Router()

const Record = require('../../models/Record')
//const Category = require('../../models/Category') // 載入 todo model
const categories = require('../../models/category.json').categories
const months = require('../../models/months.json').months

//READ 瀏覽所有餐廳
router.get('/', (req, res) => {
  const userId = req.user._id
  Record.find({ userId }) // 取出 Todo model 裡的所有資料
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .sort({ _id: 'asc' })
    .then(todolists => {
      let sum = 0
      for (let todo of todolists) {
        sum += todo.amount
      }
      res.render('index', { sum, todolists, categories, months })
    }) // 將資料傳給 index 樣板
    .catch(error => console.error(error)) // 錯誤處理
})

module.exports = router

