const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurants')

router.get('/', (req, res) => {
  const cssfile = "index"
  const keyword = req.query.keyword

  Restaurant.find() // 取出 Todo model 裡的所有資料
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .then(restaurantList => {
      const restaurants = restaurantList.filter(restaurant => {
        return restaurant.name.toLowerCase().includes(keyword.toLowerCase())
      })
      res.render('index', { cssfile, restaurants, keyword })
    }) // 將資料傳給 index 樣板
    .catch(error => console.error(error)) // 錯誤處理
})

module.exports = router