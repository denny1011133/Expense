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
  return Record.findById(id)
    .lean()
    .then(record => res.render('edit', { record }))
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