const express = require('express')
const router = express.Router()
const Record = require('../../models/record')

//新增支出頁面
router.get('/new', (req, res) => {
  return res.render('new')
})

//新增一筆支出
router.post('/', (req, res) => {
  const { name, category, amount, date } = req.body
  console.log(req.body)
  return Record.create({ name, category, amount, date })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//修改單筆支出頁面
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  const categoryInChinese = {
    '<i class="fas fa-home"></i>': "家居物業",
    '<i class="fas fa-shuttle-van"></i>': "交通出行",
    '<i class="fas fa-grin-beam"></i>': "休閒娛樂",
    '<i class="fas fa-utensils"></i>': "餐飲食品",
    '<i class="fas fa-pen"></i>': "其他"
  }
  return Record.findById(id)
    .lean()
    .then(record => {
      const categoryInChineseSelected = categoryInChinese[record.category]
      res.render('edit', { record, categoryInChineseSelected })
    })
    .catch(error => console.log(error))
})

//送出修改支出
router.put('/:id', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then(record => {
      record = Object.assign(record, req.body)
      return record.save()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//刪除單筆支出
router.delete('/:id', (req, res) => {
  const id = req.params.id
  Record.findById(id)
    .then(record => record.remove())
    .then(record => console.log(record))
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router