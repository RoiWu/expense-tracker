const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const detail = require('./modules/detail')
// const search = require('./modules/search')
// const sort = require('./modules/sort')

router.use('/', home)
router.use('/detail', detail)
// router.use('/search', search)
// router.use('/sort', sort)

module.exports = router