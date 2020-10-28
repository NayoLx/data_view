const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const path = require('path')
const express = require('express')
const user = require('./api/user_api')
const dailyTransflow = require('./api/daily_transflow_api')
const dailyExhib = require('./api/daily_exhib_api')
var url = "";

mongoose.connect(url);
mongoose.Promise = global.Promise

const app = express()
const port = process.env.PORT || 3000

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    next();
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, './dist')))
app.use('/user', user)
app.use('/dailyTransflow', dailyTransflow)
app.use('/dailyExhib', dailyExhib)

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})

module.exports = app
