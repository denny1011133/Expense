const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars');
const Record = require('./models/record')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const app = express()

mongoose.connect('mongodb://localhost/Expense', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
//首頁
app.get('/', (req, res) => {
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
app.post('/', (req, res) => {
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

//新增支出頁面
app.get('/records/new', (req, res) => {
  return res.render('new')
})

//新增一筆支出
app.post('/records', (req, res) => {
  const { name, category, amount, date } = req.body
  console.log(req.body)
  return Record.create({ name, category, amount, date })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//修改單筆支出頁面
app.get('/records/:id/edit', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .lean()
    .then(record => res.render('edit', { record }))
    .catch(error => console.log(error))
})

//送出修改支出
app.put('/records/:id', (req, res) => {
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
app.delete('/records/:id', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})