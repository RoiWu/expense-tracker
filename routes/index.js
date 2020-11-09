const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const detail = require('./modules/detail')
const filter = require('./modules/filter')
const users = require('./modules/users')
const auth = require('./modules/auth')

const { authenticator } = require('../middleware/auth')

router.use('/detail', authenticator, detail)
router.use('/filter', authenticator, filter)
router.use('/users', users)
router.use('/auth', auth)
router.use('/', authenticator, home)

module.exports = router