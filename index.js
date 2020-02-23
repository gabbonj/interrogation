const apiRouter = require('./routers/apis')
const Middles = require('./Middleware')
const express = require('express')

const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))

app.use(Middles.logger)
app.use(Middles.logBody)
app.use('/api', apiRouter)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))
app.use(express.static('public'))


app.listen(8080, () => {
    console.log('Server started on port 8080')
})