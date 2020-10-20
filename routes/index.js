const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const detail = require('./modules/detail')
const filter = require('./modules/filter')

router.use('/', home)
router.use('/detail', detail)
router.use('/filter', filter)

module.exports = router