const express = require('express')
const router = express.Router()

const Record = require('../../models/Record')

//READ 瀏覽所有餐廳
router.get('/', (req, res) => {
  Record.find() // 取出 Todo model 裡的所有資料
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .then(todolists => res.render('index', { todolists })) // 將資料傳給 index 樣板
    .catch(error => console.error(error)) // 錯誤處理
})

module.exports = router

