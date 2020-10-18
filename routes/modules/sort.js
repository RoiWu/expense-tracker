const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurants')

router.get('/:sorting/:name', (req, res) => {
  const cssfile = "index"
  const { sorting, name } = req.params
  Restaurant.find()
    .lean()
    .sort({ [sorting]: name })
    .then(restaurants => res.render('index', { cssfile, restaurants }))
    .catch(error => console.log(error))
  console.log(req.params)
})

module.exports = router