const mongoose = require('mongoose')
const Record = require('../record')
mongoose.connect('mongodb://localhost/Expense', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  Record.create({
    name: "午餐",
    category: "food",
    date: "2019/04/23",
    amount: 60,
  }, {
    name: "晚餐",
    category: "food",
    date: "2019/04/23",
    amount: 60,
  }, {
    name: "捷運",
    category: "traffic",
    date: "2019/04/23",
    amount: 120,
  }, {
    name: "電影: 驚奇隊長",
    category: "entertainment",
    date: "2019/04/23",
    amount: 220,
  }, {
    name: "租金",
    category: "rent",
    date: "2019/04/01",
    amount: 25000,
  })
  console.log('recordSeeder.js is OK!')
})