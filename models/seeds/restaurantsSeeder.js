/*
const db = require('../../config/mongoose')

const restaurantList = require('../../restaurant.json')
const Restaurant = require('../restaurants') // 載入 todo model

db.once('open', () => {
  Restaurant.create(Object.assign(restaurantList.results, restaurantList))
    .then(() => {
      console.log('done.')
      db.close()
    })
})*/
