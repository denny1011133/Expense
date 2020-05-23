const express = require('express')
const router = express.Router()
const Record = require('../../models/record')

//首頁
router.get('/', (req, res) => {
  let totalAmount = 0
  Record.find()
    .lean()
    .then(records => {
      records.forEach(record => { totalAmount += record.amount })
      res.render('index', { records, totalAmount })
    })
    .catch(error => console.error(error))
})
//首頁過濾分類
router.post('/', (req, res) => {
  let totalAmount = 0
  const categorySelected = req.body.categorySelect
  Record.find({ category: categorySelected })
    .lean()
    .then(records => {
      records.forEach(record => {
        totalAmount += record.amount
      })
      res.render('index', { records, totalAmount })
    })
    .catch(error => console.error(error))
})
module.exports = router