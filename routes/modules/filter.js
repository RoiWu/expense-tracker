const express = require('express')
const router = express.Router()

const Record = require('../../models/Record')
const categories = require('../../models/category.json').categories
const months = require('../../models/months.json').months
// 載入 todo model

router.get('/category/:category', (req, res) => {
  const { category } = req.params
  const userId = req.user._id
  if (category === "all") {
    res.redirect("/")
  } else {
    Record.find({ userId, category })
      .lean()
      .sort({ _id: 'asc' })
      .then(todolists => {
        let sum = 0
        for (let todo of todolists) {
          sum += todo.amount
        }
        res.render('index', { sum, todolists, category, categories, months })

      }) // 將資料傳給 index 樣板
      .catch(error => console.error(error)) // 錯誤處理
  }
})

router.get('/month/:month', (req, res) => {
  const { month } = req.params
  const userId = req.user._id
  if (month === "all") {
    res.redirect("/")
  } else {
    Record.find({ userId })
      .lean()
      .sort({ _id: 'asc' })
      .then(todolists => {
        let sum = 0
        let todolistFilter = []
        const chooseMonth = months.find(monthInfo => monthInfo.name === month);
        for (let todo of todolists) {
          if (chooseMonth.number === new Date(todo.date).getMonth() + 1) {
            sum += todo.amount
            todolistFilter.push(todo)
          }
        }
        res.render('index', { sum, todolists: todolistFilter, month, categories, months })

      }) // 將資料傳給 index 樣板
      .catch(error => console.error(error)) // 錯誤處理
  }
})

module.exports = router