const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars');
const Record = require('./models/record')
const bodyParser = require('body-parser')
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
//首頁
app.get('/', (req, res) => {
  Record.find()
    .lean()
    .then(records => res.render('index', { records }))
    .catch(error => console.error(error))
})
//新增資料頁面
app.get('/records/new', (req, res) => {
  return res.render('new')
})
//新增一筆資料
app.post('/records', (req, res) => {
  const { name, category, amount, date } = req.body
  console.log(req.body)
  return Record.create({ name, category, amount, date })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})
//修改單筆資料的頁面
app.get('/records/:id/edit', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .lean()
    .then((record) => res.render('edit', { record }))
    .catch(error => console.log(error))
})
//送出修改資料
app.post('/records/:id/edit', (req, res) => {
  const id = req.params.id
  const { name, category, amount, date } = req.body
  return Record.findById(id)
    .then(record => {
      record = Object.assign(record, req.body)
      return record.save()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})