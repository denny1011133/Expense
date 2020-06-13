const Record = require('../record')
const User = require('../user')
const db = require('../../config/mongoose')
const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const SEED_USER = {
  name: 'Jack',
  email: 'Jack@example.com',
  password: '123456'
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
      return Record.create({
        name: "午餐",
        merchant: "麥當勞",
        category: '<i class="fas fa-utensils"></i>',
        date: "2019-04-23",
        amount: 60,
        userId
      }, {
        name: "晚餐",
        merchant: "鼎王",
        category: '<i class="fas fa-utensils"></i>',
        date: "2019-04-23",
        amount: 60,
        userId
      }, {
        name: "捷運",
        merchant: "台北捷運",
        category: '<i class="fas fa-shuttle-van"></i>',
        date: "2019-04-23",
        amount: 120,
        userId
      }, {
        name: "電影: 驚奇隊長",
        merchant: "京華影城",
        category: '<i class="fas fa-grin-beam"></i>',
        date: "2019-04-23",
        amount: 220,
        userId
      }, {
        name: "租金",
        merchant: "死房東",
        category: '<i class="fas fa-home"></i>',
        date: "2019-04-01",
        amount: 25000,
        userId
      })
    })
    .then(() => {
      console.log('done.')
      process.exit()
    })

  console.log('recordSeeder.js is OK!')
})