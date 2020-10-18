// app.js
// require packages used in the project
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes')

require('./config/mongoose')

const app = express()
const hbs = exphbs.create({ defaultLayout: 'main', extname: '.hbs' }) //, helpers: require('./utils/hbsHelpers') });
const port = 3000

// setting template engine
app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')

// setting static files
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method')) // API設定時帶上_method就會轉換為HTTP方法
app.use(routes)

// Listen the server when it started
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})