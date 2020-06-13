const express = require('express')
const router = express.Router()
const Record = require('../../models/record')

//首頁
router.get('/', (req, res) => {
  const userId = req.user._id
  let totalAmount = 0
  Record.find({ userId })
    .lean()
    .then(records => {
      records.forEach(record => totalAmount += record.amount)
      res.render('index', { records, totalAmount })
    })
    .catch(error => console.error(error))
})
//首頁過濾月份
router.post('/month', (req, res) => {
  const userId = req.user._id
  let totalAmount = 0
  const categoryInChinese = {
    '<i class="fas fa-home"></i>': "家居物業",
    '<i class="fas fa-shuttle-van"></i>': "交通出行",
    '<i class="fas fa-grin-beam"></i>': "休閒娛樂",
    '<i class="fas fa-utensils"></i>': "餐飲食品",
    '<i class="fas fa-pen"></i>': "其他"
  }
  const categorySelected = req.body.categorySelect
  const monthSelected = req.body.month
  if (monthSelected) {
    Record.find({ userId })
      .lean()
      .then(records => {
        return records.filter(record => record.date.includes(monthSelected)
        )
      })
      .then(records => {
        records.forEach(record => {
          totalAmount += record.amount
        })
        return res.render('index', { records, monthSelected, totalAmount })
      })
      .catch(error => console.error(error))
  }
})

//首頁過濾類型
router.post('/category', (req, res) => {
  const userId = req.user._id
  let totalAmount = 0
  const categoryInChinese = {
    '<i class="fas fa-home"></i>': "家居物業",
    '<i class="fas fa-shuttle-van"></i>': "交通出行",
    '<i class="fas fa-grin-beam"></i>': "休閒娛樂",
    '<i class="fas fa-utensils"></i>': "餐飲食品",
    '<i class="fas fa-pen"></i>': "其他"
  }
  const categorySelected = req.body.categorySelect

  if (categorySelected !== "ALL") {
    Record.find({ category: categorySelected, userId })
      .lean()
      .then(records => {
        const categoryInChineseSelected = categoryInChinese[categorySelected]
        records.forEach(record => {
          totalAmount += record.amount
        })
        res.render('index', { records, totalAmount, categoryInChineseSelected })
      })
      .catch(error => console.error(error))
  } else Record.find()
    .lean()
    .then(records => {
      const categoryInChineseSelected = "所有支出"
      records.forEach(record => totalAmount += record.amount)
      res.render('index', { records, totalAmount, categoryInChineseSelected })
    })
    .catch(error => console.error(error))
})

module.exports = router


