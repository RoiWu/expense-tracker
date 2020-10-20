const express = require('express')
const router = express.Router()

const Record = require('../../models/Record')

router.get('/:name', (req, res) => {
  const { name } = req.params
  console.log("name=",name)
  if (name === "all") {
    res.redirect("/")
  } else {
    Record.find({ name: {$eq:`${name}`} })
      .lean()
      .then(todolists => {
        console.log("result=",todolists)
        let sum = 0
        for (let todo of todolists) {
          sum += todo.amount
        }
        const category = name
        res.render('index', { sum, todolists, category })
      }) // 將資料傳給 index 樣板
      .catch(error => console.error(error)) // 錯誤處理
    console.log(req.params)    
  }

})

module.exports = router