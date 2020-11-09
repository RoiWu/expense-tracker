
const todolist = require('../testTodolists.json')
const Record = require('../Record') // 載入 todo model

const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const User = require('../user')
const db = require('../../config/mongoose')
const SEED_USER = {
  name: 'root',
  email: 'root@example.com',
  password: '12345678'
}
db.once('open', () => {
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER.password, salt))
    .then(hash => User.create({
      name: SEED_USER.name,
      email: SEED_USER.email,
      password: hash
    }))
    .then(user => {
      const userId = user._id
      return Promise.all(Array.from(
        { length: todolist.records.length },
        (_, i) => {
          const { name, category, date, amount } = todolist.records[i]
          return Record.create({ name, category, date, amount, userId })
        }
      ))
    })
    .then(() => {
      console.log('done.')
      process.exit()
    })
})
