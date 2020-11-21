const express = require('express')
const router = express.Router()

const Record = require('../../models/Record')
const categories = require('../../models/category.json').categories
const months = require('../../models/months.json').months
// 載入 todo model

router.post('/', (req, res) => {
  const userId = req.user._id
  const { month, category } = req.body
  if (category === "all") {
    Record.find({ userId })
      .lean()
      .sort({ _id: 'asc' })
      .then(todolists => {
        let sum = 0
        let todolistFilter
        if (month === "all") {
          todolistFilter = todolists
          for (let todo of todolists) {
            sum += todo.amount
          }
        } else {
          todolistFilter = []
          const chooseMonth = months.find(monthInfo => monthInfo.name === month);
          for (let todo of todolists) {
            if (chooseMonth.number === new Date(todo.date).getMonth() + 1) {
              sum += todo.amount
              todolistFilter.push(todo)
            }
          }
        }
        res.render('index', { sum, todolists: todolistFilter, category, month, categories, months })
      }) // 將資料傳給 index 樣板
      .catch(error => console.error(error)) // 錯誤處理
  } else {
    Record.find({ userId, category })
      .lean()
      .sort({ _id: 'asc' })
      .then(todolists => {
        let sum = 0
        let todolistFilter
        if (month === "all") {
          todolistFilter = todolists
          for (let todo of todolists) {
            sum += todo.amount
          }
        } else {
          todolistFilter = []
          const chooseMonth = months.find(monthInfo => monthInfo.name === month);
          for (let todo of todolists) {
            if (chooseMonth.number === new Date(todo.date).getMonth() + 1) {
              sum += todo.amount
              todolistFilter.push(todo)
            }
          }
        }
        res.render('index', { sum, todolists: todolistFilter, category, month, categories, months })
      }) // 將資料傳給 index 樣板
      .catch(error => console.error(error)) // 錯誤處理
  }
})

module.exports = router