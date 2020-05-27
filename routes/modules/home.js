const express = require('express')
const router = express.Router()
const Record = require('../../models/record')

//首頁
router.get('/', (req, res) => {
  let totalAmount = 0
  Record.find()
    .lean()
    .then(records => {
      records.forEach(record => totalAmount += record.amount)
      res.render('index', { records, totalAmount })
    })
    .catch(error => console.error(error))
})
//首頁過濾分類
router.post('/', (req, res) => {
  let totalAmount = 0
  const categoryInChinese = {
    '<i class="fas fa-home"></i>': "家居物業",
    '<i class="fas fa-shuttle-van"></i>': "交通出行",
    '<i class="fas fa-grin-beam"></i>': "休閒娛樂",
    '<i class="fas fa-utensils"></i>': "餐飲食品",
    '<i class="fas fa-pen"></i>': "其他"
  }
  const categorySelected = req.body.categorySelect
  Record.find({ category: categorySelected })
    .lean()
    .then(records => {
      const categoryInChineseSelected = categoryInChinese[categorySelected]
      records.forEach(record => {
        totalAmount += record.amount
      })
      res.render('index', { records, totalAmount, categoryInChineseSelected })
    })
    .catch(error => console.error(error))
})
module.exports = router