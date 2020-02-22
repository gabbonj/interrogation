const apiRouter = require('./routers/apis')
const bodyParser = require('body-parser')
const Middles = require('./Middleware')
const express = require('express')

const app = express()

app.use(Middles.logger)
app.use('/api', apiRouter)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))

app.get('/', (req, res) => {
    res.send('Hello world!')
})

app.listen(8080, () => {
    console.log('Server started on port 8080')
})