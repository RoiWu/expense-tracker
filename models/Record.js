const mongoose = require('mongoose')
const Schema = mongoose.Schema
const todoListSchema = new Schema({
  name: {
    type: String, // 資料型別是字串
    required: true // 這是個必填欄位
  },
  category: {
    type: String, // 資料型別是字串
    required: true // 這是個必填欄位
  },
  date: {
    type: String, // 資料型別是字串
    required: true // 這是個必填欄位
  },
  merchant: {
    type: String, // 資料型別是字串
    required: false // 這是個必填欄位
  },
  amount: {
    type: Number, // 資料型別是字串
    required: true // 這是個必填欄位
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true
  }
})
module.exports = mongoose.model('Record', todoListSchema)
