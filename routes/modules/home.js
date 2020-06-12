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
  //篩選分類
  if (categorySelected !== "ALL") {
    Record.find({ category: categorySelected })
      .lean()
      .then(records => {
        console.log(records)
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

  // //篩選月份
  // const monthSelected = req.body.month //2019-01
  // console.log(monthSelected)
  // Record.find()
  //   .lean()
  //   .then(records => {
  //     console.log(records)
  //     records.filter(exp => exp.date.includes(monthSelected))
  //   })
  //   .then(exp => res.render('index', { exp }))
  //   .catch(error => console.log(error))
})
module.exports = router