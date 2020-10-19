
const db = require('../../config/mongoose')

const todolist = require('../testTodolists.json')
const Record = require('../Record') // 載入 todo model

db.once('open', () => {
  Record.create(Object.assign(todolist.records, todolist))
    .then(() => {
      console.log('done.')
      db.close()
    })
})
