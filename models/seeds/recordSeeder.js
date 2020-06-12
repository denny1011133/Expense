const Record = require('../record')
const db = require('../../config/mongoose')

db.once('open', () => {
  Record.create({
    name: "午餐",
    merchant: "麥當勞",
    category: '<i class="fas fa-utensils"></i>',
    date: "2019-04-23",
    amount: 60,
  }, {
    name: "晚餐",
    merchant: "鼎王",
    category: '<i class="fas fa-utensils"></i>',
    date: "2019-04-23",
    amount: 60,
  }, {
    name: "捷運",
    merchant: "台北捷運",
    category: '<i class="fas fa-shuttle-van"></i>',
    date: "2019-04-23",
    amount: 120,
  }, {
    name: "電影: 驚奇隊長",
    merchant: "京華影城",
    category: '<i class="fas fa-grin-beam"></i>',
    date: "2019-04-23",
    amount: 220,
  }, {
    name: "租金",
    merchant: "死房東",
    category: '<i class="fas fa-home"></i>',
    date: "2019-04-01",
    amount: 25000,
  })
  console.log('recordSeeder.js is OK!')
})