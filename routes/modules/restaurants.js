const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurants')

//CREATE 新增餐廳
router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/', (req, res) => {
  const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body
  Restaurant.find()
    .sort("-id")
    .limit(1)
    .exec((error,data) => {
      const id = Number(data[0].id)+1
      return Restaurant.create({ id, name, name_en, category, image, location, phone, google_map, rating, description })
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
    })
})

//READ 瀏覽單一餐廳資訊
router.get('/:id', (req, res) => {
  const cssfile = "show"
  const id = Number(req.params.id)
  Restaurant.findOne({ id: id }) // 取出 Todo model 裡的所有資料
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .then(restaurant => res.render('show', { cssfile, restaurant })) // 將資料傳給 index 樣板
    .catch(error => console.error(error)) // 錯誤處理
})

//UPDATE 編輯餐廳資訊
router.get('/:id/edit', (req, res) => {
  const id = Number(req.params.id)
  Restaurant.findOne({ id: id }) // 取出 Todo model 裡的所有資料
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .then(restaurant => res.render('edit', { restaurant })) // 將資料傳給 index 樣板
    .catch(error => console.error(error)) // 錯誤處理
})

router.put('/:id/', (req, res) => {
  const id = req.params.id
  return Restaurant.findOne({ id: id })
    .then(restaurant => {
      restaurant = Object.assign(restaurant, req.body)
      return restaurant.save()  // save 是 mongoose 提供的方法
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

//DELETE 刪除餐廳
router.delete('/:id/', (req, res) => {
  const id = req.params.id
  return Restaurant.findOne({ id: id })
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router