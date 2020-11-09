const express = require('express')
const router = express.Router()

const Record = require('../../models/Record')

router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/', (req, res) => {
  const userId = req.user._id
  const { name, date, category, merchant, amount } = req.body
  Record.create({ name, date, category, merchant, amount, userId })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//UPDATE 編輯餐廳資訊
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  Record.findById(id) // 取出 Todo model 裡的所有資料
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .then(todo => res.render('edit', { todo })) // 將資料傳給 index 樣板
    .catch(error => console.error(error)) // 錯誤處理
})

router.put('/:id/', (req, res) => {
  const id = req.params.id
  const userId = req.user._id
  return Record.findById(id) // 取出 Todo model 裡的所有資料
    .then(todo => {
      todo = Object.assign(todo, req.body)
      return todo.save()  // save 是 mongoose 提供的方法
    })
    .then(() => res.redirect("/"))
    .catch(error => console.log(error))
})

//DELETE 刪除餐廳
router.delete('/:id/', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then(todo => todo.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router

